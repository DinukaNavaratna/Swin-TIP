import os, sys
import datetime
import hashlib
from flask import request
from flask_restful import Resource
from loguru import logger
from .auth import new_access_token, new_refresh_token
from database.functions import Select, Insert, Update
from .ses import send_email

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
        try:
            request_body = request.json
            email = request_body["email"]
            password = request_body["password"]
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Required fields are missing!"}, 403
        
        if(email == "" or password == ""):
            logger.error("Registraion failed - empty values\n")
            return {"response": "error", "message": "One or more required fields are empty!"}, 403

        password = MD5Hash(password)
        public_id = MD5Hash(email+"+"+password+"@SwinTIP")
        insert_values = [(email, password, public_id, 0)]
        register_response = Insert("users", "email, password, public_id, user_type", "%s, %s, %s, %s", insert_values)

        if register_response == 1:
            try:
                send_email([email], 'Account-Activation', '{"activation_link": "'+os.getenv("WEB_HOST")+'/activate/user/'+public_id+'", "home_link": "https://dinuka.live"}')
            except Exception as exception:
                exc_type, exc_obj, exc_tb = sys.exc_info()
                logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
                return {"response": "success", "message": "An error occurred when sending the confirmation email!"}, 200
            logger.info("Registration successful - "+email)
            return {"response": "success"}, 200
        else:
            logger.info("Registration failed - "+email+"\n"+str(register_response))
            return {"response": "failed", "message": "Registration failed!", "description": str(register_response)}, 200

        

class ActivateAccount(Resource):
    def get(self, id):
        logger.debug("------------------------------------------------")
        logger.info('/ActivateAccount - '+str(request.remote_addr))
        try:
            public_id = id
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("Exception: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"msg": "Error Occurred!"}, 403

        activate_response = Update("users", "status = 1", "public_id='"+public_id+"'")

        if activate_response == 1:
            logger.info("Activation successful - "+public_id)
            return "Account activated successfully!"
            #return render_template('./templates/activation_success.html')
        else:
            logger.info("Activation failed - "+public_id+"\n"+str(activate_response))
            return "Account activation failed! Please request another verification link through the application."
            #return render_template('./templates/activation_fail.html')
       


class VerificationEmailRequest(Resource):
    def post(self):
        logger.debug("------------------------------------------------")
        logger.info('/VerificationEmailRequest - '+str(request.remote_addr))
        try:
            request_body = request.json
            email = request_body["email"]
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("Exception: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"msg": "Error Occurred!"}, 403

        verification_email_response = Select("public_id, status", "users", " WHERE email='"+email+"'", 1)

        if(verification_email_response == None):
            return {"response": "failed", "message": "User not found!"}, 200
        elif(type(verification_email_response) is tuple):
            if(verification_email_response[1] == 1):
                return {"response": "failed", "message": "Account is already activated. Please log in to proceed!"}
            public_id = verification_email_response[0]
            try:
                send_email([email], 'Account-Activation', '{"activation_link": "'+os.getenv("WEB_HOST")+'/activate/user/'+public_id+'", "home_link": "https://dinuka.live"}')
            except:
                return {"response": "success", "message": "An error occurred when sending the confirmation email!"}, 200
            logger.info("Verification email request successful - "+email)
            return {"response": "success", "message": "Verification email has been sent!"}, 200
        else:
            logger.info("Login failed - "+email+"\n"+str(verification_email_response))
            return {"response": "failed", "message": "Verification email request failed!", "description": str(verification_email_response)}, 200
                