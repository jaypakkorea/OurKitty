# (로컬) OpenCV 서버 실행법

## 주의사항
ESP32 모듈과 사설 IP 로 사용하기 위해서는 같은 인터넷을 사용하는 경우여야 한다.  


## 실행법
1. cmd 창을 열어서 ipconfig 을 통해 현재 로컬주소를 확인한다. (IPv4 주소)
2. FastAPI 서버 실행 시 아래 명령문을 통해 실행한다.
```
uvicorn --host=로컬주소 --port 포트번호 main:app
```
아래는 예시
```
uvicorn --host=192.168.142.184 --port 8000 main:app
```