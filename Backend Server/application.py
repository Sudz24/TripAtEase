#!/usr/bin/python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import botocore
from tables import AllJourneys,UserJourneys, db;
import json
import sqlalchemy
from sqlalchemy import or_,desc

from pytz import timezone
from datetime import datetime, timedelta

application = Flask(__name__)
cors=CORS(application,resources={r'/*':{'origins':'*'}})
cog = boto3.client('cognito-idp', region_name='us-west-2')

cogcli='7a8rdprge51bkchu58suhq6una'

application.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://viomo:sud24399@viomo.ccbsytp0l81b.us-east-1.rds.amazonaws.com:5432/postgres'
db.init_app(application)

#for SignUp with AWS Cognito
@application.route('/signup',methods=['GET', 'POST'])
def signup():
    try:
        content = json.loads(request.data)

        cog.sign_up(
            ClientId = cogcli,
            Username = content['username'],
            Password = content['password'],
            UserAttributes=[{'Name':'email','Value':content['email']}]
        )

        return 'true'
    except cog.exceptions.UsernameExistsException:
        return 'Police ID already exists!'
    except cog.exceptions.InvalidPasswordException:
        return 'Password must have atleast one uppercase, one number and a symbol!'
    except cog.exceptions.InvalidParameterException:
        return 'Invalid Email ID, Check again!'
    except Exception as e:
        print('Exception: ' +str(e))
        return str(e)

#for Login with AWS Cognito
@application.route('/login', methods=['GET', 'POST'])
def login():
    try:
        print(request.data)
        content = json.loads(request.data)
        print(content)

        auth = cog.initiate_auth(
                AuthFlow = 'USER_PASSWORD_AUTH',
                AuthParameters = {
                        'USERNAME': content['username'],
                        'PASSWORD': content['password']
                },
                        ClientId = cogcli
        )

        return  {
            'status' : True,
            'content': auth['AuthenticationResult'] }
            
    except cog.exceptions.UserNotConfirmedException:
        return  { 
            'status' : False,
            'content': 'User is not confirmed. Please check your mail.' }
    except cog.exceptions.UserNotFoundException:
        return { 
            'status' : False,
            'content':'User does not exist. Check again.' }
    except cog.exceptions.NotAuthorizedException:
        return { 
            'status' : False,
            'content': 'Username/Password is incorrect' }
    except Exception as e:
        print("Exception: "+ str(e))
        return  {
            'status' : False,
            'content': str(e) }

#Fetch data for booking a journey based on the given From, To and Mode.
@application.route('/getAllJourneys',methods=['GET', 'POST'])
def getAllJourneys():
    try:
        content = json.loads(request.data)
        responses = {}
        array = []

        #To remove user's already booked journeys
        jids= []
        results = UserJourneys.query.filter_by(username = content['username']).all()
        for result in results:
            jids.append(result.jid)

        if content['mode'] == 'Any' :
            results = AllJourneys.query.filter(AllJourneys.jid.notin_(jids)).filter_by(fromCity=content['fromCity']).filter_by(toCity = content['toCity']).all()
        else:
            results = AllJourneys.query.filter(AllJourneys.jid.notin_(jids)).filter_by(toCity = content['toCity']).filter_by(mode = content['mode']).all()

        for result in results:
            response = {}
            response['dateDep'] = str(result.dateDep)
            response['dateArr'] = str(result.dateArr)
            response['timeDep'] = str(result.timeDep)
            response['timeArr'] = str(result.timeArr)
            response['fare'] = result.fare
            response['company'] = result.company
            response['jid'] = result.jid
            response['mode'] = result.mode
            array.append(response)

        responses["data"] = array

        return json.dumps(responses)
    except sqlalchemy.orm.exc.NoResultFound:
        return 'false'
    except Exception as e:
        return str(e)

#Fetch the user's upcoming bookings
@application.route('/getUserJourneys',methods=['GET', 'POST'])
def getUserJourneys():
    try:
        content = json.loads(request.data)
        responses = {}
        array = []

        results = UserJourneys.query.filter_by(username = content['username']).all()
       
        for result in results:
            response = {}
            response['dateDep'] = str(result.dateDep)
            response['dateArr'] = str(result.dateArr)
            response['timeDep'] = str(result.timeDep)
            response['timeArr'] = str(result.timeArr)
            response['fare'] = result.fare
            response['company'] = result.company
            response['jid'] = result.jid
            response['mode'] = result.mode
            response['fromCity'] = result.fromCity
            response['toCity'] = result.toCity
            array.append(response)

        responses["data"] = array

        return json.dumps(responses)
    except sqlalchemy.orm.exc.NoResultFound:
        return 'false'
    except Exception as e:
        return str(e)

#For making a booking
@application.route('/bookJourney',methods=['GET', 'POST'])
def bookJourney():
    try:
        content = json.loads(request.data)
        responses = {}

        result = AllJourneys.query.filter_by(jid = content['jid']).first()

        userJourney = UserJourneys(username = content['username'],
        dateDep = str(result.dateDep), 
        dateArr= str(result.dateArr),
        timeDep = str(result.timeDep),
        timeArr= str(result.timeArr),
        fare = result.fare,
        company = result.company,
        jid = result.jid,
        mode = result.mode,
        fromCity = result.fromCity,
        toCity = result.toCity)

        db.session.add(userJourney)
        db.session.commit()

        return 'true'

    except sqlalchemy.orm.exc.NoResultFound:
        return 'false'
    except Exception as e:
        return str(e)

@application.route('/test', methods=["GET", "POST"]) 
def test():
   return 'true'

if __name__ == "__main__":
    application.run(host="0.0.0.0", debug=True)
