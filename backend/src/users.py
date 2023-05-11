from flask import request
from flask_restful import Resource
import sys
from loguru import logger
import datetime
from datetime import date
from database.functions import Select, Update
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

logger.add('logs/'+str(datetime.datetime.now().date())+'/users.log', format='{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}', filter="src.search", colorize=True, level='DEBUG')

class UserProfile(Resource):
    @jwt_required()
    def get(self, id):
        logger.debug("------------------------------------------------")
        logger.info('/UserProfile (get) - '+str(request.remote_addr))
        try:
            user_id = get_jwt_identity()
            public_id = id
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("Exception: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"msg": "required fields missing"}, 403

        if (user_id != id):
            search_response = Select("user_type, status", "users", " WHERE public_id='"+user_id+"'", 1)
            if(search_response == None):
                return {"response": "failed", "message": "Unauthorized access!", "description": "User not found!"}, 200
            elif(type(search_response) is tuple):
                if not ((search_response[0] == 1 or search_response[0] == 2) and (search_response[0] == 1)):
                    return {"response": "failed", "message": "Unauthorized access!"}, 200
            else:
                logger.info("Unauthorized access - "+user_id+"\n"+str(search_response))
                return {"response": "failed", "message": "Unauthorized access!", "description": str(search_response)}, 200

        search_response = Select("f_name, l_name, bday, edu_q, prof_q, email, status, last_edit_on", "users", " WHERE public_id='"+public_id+"' LIMIT 1", 1)

        if(search_response == None):
            return {"response": "failed", "message": "User not found!"}, 200
        elif(type(search_response) is tuple):
            return {"f_name":search_response[0], "l_name":search_response[1], "bday":search_response[2], "edu_q":search_response[3], "prof_q":search_response[4], "email":search_response[5], "status":search_response[6], "last_edit_on":search_response[7], "dp":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}, 200
        else:
            logger.info("User profile details retrieve failed - ")
            return {"response": "failed", "message": "User profile details retrieve failed!", "description": str(search_response)}, 200
            
            
    @jwt_required()
    def put(self, id):
        logger.debug("------------------------------------------------")
        logger.info('/UserProfile (put) - '+str(request.remote_addr))
        try:
            user_id = get_jwt_identity()
            public_id = id
            request_body = request.json
            update_values = "last_edit_on = '"+str(date.today())+"'"
            for key, value in request_body.items():
                update_values = update_values+", "+key+" = '"+value+"'"
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("Exception: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"msg": "required fields missing"}, 403

        if (user_id != public_id):
            logger.info(user_id + " - " + public_id)
            return {"response": "failed", "message": "Unauthorized access!"}, 200

        update_response = Update("users", update_values, "public_id='"+user_id+"'")

        if update_response == 1:
            logger.info("User profile updated successfully")
            return {"response": "success"}, 200
        else:
            logger.info("User profile update failed\n"+str(update_response))
            update_response = str(update_response).replace("Unknown column", "Unidentified data")
            update_response = str(update_response).replace(" in 'field list'", "")
            return {"response": "failed", "message": "User profile update failed!", "description": str(update_response)}, 200

        
            
