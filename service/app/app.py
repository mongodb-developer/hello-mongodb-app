import os
import sys
import logging
import uuid
import ssl
import pymongo

import sys;
print (sys.path)
from flask import Flask
from flask import request
from pymongo import MongoClient
 
from bson.json_util import loads
from bson.json_util import dumps, RELAXED_JSON_OPTIONS
#from kubernetes import client, config, watch
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS


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
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
auth = HTTPBasicAuth()

app.config.from_envvar('APPLICATION_SETTINGS')


# Atlas Connection string
mongo = MongoClient(f'mongodb+srv://{app.config["MONGODB_USER"]}:{app.config["MONGODB_PASSWORD"]}@{app.config["MONGODB_SRV"]}')
# mongo = MongoClient( sUri)

DEFAULT_DB = 'sample_mflix'
DEFAULT_COLL = 'movies'
CURRENT_DB = DEFAULT_DB
CURRENT_COLL = DEFAULT_COLL
logger.warning(f'initialize/CURRENT_DB:{CURRENT_DB} CURRENT_COLL:{CURRENT_COLL}')
# logger.info(f'mongo.server_info():{mongo.server_info()}')


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

@app.route('/mongodb-info', methods = ['GET'])
def mongodb_info():


  set_current_collection()
  try:
    info = { "dbstats" :  mongo[CURRENT_DB].command("dbstats"),
            "collstats" : mongo[CURRENT_DB].command("collstats", CURRENT_COLL, scale=1024*1024),
            "atlas" : { "connectionStringSRV" : app.config["MONGODB_SRV"], "connected": true}
      }
    logger.debug(f"info:{info}")
  except pymongo.errors.ConnectionFailure as e:
    info = { "error" : "Connection Error" ,
            "atlas": { "connected": false }}      
  except pymongo.errors.OperationFailure as e:
    info = { "errmsg" : e.details.get('errmsg', ''),
            "atlas": { "connected": false }
      }      
  
  return (dumps(info), 200)


if __name__ == '__main__':
  port = os.environ.get('PRODUCT_SERVICE_SERVICE_PORT_HTTP',5274)
  logger.info(f'PRODUCT_SERVICE_SERVICE_PORT_HTTP={port}')
  app.run(debug=True,host='0.0.0.0',port=port)
