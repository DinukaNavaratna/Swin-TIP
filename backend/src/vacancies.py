from flask import request
from flask_restful import Resource
import sys
import hashlib
import datetime
from datetime import date
from loguru import logger
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from database.functions import Select, Insert, Update
from .ses import send_email

logger.add('logs/'+str(datetime.datetime.now().date())+'/vacancies.log', format='{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}', filter="src.search", colorize=True, level='DEBUG')

def MD5Hash(password):
    result = hashlib.md5(password.encode())
    return result.hexdigest()


class PublicVacancies(Resource):
    def get(self):
        logger.debug("------------------------------------------------")
        logger.info('/PublicVacancies (get) - '+str(request.remote_addr))

        search_response = Select("public_id, title, module, base, location, description, qualifications, num_applicants, publish_date", "vacancies", " where status=1", 0)

        if(search_response == None):
            return {"response": "failed", "message": "Vacancies not found!"}, 200
        elif(type(search_response) is list):
            response = {}
            response["response"] = "success"
            vacancies = []
            for vacancy in search_response:
                
                vacancies.append({"public_id":str(vacancy[0]), "title":str(vacancy[1]), "module":str(vacancy[2]), "base":str(vacancy[3]), "location":str(vacancy[4]), "description":str(vacancy[5]), "qualifications":str(vacancy[6]), "num_applicants":str(vacancy[7]), "publish_date":str(vacancy[8])})
            response["vacancies"] = vacancies
            return response
        else:
            logger.info("Vacancies retrieve failed")
            return {"response": "failed", "message": "Vacancies retrieve failed!", "description": str(search_response)}, 200
            

class Vacancies(Resource):
    @jwt_required()
    def get(self):
        logger.debug("------------------------------------------------")
        logger.info('/Vacancies (get) - '+str(request.remote_addr))

        try:
            user_id = get_jwt_identity()
            search_response = Select("user_type, status, id", "users", " WHERE public_id='"+user_id+"'", 1)
            if(search_response == None):
                return {"response": "failed", "message": "User not found!"}, 200
            elif(type(search_response) is tuple):
                if not ((search_response[0] == 1 or search_response[0] == 2) and (search_response[0] == 1)):
                    return {"response": "failed", "message": "Unauthorized access!"}, 200
            else:
                logger.info("Unauthorized access - "+user_id+"\n"+str(search_response))
                return {"response": "failed", "message": "Unauthorized access!", "description": str(search_response)}, 200
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Unauthorized access!"}, 403

        search_response = Select("public_id, title, module, base, location, description, qualifications, num_applicants, published_by, publish_date, last_edited_by, edit_date, status", "vacancies", "", 0)

        if(search_response == None):
            return {"response": "failed", "message": "Vacancies not found!"}, 200
        elif(type(search_response) is list):
            response = {}
            response["response"] = "success"
            public_vacancies = []
            deleted_vacancies = []
            for vacancy in search_response:
                if vacancy[12] == 1:
                    public_vacancies.append({"public_id":str(vacancy[0]), "title":str(vacancy[1]), "module":str(vacancy[2]), "base":str(vacancy[3]), "location":str(vacancy[4]), "description":str(vacancy[5]), "qualifications":str(vacancy[6]), "num_applicants":str(vacancy[7]), "published_by":str(vacancy[8]), "publish_date":str(vacancy[9]), "last_edited_by":str(vacancy[10]), "edit_date":str(vacancy[11])})
                else:
                    deleted_vacancies.append({"public_id":str(vacancy[0]), "title":str(vacancy[1]), "module":str(vacancy[2]), "base":str(vacancy[3]), "location":str(vacancy[4]), "description":str(vacancy[5]), "qualifications":str(vacancy[6]), "num_applicants":str(vacancy[7]), "published_by":str(vacancy[8]), "publish_date":str(vacancy[9]), "last_edited_by":str(vacancy[10]), "edit_date":str(vacancy[11])})
            response["vacancies"] = [{"public_vacancies":public_vacancies, "deleted_vacancies":deleted_vacancies}]
            return response
        else:
            logger.info("Vacancies retrieve failed")
            return {"response": "failed", "message": "Vacancies retrieve failed!", "description": str(search_response)}, 200
            

    @jwt_required()
    def post(self):
        logger.debug("------------------------------------------------")
        logger.info('/Vacancies (post) - '+str(request.remote_addr))

        try:
            user_id = get_jwt_identity()
            search_response = Select("user_type, status, id", "users", " WHERE public_id='"+user_id+"'", 1)
            if(search_response == None):
                return {"response": "failed", "message": "User not found!"}, 200
            elif(type(search_response) is tuple):
                if not ((search_response[0] == 1 or search_response[0] == 2) and (search_response[0] == 1)):
                    return {"response": "failed", "message": "Unauthorized access!"}, 200
                else:
                    user_id = search_response[2]
            else:
                logger.info("Unauthorized access - "+user_id+"\n"+str(search_response))
                return {"response": "failed", "message": "Unauthorized access!", "description": str(search_response)}, 200
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Unauthorized access!"}, 403

        try:
            request_body = request.json
            title = request_body["title"]
            module = request_body["module"]
            base = request_body["base"]
            location = request_body["location"]
            description = request_body["description"]
            qualifications = request_body["qualifications"]
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Required fields are missing!"}, 403

        public_id = MD5Hash(str(user_id)+"@"+title+"+"+module+"-"+base+"@SwinTIP")

        insert_values = [(public_id, title, module, base, location, description, qualifications, user_id, user_id)]
        initialize_response = Insert("vacancies", "public_id, title, module, base, location, description, qualifications, published_by, last_edited_by", "%s, %s, %s, %s, %s, %s, %s, %s, %s", insert_values)

        if initialize_response == 1:
            logger.info("Vacancy posted successfully")
            return {"response": "success"}, 200
        else:
            logger.info("Vacancy posting failed\n"+str(initialize_response))
            return {"response": "failed", "message": "Vacancy posting failed!", "description": str(initialize_response)}, 200


    @jwt_required()
    def put(self):
        logger.debug("------------------------------------------------")
        logger.info('/Vacancies (put) - '+str(request.remote_addr))

        try:
            user_id = get_jwt_identity()
            search_response = Select("user_type, status, id", "users", " WHERE public_id='"+user_id+"'", 1)
            if(search_response == None):
                return {"response": "failed", "message": "User not found!"}, 200
            elif(type(search_response) is tuple):
                if not ((search_response[0] == 1 or search_response[0] == 2) and (search_response[0] == 1)):
                    return {"response": "failed", "message": "Unauthorized access!"}, 200
                else:
                    user_id = search_response[2]
            else:
                logger.info("Unauthorized access - "+user_id+"\n"+str(search_response))
                return {"response": "failed", "message": "Unauthorized access!", "description": str(search_response)}, 200
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Unauthorized access!"}, 403

        edit_date = str(date.today())

        try:
            request_body = request.json
            public_id = request_body["public_id"]
            update_values = "last_edited_by = "+str(user_id)+", edit_date = '"+str(edit_date)+"'"
            for key, value in request_body.items():
                if key != "public_id":
                    update_values = update_values+", "+key+" = '"+value+"'"
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Required fields are missing!"}, 403

        update_response = Update("vacancies", update_values, "public_id='"+public_id+"'")

        if update_response == 1:
            logger.info("Vacancy updated successfully")
            return {"response": "success"}, 200
        else:
            logger.info("Vacancy update failed\n"+str(update_response))
            update_response = str(update_response).replace("Unknown column", "Unidentified data")
            update_response = str(update_response).replace(" in 'field list'", "")
            return {"response": "failed", "message": "Vacancy update failed!", "description": str(update_response)}, 200


    @jwt_required()
    def delete(self):
        logger.debug("------------------------------------------------")
        logger.info('/Vacancies (delete) - '+str(request.remote_addr))

        try:
            user_id = get_jwt_identity()
            search_response = Select("user_type, status, id", "users", " WHERE public_id='"+user_id+"'", 1)
            if(search_response == None):
                return {"response": "failed", "message": "User not found!"}, 200
            elif(type(search_response) is tuple):
                if not ((search_response[0] == 1 or search_response[0] == 2) and (search_response[0] == 1)):
                    return {"response": "failed", "message": "Unauthorized access!"}, 200
                else:
                    user_id = search_response[2]
            else:
                logger.info("Unauthorized access - "+user_id+"\n"+str(search_response))
                return {"response": "failed", "message": "Unauthorized access!", "description": str(search_response)}, 200
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Unauthorized access!"}, 403

        edit_date = str(date.today())

        try:
            request_body = request.json
            public_id = request_body["public_id"]
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Required fields are missing!"}, 403


        update_values = "status = 2, last_edited_by = "+str(user_id)+", edit_date = '"+str(edit_date)+"'"
        update_response = Update("vacancies", update_values, "public_id='"+public_id+"'")

        if update_response == 1:
            logger.info("Vacancy deleted successfully")
            return {"response": "success"}, 200
        else:
            logger.info("Vacancy delete failed\n"+str(update_response))
            return {"response": "failed", "message": "Vacancy delete failed!", "description": str(update_response)}, 200



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
        logger.info('/ApplyVacancy (post) - '+str(request.remote_addr))

        try:
            user_id = get_jwt_identity()
            request_body = request.json
            vacancy_id = request_body["vacancy_id"]
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Required fields are missing!"}, 403

        user_response = Select("id, email, public_id", "users", " WHERE public_id='"+user_id+"'", 1)

        if(user_response == None):
            return {"response": "failed", "message": "User not found!"}, 200
        elif(type(user_response) is tuple):
            user_id = user_response[0]
        else:
            logger.info("User not  found - "+email+"\n"+str(user_response))
            return {"response": "failed", "message": "User not  found!", "description": str(user_response)}, 200
        
        vacancy_response = Select("id, title, module, location, published_by", "vacancies", " WHERE public_id='"+vacancy_id+"'", 1)

        if(vacancy_response == None):
            return {"response": "failed", "message": "Vacancy not found!"}, 200
        elif(type(vacancy_response) is tuple):
            vacancy_id = vacancy_response[0]
        else:
            logger.info("Vacancy not  found - "+email+"\n"+str(vacancy_response))
            return {"response": "failed", "message": "Vacancy not  found!", "description": str(vacancy_response)}, 200
        

        insert_values = [(user_id, vacancy_id)]
        initialize_response = Insert("applicants", "user_id, vacancy_id", "%s, %s", insert_values)

        if initialize_response == 1:
            logger.info("Application successful")
            msg = "Application successful!"
            try:
                send_email([user_response[1]], 'SwinTIP-Application-Confirmation', '{"job_title": "'+vacancy_response[1]+'", "module": "'+str(vacancy_response[2])+'", "location": "'+vacancy_response[3]+'", "applied_on": "'+str(date.today())+'", "home_link": "https://dinuka.live"}')
                staff_response = Select("email", "users", " WHERE id='"+str(vacancy_response[4])+"'", 1)
                if(type(staff_response) is tuple):
                    send_email([staff_response[0]], 'SwinTIP-New-Applicant', '{"job_title": "'+vacancy_response[1]+'", "module": "'+str(vacancy_response[2])+'", "location": "'+vacancy_response[3]+'", "applicant_name": "'+user_response[2]+'", "applicant_email": "'+user_response[1]+'", "applied_on": "'+str(date.today())+'", "home_link": "https://dinuka.live"}')
                    logger.info("\nEmails sent to: "+str(user_response[1])+" & "+str(staff_response[0]))
            except Exception as exception:
                exc_type, exc_obj, exc_tb = sys.exc_info()
                logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
                msg = "Notification emailed failed. "+str(exception)
            return {"response": "success", "message": msg}, 200
        else:
            logger.info("Application failed\n"+str(initialize_response))
            return {"response": "failed", "message": "Application failed!", "description": str(initialize_response)}, 200


class ViewApplicants(Resource):
    @jwt_required()
    def get(self):
        logger.debug("------------------------------------------------")
        logger.info('/ViewApplicants (get) - '+str(request.remote_addr))

        try:
            user_id = get_jwt_identity()
            search_response = Select("user_type, status", "users", " WHERE public_id='"+user_id+"'", 1)
            if(search_response == None):
                return {"response": "failed", "message": "User not found!"}, 200
            elif(type(search_response) is tuple):
                if not ((search_response[0] == 1 or search_response[0] == 2) and (search_response[0] == 1)):
                    return {"response": "failed", "message": "Unauthorized access!"}, 200
            else:
                logger.info("Unauthorized access - "+user_id+"\n"+str(search_response))
                return {"response": "failed", "message": "Unauthorized access!", "description": str(search_response)}, 200
        except Exception as exception:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("\nException: "+str(exception)+"\nLine: "+str(exc_tb.tb_lineno))
            return {"response": "error", "message": "Unauthorized access!"}, 403

        search_response = Select("user_id, vacancy_id, date", "applicants", "", 0)

        if(search_response == None):
            return {"response": "failed", "message": "No applicants!"}, 200
        elif(type(search_response) is list):
            response = {}
            response["response"] = "success"
            applicants = []
            for applicant in search_response:
                applicants.append({"user_id":str(applicant[0]), "vacancy_id":str(applicant[1]), "date":str(applicant[2])})
            response["applicants"] = applicants
            return response
        else:
            logger.info("Applicants retrieve failed")
            return {"response": "failed", "message": "Applicants retrieve failed!", "description": str(search_response)}, 200
        