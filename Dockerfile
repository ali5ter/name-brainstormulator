FROM python:3.6-alpine
WORKDIR /app
ADD /app /app

EXPOSE 80
CMD cd /app && python -m http.server 8080