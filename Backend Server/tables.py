from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import *
from pytz import timezone

db = SQLAlchemy()

class AllJourneys(db.Model):
    __tablename__ = 'allJourneys'

    jid = db.Column(db.Integer, primary_key = True)
    dateDep = db.Column(db.Date, nullable = False)
    dateArr = db.Column(db.Date, nullable = False)
    timeDep = db.Column(db.Time, nullable = False)
    timeArr = db.Column(db.Time, nullable = False)
    fare = db.Column(db.Integer, nullable = False)
    company = db.Column(db.Text, nullable = False)
    mode = db.Column(db.Text, nullable = False)
    fromCity = db.Column(db.Text, nullable = False)
    toCity = db.Column(db.Text, nullable = False)

    def __init__(self, jid, dateDep, dateArr, timeDep, timeArr, fare, company, mode, fromCity, toCity):
        self.jid = jid
        self.dateDep = dateDep
        self.dateArr = dateArr
        self.timeDep = timeDep
        self.timeArr = timeArr
        self.fare = fare
        self.company =company
        self.mode =mode
        self.fromCity = fromCity
        self.toCity = toCity


class UserJourneys(db.Model):
    __tablename__ = 'userJourneys'

    jid = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.Text, nullable = False, primary_key = True)
    dateDep = db.Column(db.Date, nullable = False)
    dateArr = db.Column(db.Date, nullable = False)
    timeDep = db.Column(db.Time, nullable = False)
    timeArr = db.Column(db.Time, nullable = False)
    fare = db.Column(db.Integer, nullable = False)
    company = db.Column(db.Text, nullable = False)
    mode = db.Column(db.Text, nullable = False)
    fromCity = db.Column(db.Text, nullable = False)
    toCity = db.Column(db.Text, nullable = False)

    def __init__(self, jid, username, dateDep, dateArr, timeDep, timeArr, fare, company, mode, fromCity, toCity):
        self.jid = jid
        self.username = username
        self.dateDep = dateDep
        self.dateArr = dateArr
        self.timeDep = timeDep
        self.timeArr = timeArr
        self.fare = fare
        self.company =company
        self.mode =mode
        self.fromCity = fromCity
        self.toCity = toCity
        
