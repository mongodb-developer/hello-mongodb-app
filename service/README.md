
A simple basic Kubernetes-ready, HTTP based microservice which can 
query and update a collection of products in MongoDB. The service 
is implemented in python and uses:
- Flask
- pymongo
- python-kubernetes

Authentication uses standard username:password HTTP digest.

There is a single default route ``/`` which accepts, `GET`, `POST`, & `DELETE` 
`HTTP` Methods. Refer to app/app.py for the API reference and examples.

This sample software is for educational purposes and not meant for 
production systems. 

## Getting started

1. Add MongoDB username and password to `settings.cfg`

### To run service in a development environment:
1 Run `export APPLICATION_SETTINGS=settings.cfg`

```bash
cd service
python app.py
```

### Docker Instructions
```bash
cd service
docker build -t <repo>/hello-mongodb-svc .
docker run -it -p 5274:5274 <repo>/hello-mongodb-svc
```

### Simple test

Set `X-MongoDB-Database` and `X-MongoDB-Collection` to the right MongoDB Database and Collection
```bash 
curl http://0.0.0.0:5274/ -d '{"rated": "NOT RATED"}' \
    -H "Content-Type: application/json" \
    -H "X-MongoDB-Database:sample_mflix" \
    -H "X-MongoDB-Collection:movies"
```

List of movies will be returned in the terminal
