FROM python:3.9-slim

WORKDIR /opt/app
RUN apt-get update && \
    apt-get install -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt /opt/app/requirements.txt
RUN pip install --no-cache-dir -r /opt/app/requirements.txt
COPY . /opt/app
EXPOSE 8000
CMD ["python", "main.py"]
