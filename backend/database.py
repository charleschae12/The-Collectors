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

async def update_club(name, desc, size, status, email, tags: Union[list, None] = None, update_org = False):
    if update_org:
        await orgs_collection.update_many({"name": name}, {"$set": {"description": desc, "size": size, "status": status, "email": email, "tags": tags}})
        document = await orgs_collection.find_one({"name": name})
    else:
        await clubs_collection.update_many({"name": name}, {"$set": {"description": desc, "size": size, "status": status, "email": email, "tags": tags}})
        document = await clubs_collection.find_one({"name": name})
    return document

async def remove_club(name, remove_org = False):
    if remove_org:
        return await orgs_collection.delete_one({"name": name})
    else:
        return await clubs_collection.delete_one({"name": name})
