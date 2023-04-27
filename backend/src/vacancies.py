from flask import request
from flask_restful import Resource
import sys
from loguru import logger
import datetime
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from database.functions import Select, Insert

logger.add('logs/'+str(datetime.datetime.now().date())+'/vacancies.log', format='{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}', filter="src.search", colorize=True, level='DEBUG')

class Vacancies(Resource):
    def get(self):
        logger.debug("------------------------------------------------")
        logger.info('/Vacancies (get) - '+str(request.remote_addr))

        search_response = Select("public_id, title, module, base, location, description, qualifications, num_applicants, published_by, publish_date, last_edited_by, edit_date", "vacancies", " where status=1", 0)

        if(search_response == None):
            return {"response": "failed", "message": "Vacancies not found!"}, 200
        elif(type(search_response) is list):
            response = {}
            response["response"] = "success"
            vacancies = []
            for vacancy in search_response:
                vacancies.append({"public_id":str(vacancy[0]), "title":str(vacancy[1]), "module":str(vacancy[2]), "base":str(vacancy[3]), "location":str(vacancy[4]), "description":str(vacancy[5]), "qualifications":str(vacancy[6]), "num_applicants":str(vacancy[7]), "published_by":str(vacancy[8]), "publish_date":str(vacancy[9]), "last_edited_by":str(vacancy[10]), "edit_date":str(vacancy[11])})
            response["vacancies"] = vacancies
            return response
        else:
            logger.info("Vacancies retrieve failed")
            return {"response": "failed", "message": "Vacancies retrieve failed!", "description": str(search_response)}, 200
            

class Modules(Resource):
    def get(self):
        logger.debug("------------------------------------------------")
        logger.info('/Modules (get) - '+str(request.remote_addr))

        search_response = Select("id, name", "modules", "", 0)

        if(search_response == None):
            return {"response": "failed", "message": "Modules not found!"}, 200
        elif(type(search_response) is list):
            response = {}
            response["response"] = "success"
            modules = []
            for module in search_response:
                modules.append({"id":str(module[0]), "name":str(module[1])})
            response["vacancies"] = modules
            return response
        else:
            logger.info("Modules retrieve failed")
            return {"response": "failed", "message": "Modules retrieve failed!", "description": str(search_response)}, 200
            

class ApplyVacancy(Resource):
    @jwt_required()
    def post(self):
        logger.debug("------------------------------------------------")
        logger.info('/ApplyVacancy Post - '+str(request.remote_addr))

        try:
            user_id = get_jwt_identity()
            request_body = request.json
            vacancy_id = request_body["vacancy_id"]
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Required fields are missing!"}, 403

        insert_values = [(user_id, vacancy_id)]
        initialize_response = Insert("applicants", "user_id, vacancy_id", "%s, %s", insert_values)

        if initialize_response == 1:
            logger.info("Application successful")
            return {"response": "success"}, 200
        else:
            logger.info("Application failed\n"+str(initialize_response))
            return {"response": "failed", "message": "Application failed!", "description": str(initialize_response)}, 200

