from .auth import RefreshToken, ValidateToken
from .authentication import Login, Register, ActivateAccount, VerificationEmailRequest
from .users import UserProfile
from .vacancies import Vacancies, ApplyVacancy, Modules

def initialize_routes(api):
    api.add_resource(ValidateToken, "/validatetoken")
    api.add_resource(RefreshToken, "/refreshtoken")
    api.add_resource(Login, "/login")
    api.add_resource(Register, "/register")
    api.add_resource(ActivateAccount, "/activate/user/<id>")
    api.add_resource(VerificationEmailRequest, "/verificationemailrequest")
    api.add_resource(UserProfile, "/userprofile/<id>")
    api.add_resource(Vacancies, "/vacancies")
    api.add_resource(ApplyVacancy, "/applyvacancy")
    api.add_resource(Modules, "/modules")