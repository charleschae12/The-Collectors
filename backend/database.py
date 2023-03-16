from model import Club
from fastapi import FastAPI

import motor.motor_asyncio

app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.TheCollectors
collection = database.Clubs

async def fetch_one_club(name):
    document = await collection.find_one({"name": name})
    return document

async def fetch_all_clubs():
    clubs = []
    cursor = collection.find({})
    async for document in cursor:
        clubs.append(Club(**document))
    return clubs

async def create_club(club):
    document = club
    result = await collection.insert_one(document)
    return document


async def update_club(name, desc, size, status, email):
    await collection.update_many({"name": name}, {"$set": {"description": desc, "size": size, "status": status, "email": email}})
    document = await collection.find_one({"name": name})
    return document

async def remove_club(name):
    await collection.delete_one({"name": name})
    return True