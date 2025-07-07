from twilio.rest import Client
import os
from dotenv import load_dotenv

from virtual_tellecaller import generate_output

load_dotenv()
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TO_PHONE_NUMBER = os.getenv("TO_PHONE_NUMBER")
FROM_WHATSAPP_NUMBER = os.getenv("FROM_WHATSAPP_NUMBER")






def send_whatsapp_message(message):


    client = Client(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)
    try:
        message = client.messages.create(

            body=message,
            from_=f"whatsapp:{FROM_WHATSAPP_NUMBER}",  # Ensure this is a valid WhatsApp-enabled Twilio number
            to= f"whatsapp:{TO_PHONE_NUMBER}"  # Ensure this is a valid WhatsApp number


        )

        print(f"Message sent successfully: {message.sid}")
    except Exception as e:
        print(f"Failed to send message: {e}")
        return False
    
    return True

if __name__ == "__main__":
    test_message = "HEllo this from voicy tellecaller"
    send_whatsapp_message(test_message)