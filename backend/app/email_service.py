import os
import smtplib

from dotenv import load_dotenv

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()


def send_email(
    receiver_email,
    subject,
    body
):

    sender_email = os.getenv(
        "EMAIL_USER"
    )

    sender_password = os.getenv(
        "EMAIL_PASSWORD"
    )

    print("Sender:", sender_email)
    print("Receiver:", receiver_email)

    message = MIMEMultipart()

    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(
        MIMEText(
            body,
            "plain"
        )
    )

    server = None

    try:

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            sender_email,
            sender_password
        )

        server.sendmail(
            sender_email,
            receiver_email,
            message.as_string()
        )

        print(
            "Email sent successfully"
        )

    except Exception as e:

        print(
            "Email Error:",
            e
        )

    finally:

        if server:
            server.quit()