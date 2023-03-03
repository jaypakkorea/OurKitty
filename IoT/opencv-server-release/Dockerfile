FROM python:latest

WORKDIR /app/

COPY . /app/
# COPY ./img /app/
# COPY ./infor /app/
# COPY ./main.py /app/
# COPY ./requirements.txt /app/

RUN pip install -r requirements.txt
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

CMD uvicorn --host=0.0.0.0 --port 8000 main:app
