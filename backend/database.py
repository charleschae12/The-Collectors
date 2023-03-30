import motor.motor_asyncio
from model import Model
from typing import Union
from fastapi import FastAPI

app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

database = client.TheCollectors
clubs_collection = database.Clubs
orgs_collection = database.Organizations

async def fetch_one_club(name, find_org = False):
    if find_org:
        document = await orgs_collection.find_one({"name": name})
    else:
        document = await clubs_collection.find_one({"name": name})
    return document

async def fetch_all_clubs(find_orgs = False):
    if find_orgs:
        cursor = orgs_collection.find({})
    else:
        cursor = clubs_collection.find({})
    clubs = []
    async for document in cursor:
        clubs.append(Model(**document))
    return clubs

async def create_club(club, create_org = False):
    if create_org:
        await orgs_collection.insert_one(club)
    else:
        await clubs_collection.insert_one(club)
    return club

async def update_club(name, desc, size, status, email):
    await collection.update_many({"name": name}, {"$set": {"description": desc, "size": size, "status": status, "email": email}})
    document = await collection.find_one({"name": name})
    return document

async def remove_club(name):
    return await collection.delete_one({"name": name})

async def add_tag(name, tag):
    await collection.update_one({"name": name}, {"$push": {"tags": tag}})
    document = await collection.find_one({"name": name})
    return document

async def remove_tag(name, tag):
    await collection.update_one({"name": name}, {"$pull": {"tags": tag}})
    document = await collection.find_one({"name": name})
    return document
