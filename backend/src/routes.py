from .auth import RefreshToken, ValidateToken
from .authentication import Login, Register

def initialize_routes(api):
    api.add_resource(ValidateToken, "/validatetoken")
    api.add_resource(RefreshToken, "/refreshtoken")
    api.add_resource(Login, "/login")
    api.add_resource(Register, "/register")