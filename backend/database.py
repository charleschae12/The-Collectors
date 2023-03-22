import motor.motor_asyncio
from model import Club
from typing import Union
from fastapi import FastAPI

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
    await collection.insert_one(club)
    return club

async def update_club(name, desc, size, status, email, tags: Union[list, None] = None):
    await collection.update_many({"name": name}, {"$set": {"description": desc, "size": size, "status": status, "email": email, "tags": tags}})
    document = await collection.find_one({"name": name})
    return document

async def remove_club(name):
    return await collection.delete_one({"name": name})
