
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

**1. add MongoDB username and password to `settings.cfg`
**2. run `export APPLICATION_SETTINGS=settings.cfg`

```bash
$cd service

$python app.py
```

To test run this command
X-MongoDB-Database and X-MongoDB-Collection must be set to query right MongoDB
`curl http://0.0.0.0:5274/ -d '{"rated": "NOT RATED"}' -H "Content-Type: application/json" -H "X-MongoDB-Database:sample_mflix" -H "X-MongoDB-Collection:movies" --request GET`

