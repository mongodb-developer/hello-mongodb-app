import os
import sys
import logging
import uuid
import ssl 
# import dns

import sys; 
print (sys.path)
from flask import Flask
from flask import request
from pymongo import MongoClient
from bson.json_util import loads
from bson.json_util import dumps, RELAXED_JSON_OPTIONS
#from kubernetes import client, config, watch
from flask_httpauth import HTTPBasicAuth


# from dns import resolver
#   print(result.target.to_text())

logger = logging.getLogger('microservice')
log_level = os.environ.get('MICROSERVICE_LOG_LEVEL','DEBUG')
logger.setLevel(log_level)
logger.info('microservice startup')
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(log_level)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

logger.debug( '{os.environ}' )

app = Flask(__name__)
auth = HTTPBasicAuth()

app.config.from_envvar('APPLICATION_SETTINGS')

ns_file = '/var/run/secrets/kubernetes.io/serviceaccount/namespace'
try:
  with open(ns_file,'r') as f:
      namespace = f.read()
  logger.info(f'{namespace}')
except Exception as err:
  logger.error(err)

sUri = os.environ.get('MONGODB_URI')
logger.debug( f'Read environment MONGODB_URI: {sUri}' )

# Atlas Connection string
mongo = MongoClient(f'mongodb+srv://{app.config["MONGODB_USER"]}:{app.config["MONGODB_PASSWORD"]}@{app.config["MONGODB_SRV"]}')
# mongo = MongoClient( sUri)

DEFAULT_DB = 'sample_mflix'
DEFAULT_COLL = 'movies'
CURRENT_DB = DEFAULT_DB
CURRENT_COLL = DEFAULT_COLL
logger.warning(f'initialize/CURRENT_DB:{CURRENT_DB} CURRENT_COLL:{CURRENT_COLL}')
logger.info(f'mongo.server_info():{mongo.server_info()}')

                               
@auth.verify_password
def verify_password(username, password):
  potential_key = { '_id' : '{}:{}'.format(username,password) }

  valid_key = mongo['kubestore']['apikeys'].find_one( potential_key )
  logger.info(f'verify_password {key}')
  return valid_key is not None

def dumps_result(result,method=''):
  logger.debug(f'dumps_result/method:{method}, result:{result}')
  #r = { 'acknowledged' : result.acknowledged, 'inserted_id' : result.inserted_id }
  #logger.debug(f'dumps_result/method:{method}, r:{r}')
  return dumps( { 'result' : f'{result}' } )

def set_current_collection():
  if request.headers.get('X-MongoDB-Database'):
    if not request.headers.get('X-MongoDB-Collection'):
      raise Exception('\'X-MongoDB-Collection\' header required if \'X-MongoDB-Database\' header sent')
    CURRENT_DB = request.headers['X-MongoDB-Database']
    CURRENT_COLL = request.headers['X-MongoDB-Collection']
  else:
    CURRENT_DB = DEFAULT_DB
    CURRENT_COLL = DEFAULT_COLL
  logger.warning(f'set_current_collection CURRENT_DB:{CURRENT_DB} CURRENT_COLL:{CURRENT_COLL}')

def generate_id():
  return str(uuid.uuid4())

@app.route('/find', methods = ['GET'])
def query():
  
  logger.debug(f'Request JSON {request.json}')

  set_current_collection()

  return (dumps(list(mongo[CURRENT_DB][CURRENT_COLL].find(request.json).limit(100))), 200)

@app.route('/dbStats', methods = ['GET'])
def dbStats(): 
  
  
  db = mongo[CURRENT_DB]

  set_current_collection()

  return  db.command("dbstats")

@app.route('/aggregation', methods = ['GET'])
def aggregation(): 
  
  logger.debug(f'Request JSON {request.json}')

  set_current_collection()

  return (dumps(list(mongo[CURRENT_DB][CURRENT_COLL].aggregation(request.json).limit(100))), 200)


# @app.route('/', methods = ['GET'])
# #@auth.login_required
# def get():
#   """ Query for documents. 
#   Expects request arguments with query document.
#   Example(s):
#   $curl -X PUT -u <username:apikey> http:/product-service/?key1=value1&key2=value2
#   """
#   set_current_collection() 
#   query = request.args
#   find_q = {}
 
#   if query:
#     if 'filter' in query:
#       return filters()
#     if 'all' in query:
#       query = {}
#     if 'brand' in query:
#       find_q['brand'] = { "$in" : query['brand'].split(',') } 
#       logger.info(f'rewrote \'brand\' query {find_q}')
#     if 'categories' in query:
#       find_q['categories'] = {}
#       for value in query['categories'].split(','):
#         find_q['categories']['$regex'] = value
#       # find_q ["$and"] = q
#       logger.info(f'rewrote \'categories\' query {find_q}')
#     logger.info(f'get: {query}')
#     return (dumps(list(mongo[CURRENT_DB][CURRENT_COLL].find(find_q).limit(100))),200)
#   else:
#     logger.info(f'HELLO product-service')
#     return (f'HELLO product-service',200)


# @app.route('/', methods = ['POST'])
# #@auth.login_required
# def post():
#   """ Insert a document. 
#   Expects JSON body with document.
#   Example(s):
#   $curl -X PUT -u <username:apikey> -d '{ "key1":"value1"}' http:/product-service/
#   """
  
#   set_current_collection() 
#   product = request.get_json(force=True) 
#   product['_id'] = generate_id()
#   logger.info(f'POST product:{product}')
#   result = mongo[CURRENT_DB][CURRENT_COLL].insert_one( product )
#   return (dumps_result(result,method='post'),200)

# @app.route('/<document_id>', methods = ['PUT'])
# #@auth.login_required
# def put(document_id):
#   """ Update/upsert a document. 
#   Expects JSON body with $set-style MQL update.
#   Example(s):
#   To update the document with _id = 1234,
#   $curl -X PUT -u <username:apikey> -d '{"$set": { "key1":"value1"}}' http:/product-service/1234
#   """
  
#   if not document_id:
#    return (f'Request paramenter \`document_id\` REQUIRED, detected {document_id}',500)
#   product = request.get_json(force=True) 
#   logger.info(f'PUT product:{product}')
#   update = { "$set" : {} }
#   for key in product.keys():
#     update['$set'][key] = product[key]
#   set_current_collection() 
#   logger.info(f'PUT update:{update}')
#   result = mongo[CURRENT_DB][CURRENT_COLL].update_one({ '_id' : document_id }, update, upsert=True)
#   return (dumps_result(result,method='put'),200)

# @app.route('/', methods = ['DELETE'])
# @app.route('/<document_id>', methods = ['DELETE'])
# #@auth.login_required
# def delete(document_id=''):
#   """ Delete a document. 
#       Expects request path value for _id.
#       Example(s):
#       To delete the document with _id = 1234,
#       $curl -X DELETE -u <username:apikey> http:/product-service/1234
#   """
#   if not document_id:
#     product = request.get_json(force=True)
    
#     logger.debug(f'delete/product:{product}')
#     product = loads(request.data)
#     logger.debug(f'delete/product:{product}')
#     product = loads(request.data)
#     if not product or not '_id' in product:
#       return (f'Route /<_id> parameter or body with \'_id\' key REQUIRED',500)
#     document_id = product['_id']
#   set_current_collection()
#   logger.info(f'DELETE {document_id}')
#   result = mongo[CURRENT_DB][CURRENT_COLL].delete_one({ '_id' : document_id })
#   return (dumps_result(result,method='delete'),200)

if __name__ == '__main__':
  port = os.environ.get('PRODUCT_SERVICE_SERVICE_PORT_HTTP',5274)
  logger.info(f'PRODUCT_SERVICE_SERVICE_PORT_HTTP={port}')
  app.run(debug=True,host='0.0.0.0',port=port)
