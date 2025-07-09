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

calls_data = []



for call in calls:

    # print (f"Call SID: {call.sid}")
    # print (f"From: {call._from}")
    # print (f"To: {call.to}")
    # print (f"Status: {call.status}")
    # print (f"Start Time: {call.start_time}")
    # print (f"End Time: {call.end_time}")
    # print (f"Duration: {call.duration}")


    

    calls_data.append({
        "call_sid" : call.sid,
        "from" :call._from,
        "to":call.to,
        "status":call.status,
        "start_time":call.start_time,
        "end_time":call.end_time,
        "duration":call.duration
    })


def fetch_call_logs():
    return calls_data
