import requests
import uuid
from flask import *
from flask_cors import CORS, cross_origin
import json
import os
from datetime import datetime

# twilio
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse

# firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

app = Flask(__name__)
cred = credentials.Certificate("./firebase-config.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
twilio_cell = os.environ['TWILIO_NUMBER']
twilio_client = Client(account_sid, auth_token)

@app.route("/send-reminder", methods=['POST'])
def connect_twilio():
    try:
        body = request.json
        phone_number = body.get('phone_number', '')

        if phone_number == '':
            return "Please specify a phone_number", 400
    except Exception:
        return "You probably forgot to specify a phone number. If you do but the error persists, ask Irenna :)", 500

    currentMonth = datetime.now().month
    int_to_month = {
        1: "January",
        2: "February",
        3: "March", 
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September", 
        10: "October",
        11: "November", 
        12: "December"
    }

    twilio_client.messages.create(
        body=f"Hi there! {int_to_month[currentMonth]} had just begun. Don't forget to work on your monthly resolution!",
        from_=twilio_cell,
        to=phone_number,
    )
    return "Message sent", 200

if __name__ == '__main__':
  app.run(debug=True)
