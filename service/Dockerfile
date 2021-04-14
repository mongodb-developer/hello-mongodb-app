FROM python:3.9.4-alpine as base

FROM base as builder
RUN apk add curl
RUN mkdir /app
COPY /app/requirements.txt /app
WORKDIR /app
RUN python -m pip install -r requirements.txt
ENV APPLICATION_SETTINGS settings.cfg
FROM builder as runtime-image
COPY /app /app
ENTRYPOINT ["python"]
CMD ["app.py"]
