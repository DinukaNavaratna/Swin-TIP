import boto3

ses_client = boto3.client('ses', 
                aws_access_key_id=os.getenv("SES_KEY_ID"), 
                aws_secret_access_key=os.getenv("SES_KEY"), 
                region_name=os.getenv("SES_REGION")
            )

def AccountActivationTeamplate():
    template = open("templates/account_activation_email.txt", "r")
    response = ses_client.create_template(
        Template={
        "TemplateName" : "Account-Activation",
        "SubjectPart" : "Please activate your account...",
        "HtmlPart" : template.read(),
        "TextPart" : "Welcome,\r\n\r\nPlease visit the following link by copying the following link into your browser to activate your account.\r\n\r\n{{activation_link}}\r\n\r\nThank you.\r\n\r\nSwinTIP\r\n104205090@student.swin.edu.au\r\n"
        }
    )
    print(response)


def send_email(to, template, data):
    response = ses_client.send_templated_email(
        Source = 'dinuka@archelolab.com',
        Destination = {
            'ToAddresses': to
        },
        Template = template,
        TemplateData = data
    )
    print(response)