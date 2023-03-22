from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from model import Club

app = FastAPI()

from database import (
    fetch_one_club,
    fetch_all_clubs,
    create_club,
    update_club,
    remove_club,
)

origins = ['http://localhost:3000']

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials = True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/api/club")
async def get_club():
    response = await fetch_all_clubs()
    return response

@app.get("/api/club/{name}", response_model=Club)
async def get_club_by_name(name):
    response = await fetch_one_club(name)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.post("/api/club", response_model=Club)
async def post_club(club: Club):
    response = await create_club(club.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/club/{name}/", response_model=Club)
async def put_club(name: str, desc: str, size: int, status: bool, email: str, tags: Union[list, None] = None):
    if tags:
        response = await update_club(name, desc, size, status, email, tags)
    else:
        response = await update_club(name, desc, size, status, email)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.delete("/api/club/{name}")
async def delete_club(name):
    response = await remove_club(name)
    if response:
        return "Successfully deleted club"
    raise HTTPException(404, f"There is no club with the name {name}")
