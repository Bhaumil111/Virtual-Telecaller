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

    calls_data.append({
        "Call SID" : call.sid,
        "From" :call._from,
        "To":call.to,
        "Status":call.status,
        "Start Time":call.start_time,
        "End Time":call.end_time,
        "Duration":call.duration
    })


def fetch_call_logs():
    return calls_data
