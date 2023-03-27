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

@app.get("/api/clubs")
async def get_clubs():
    response = await fetch_all_clubs(False)
    return response

@app.get("/api/orgs")
async def get_orgs():
    response = await fetch_all_clubs(True)
    return response

@app.get("/api/clubs/{name}", response_model = Model)
async def get_club_by_name(name):
    response = await fetch_one_club(name, False)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.get("/api/clubs/{name}", response_model = Model)
async def get_org_by_name(name):
    response = await fetch_one_club(name, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

@app.post("/api/clubs/", response_model = Model)
async def post_club(club: Model):
    response = await create_club(club.dict(), False)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.post("/api/orgs/", response_model = Model)
async def post_club(club: Model):
    response = await create_club(club.dict(), True)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

## review PUT commands
@app.put("/api/clubs/{name}/", response_model = Model)
async def put_club(name: str, desc: str, size: int, status: bool, email: str, tags: Union[list, None] = None):
    if tags:
        response = await update_club(name, desc, size, status, email, tags)
    else:
        response = await update_club(name, desc, size, status, email)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.put("/api/clubs/{name}/", response_model = Model)
async def put_club(name: str, desc: str, size: int, status: bool, email: str, tags: Union[list, None] = None):
    if tags:
        response = await update_club(name, desc, size, status, email, tags, False)
    else:
        response = await update_club(name, desc, size, status, email)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.delete("/api/clubs/{name}")
async def delete_club(name):
    response = await remove_club(name, False)
    if response:
        return "Successfully deleted club"
    raise HTTPException(404, f"There is no club with the name {name}")

@app.delete("/api/orgs/{name}")
async def delete_club(name):
    response = await remove_club(name, True)
    if response:
        return "Successfully deleted club"
    raise HTTPException(404, f"There is no organization with the name {name}")
