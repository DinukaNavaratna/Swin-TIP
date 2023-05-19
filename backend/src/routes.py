from .auth import RefreshToken, ValidateToken
from .authentication import Login, Register, ActivateAccount, VerificationEmailRequest
from .users import UserProfile, ResumeDownload
from .vacancies import PublicVacancies, Vacancies, ApplyVacancy, Modules, ViewApplicants, VacancyDetails

def initialize_routes(api):
    api.add_resource(ValidateToken, "/validatetoken")
    api.add_resource(RefreshToken, "/refreshtoken")
    api.add_resource(Login, "/login")
    api.add_resource(Register, "/register")
    api.add_resource(ActivateAccount, "/activate/user/<id>")
    api.add_resource(VerificationEmailRequest, "/verificationemailrequest")
    api.add_resource(UserProfile, "/userprofile/<id>")
    api.add_resource(PublicVacancies, "/publicvacancies")
    api.add_resource(Vacancies, "/vacancies")
    api.add_resource(VacancyDetails, "/vacancydetails/<id>")
    api.add_resource(ApplyVacancy, "/applyvacancy")
    api.add_resource(Modules, "/modules")
    api.add_resource(ViewApplicants, "/applicants")
    api.add_resource(ResumeDownload, "/cv/<id>")