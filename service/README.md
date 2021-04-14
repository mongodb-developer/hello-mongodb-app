
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


```bash
$cd service



