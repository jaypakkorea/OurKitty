# FastAPI에서 CORSMiddleware라는 모듈로 CORS를 제어한다.
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, Request
from fastapi.staticfiles import StaticFiles
from requests_toolbelt import MultipartEncoder
import requests
import cv2
import numpy as np
import json

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],	# 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)

# Spring 서버 URL
SERVER_URL = 'http://localhost:8088/api/pictures/'

# OpenCV 설정
winName = 'ESP32 CAMERA'
infoPath = './infor/'

classNames = []
classFile = infoPath+'coco.names'
with open(classFile,'rt') as f:
    classNames = f.read().rstrip('\n').split('\n')

configPath = infoPath+'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt' #YOLO 환경설정파일
weightsPath = infoPath+'frozen_inference_graph.pb'#사전 훈련된 가중치들

net = cv2.dnn_DetectionModel(weightsPath,configPath)
# net.setInputSize(320,320)
#net.setInputSize(480,480)
net.setInputSize(608, 608)
net.setInputScale(1.0/127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

@app.post("/uploadfile/{serial_number}")
async def create_upload_file(serial_number, imageFile: UploadFile or None = None):
    if not imageFile:
        return {'status': 400, 'message': '업로드한 파일이 없습니다.'}
    else:
        # 1. 이미지 파일인지 식별하기
        contentType, ext = imageFile.content_type.split('/')
        if(contentType != 'image'):
            return {'status': 500, 'message': '사진 파일만 올릴 수 있습니다.'}
        
        # 2. 이미지 파일 읽기
        contents = await imageFile.read()

        # 3. 이미지 파일을 openCV로 고양이 사진 필터링 
        status, isDone = await filter_cat(contents)

        # 4. 고양이사진 인 경우 spring 서버로 보내기
        if isDone is False:
            if status == 0:
                msg = '고양이 사진이 아닙니다.'
            elif status == -1:
                msg = '사물인식 중 에러 발생'
            return {'status': 500, 'message': msg}

        # 모션인식된 결과물 전송 (임시 추후 삭제)
        with open("./static/img/output.jpg", 'rb') as f:
            contents = f.read()

        response = await send_image(contents, ext, serial_number)

        # return json.loads(response.content)
        return {'status': response.status_code}

async def filter_cat(contents):
    try:
        imgNp = np.fromstring(contents, np.uint8)
        img = cv2.imdecode(imgNp,-1) #decodificamos

        #사물인식
        classIds, confs, bbox = net.detect(img,confThreshold=0.5)

        # classId 가 17(cat)이 아니면 return false
        if 17 not in classIds:
            return 0, False

        #사물인식된 경우 박스 및 테스트 입력
        if len(classIds) != 0:
            for classId, confidence,box in zip(classIds.flatten(),confs.flatten(),bbox):
                cv2.rectangle(img,box,color=(0,255,0),thickness = 3) #mostramos en rectangulo lo que se encuentra
                cv2.putText(img, classNames[classId-1], (box[0]+10,box[1]+30), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0),2)
        
        # 인식한 결과를 로컬에 저장함(임시)
        cv2.imwrite("./static/img/output.jpg", img)

        return 1, True
    except:
        return -1, False


async def send_image(img, ext, serial_number):
    return requests.post(SERVER_URL + serial_number, files={'imageFile': img}, data={'extension': ext})
