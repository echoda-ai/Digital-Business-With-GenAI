FROM python:3.9-slim

WORKDIR /opt/app
RUN apt-get update 

COPY requirements.txt /opt/app/requirements.txt
RUN pip install -r /opt/app/requirements.txt
COPY . /opt/app