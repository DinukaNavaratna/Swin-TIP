import os, sys
import datetime
import hashlib
from flask import request
from flask_restful import Resource
from loguru import logger
from .auth import new_access_token, new_refresh_token
from database.functions import Select, Insert, Update
#from .ses import send_email

logger.add('logs/'+str(datetime.datetime.now().date())+'/login_register.log', format='{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}', filter="src.login_register", colorize=True, level='DEBUG')


def MD5Hash(password):
    result = hashlib.md5(password.encode())
    return result.hexdigest()


class Login(Resource):
    def post(self):
        logger.debug("------------------------------------------------")
        logger.info('/Login - '+str(request.remote_addr))
        try:
            request_body = request.json
            email = request_body["email"]
            password = request_body["password"]
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Required fields are missing!"}, 403
        
        password = MD5Hash(password)
        
        login_response = Select("public_id, user_type, status", "users", " WHERE email='"+email+"' AND password='"+password+"'", 1)

        if(login_response == None):
            return {"response": "failed", "message": "User not found!"}, 200
        elif(type(login_response) is tuple):
            if(login_response[2] == 0):
                return {"response": "failed", "message": "Account not activated. Please verify the email address and try again!"}
            public_id = login_response[0]
            user_type = login_response[1]
            if user_type == 0:
                user_type = "casual"
            elif user_type == 1:
                user_type = "permanent"
            elif user_type == 2:
                user_type = "admin"
            access_token = new_access_token(public_id)
            refresh_token = new_refresh_token(public_id)
            logger.info("Login successful - "+email)
            return {"response": "success", "user_type": user_type, "access_token": access_token, "refresh_token": refresh_token}, 200
        else:
            logger.info("Login failed - "+email+"\n"+str(login_response))
            return {"response": "failed", "message": "Login failed!", "description": str(login_response)}, 200
        
        
        
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
        