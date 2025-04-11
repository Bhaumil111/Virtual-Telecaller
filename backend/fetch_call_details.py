import os

from twilio.rest import Client

from dotenv import load_dotenv
load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(account_sid,auth_token)

#fetch call details

calls = client.calls.list()

for call in calls:

    print( f"Call SID: {call.sid}")
    print(f"From: {call._from}")
    print(f"To: {call.to}")
    print(f"Status: {call.status}")
    print(f"Start Time: {call.start_time}")
    print(f"End Time : {call.end_time}")
    print(f"Duration: {call.duration} seconds")


