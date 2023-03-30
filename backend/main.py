from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from typing import Union
from database import *

app = FastAPI()

origins = ['http://localhost:3000']

app.add_middleware(CORSMiddleware,
  allow_origins=origins,
  allow_credentials = True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

# GET all clubs/organizations
@app.get("/api/clubs")
async def get_clubs():
    response = await fetch_all_clubs()
    return response

@app.get("/api/orgs")
async def get_orgs():
    response = await fetch_all_clubs(True)
    return response

# GET one club/organizations
@app.get("/api/clubs/{name}", response_model = Club)
async def get_club_by_name(name):
    response = await fetch_one_club(name)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.get("/api/orgs/{name}", response_model = Club)
async def get_org_by_name(name):
    response = await fetch_one_club(name, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

# POST (create) a club/organization
@app.post("/api/clubs", response_model = Club)
async def post_club(club: Club):
    response = await create_club(club.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong when creating a club")

@app.post("/api/orgs", response_model = Club)
async def post_org(club: Club):
    response = await create_club(club.dict(), True)
    if response:
        return response
    raise HTTPException(400, "Something went wrong when creating an organization")

# PUT (update) a club/organization
@app.put("/api/clubs/{name}/", response_model = Club)
async def put_club(name: str, desc: str, size: int, status: bool, email: str):
    response = await update_club(name, desc, size, status, email)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.put("/api/orgs/{name}/", response_model = Club)
async def put_org(name: str, desc: str, size: int, status: bool, email: str):
    response = await update_club(name, desc, size, status, email, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

# DELETE a club/organization
@app.delete("/api/clubs/{name}")
async def delete_club(name):
    response = await remove_club(name)
    if response:
        return "Successfully deleted club"
    raise HTTPException(404, f"There is no club with the name {name}")

@app.delete("/api/orgs/{name}")
async def delete_org(name):
    response = await remove_club(name, True)
    if response:
        return "Successfully deleted organization"
    raise HTTPException(404, f"There is no organization with the name {name}")

# PUT club/organization tags
@app.put("/api/club/{name}/tags/", response_model = Club)
async def put_club_tag(name: str, tag: str):
    response = await add_tag(name, tag)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.put("/api/orgs/{name}/tags/", response_model = Club)
async def put_org_tag(name: str, tag: str):
    response = await add_tag(name, tag, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

# DELETE club/organization tags
@app.delete("/api/club/{name}/tags/", response_model = Club)
async def delete_club_tag(name: str, tag: str):
    response = await remove_tag(name, tag)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.delete("/api/orgs/{name}/tags/", response_model = Club)
async def delete_org_tag(name: str, tag: str):
    response = await remove_tag(name, tag, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")
