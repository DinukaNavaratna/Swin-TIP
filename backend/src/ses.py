import boto3

ses_client = boto3.client('ses', 
                aws_access_key_id="AKIARMX2BDBX4RSABBK6", 
                aws_secret_access_key="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", 
                region_name="us-east-2"
            )

def AccountActivationTeamplate():
    template = open("templates/account_activation_email.txt", "r")
    response = ses_client.create_template(
        Template={
        "TemplateName" : "SwinTIP-Account-Activation",
        "SubjectPart" : "Please activate your account...",
        "HtmlPart" : template.read(),
        "TextPart" : "Welcome,\r\n\r\nPlease visit the following link by copying the following link into your browser to activate your account.\r\n\r\n{{activation_link}}\r\n\r\nThank you.\r\n\r\nSwinTIP\r\n104205090@student.swin.edu.au\r\n"
        }
    )
    print(response)


def send_email(to, template, data):
    response = ses_client.send_templated_email(
        Source = 'SwinTIP <noreply@corputip.me>',
        Destination = {
            'ToAddresses': to
        },
        Template = template,
        TemplateData = data
    )
    print(response)