from flask import request
from flask_restful import Resource
import sys
from loguru import logger
import datetime
from database.functions import Select

logger.add('logs/'+str(datetime.datetime.now().date())+'/users.log', format='{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}', filter="src.search", colorize=True, level='DEBUG')

class UserProfile(Resource):
    def get(self, id):
        logger.debug("------------------------------------------------")
        logger.info('/UserProfile (get) - '+str(request.remote_addr))
        try:
            public_id = id
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("Exception: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"msg": "required fields missing"}, 403

        search_response = Select("email, status", "users", " WHERE public_id='"+public_id+"' LIMIT 1", 1)

        if(search_response == None):
            return {"response": "failed", "message": "User not found!"}, 200
        elif(type(search_response) is tuple):
            return {"email":search_response[0], "status":search_response[1], "dp":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png", "qualifications": [{"title":"Q", "description":"dddddddddddddddddddd"},{"title":"Q", "description":"dddddddddddddddddddd"},{"title":"Q", "description":"dddddddddddddddddddd"}]}, 200
        else:
            logger.info("User profile details retrieve failed - ")
            return {"response": "failed", "message": "User profile details retrieve failed!", "description": str(search_response)}, 200
            
            
    def post(self, id):
        logger.debug("------------------------------------------------")
        logger.info('/UserProfile (post) - '+str(request.remote_addr))
        try:
            public_id = id
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("Exception: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"msg": "required fields missing"}, 403
        return {"response": "failed", "message": "Database structure hasn't been completed yet."}, 200
            
