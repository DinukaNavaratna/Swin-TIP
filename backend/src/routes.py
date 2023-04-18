from .auth import RefreshToken, ValidateToken
from .authentication import Login, Register, ActivateAccount, VerificationEmailRequest

def initialize_routes(api):
    api.add_resource(ValidateToken, "/validatetoken")
    api.add_resource(RefreshToken, "/refreshtoken")
    api.add_resource(Login, "/login")
    api.add_resource(Register, "/register")
    api.add_resource(ActivateAccount, "/activate/user/<id>")
    api.add_resource(VerificationEmailRequest, "/verificationemailrequest")