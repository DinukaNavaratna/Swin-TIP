import datetime
import hashlib
from flask import request
from flask_restful import Resource
from loguru import logger

logger.add('logs/'+str(datetime.datetime.now().date())+'/login_register.log', format='{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}', filter="src.login_register", colorize=True, level='DEBUG')


def MD5Hash(password):
    result = hashlib.md5(password.encode())
    return result.hexdigest()


class Login(Resource):
    def post(self):
        logger.debug("------------------------------------------------")
        logger.info('/Login - '+str(request.remote_addr))
        return {"response": "", "message": "", "description": ""}, 200

        
class Register(Resource):
    def post(self):
        logger.debug("------------------------------------------------")
        logger.info('/Register - '+str(request.remote_addr))
        return {"response": "", "message": "", "description": ""}, 200
        

class ActivateAccount(Resource):
    def get(self):
        logger.debug("------------------------------------------------")
        logger.info('/ActivateAccount - '+str(request.remote_addr))
        return {"response": "", "message": "", "description": ""}, 200
        

class VerificationEmailRequest(Resource):
    def post(self):
        logger.debug("------------------------------------------------")
        logger.info('/VerificationEmailRequest - '+str(request.remote_addr))
        return {"response": "", "message": "", "description": ""}, 200
        