import boto3
from loguru import logger
import os
from dotenv import load_dotenv

load_dotenv()

ses_client = boto3.client('ses', 
                aws_access_key_id = os.getenv("SES_KEY_ID"), 
                aws_secret_access_key = os.getenv("SES_KEY"), 
                region_name = os.getenv("SES_REGION")
            )


def send_email(to, template, data):
    logger.info(to)
    response = ses_client.send_templated_email(
        Source = 'SwinTIP <noreply@corputip.me>',
        Destination = {
            'ToAddresses': to
        },
        Template = template,
        TemplateData = data
    )
    print(response)
    logger.info(response)


def CreateTeamplate():
    template = open("templates/account_activation_email.txt", "r")
    response = ses_client.create_template(
        Template = {
        "TemplateName" : "SwinTIP-Account-Activation",
        "SubjectPart" : "Please activate your account.",
        "HtmlPart" : template.read(),
        "TextPart" : "Welcome,\r\n\r\nPlease visit the following link by copying the following link into your browser to activate your account.\r\n\r\n{{activation_link}}\r\n\r\nThank you.\r\n\r\nSwinTIP\r\ninfo@corputip.me\r\n"
        }
    )
    print(response)
    
    template = open("templates/job_application_confirmation.txt", "r")
    response = ses_client.create_template(
        Template = {
        "TemplateName" : "SwinTIP-Application-Confirmation",
        "SubjectPart" : "Confirmation of your job application.",
        "HtmlPart" : template.read(),
        "TextPart" : "Welcome,\r\n\r\nThis email has been systematically generated to confirm your job application.\r\n\r\nThank you.\r\n\r\nSwinTIP\r\ninfo@corputip.me\r\n"
        }
    )
    print(response)
    
    template = open("templates/new_application_received.txt", "r")
    response = ses_client.create_template(
        Template = {
        "TemplateName" : "SwinTIP-New-Applicant",
        "SubjectPart" : "New job application received.",
        "HtmlPart" : template.read(),
        "TextPart" : "Welcome,\r\n\r\nThis email has been systematically generated to inform you that a new application has been received for a vacancy you posted on SwinTIP. Access your dashboard to see further details.\r\n\r\nThank you.\r\n\r\nSwinTIP\r\ninfo@corputip.me\r\n"
        }
    )
    print(response)
    
    template = open("templates/password_reset.txt", "r")
    response = ses_client.create_template(
        Template = {
        "TemplateName" : "SwinTIP-Password-Reset",
        "SubjectPart" : "Reset your password.",
        "HtmlPart" : template.read(),
        "TextPart" : "Welcome,\r\n\r\nPlease visit the following link by copying the following link into your browser to reset your password.\r\n\r\n{{reset_link}}\r\n\r\nThank you.\r\n\r\nSwinTIP\r\ninfo@corputip.me\r\n"
        }
    )
    print(response)


def DeleteTemplate():
    response = ses_client.delete_template(
        TemplateName = 'SwinTIP-Account-Activation'
    )
    print(response)
