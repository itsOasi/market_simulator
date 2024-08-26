FROM python:3.9.13-slim-buster

RUN pip install flask

WORKDIR /
ADD / /

EXPOSE 8080/tcp
EXPOSE 8080/udp

CMD ["python", "./main.py"]