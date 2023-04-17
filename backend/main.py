from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import *
from model import LoginInput

app = FastAPI()

origins = [
    "http://localhost:3000",  # Allow the React frontend to communicate with the API
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    """Establish root."""
    return {"Hello": "World"}

# GET clubs/orginizations/events
@app.get("/api/clubsorgs")
async def get_clubsorgs():
    """Return a list of all clubs AND organizations."""
    response = await fetch_all_clubsorgs()
    return response

@app.get("/api/clubs")
async def get_clubs():
    """Return a list of all clubs."""
    response = await fetch_all_clubs()
    return response

@app.get("/api/orgs")
async def get_orgs():
    """Return a list of organizations."""
    response = await fetch_all_clubs(True)
    return response

@app.get("/api/events")
async def get_events():
    """Return a list of events."""
    response = await fetch_all_events()
    return response

# GET one club/organization
@app.get("/api/clubs/{name}", response_model = Club)
async def get_club_by_name(name):
    """Fetch specified club."""
    response = await fetch_one_club(name)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.get("/api/orgs/{name}", response_model = Club)
async def get_org_by_name(name):
    """Fetch specified organization."""
    response = await fetch_one_club(name, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

# POST a club/organization/event
@app.post("/api/clubs", response_model = Club)
async def post_club(club: Club):
    """Create a club."""
    response = await create_club(club.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong when creating a club")

@app.post("/api/orgs", response_model = Club)
async def post_org(club: Club):
    """Create an organization."""
    response = await create_club(club.dict(), True)
    if response:
        return response
    raise HTTPException(400, "Something went wrong when creating an organization")

@app.post("/api/events", response_model = Event)
async def post_event(club: Event):
    """Create an event."""
    response = await create_event(club.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong when creating an event")

# PUT a club/organization
@app.put("/api/clubs/{name}/", response_model = Club)
async def put_club(name: str, desc: str, size: int, status: bool, email: str):
    """Update a club."""
    response = await update_club(name, desc, size, status, email)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.put("/api/orgs/{name}/", response_model = Club)
async def put_org(name: str, desc: str, size: int, status: bool, email: str):
    """Update an organization."""
    response = await update_club(name, desc, size, status, email, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

# DELETE a club/organization/event
@app.delete("/api/clubs/{name}")
async def delete_club(name):
    """Remove a club."""
    response = await remove_club(name)
    if response:
        return "Successfully deleted club"
    raise HTTPException(404, f"There is no club with the name {name}")

@app.delete("/api/orgs/{name}")
async def delete_org(name):
    """Remove an organization."""
    response = await remove_club(name, True)
    if response:
        return "Successfully deleted organization"
    raise HTTPException(404, f"There is no organization with the name {name}")

@app.delete("/api/events/{name}")
async def delete_event(name):
    """Remove an event."""
    response = await remove_event(name)
    if response:
        return "Successfully deleted event"
    raise HTTPException(404, f"There is no event with the name {name}")

# PUT club/organization tags
@app.put("/api/club/{name}/tags/", response_model = Club)
async def put_club_tag(name: str, tag: str):
    """Add tag for club."""
    response = await add_tag(name, tag)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.put("/api/orgs/{name}/tags/", response_model = Club)
async def put_org_tag(name: str, tag: str):
    """Add tag for organization."""
    response = await add_tag(name, tag, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

# DELETE club/organization tags
@app.delete("/api/club/{name}/tags/", response_model = Club)
async def delete_club_tag(name: str, tag: str):
    """Remove tag for club."""
    response = await remove_tag(name, tag)
    if response:
        return response
    raise HTTPException(404, f"There is no club with the name {name}")

@app.delete("/api/orgs/{name}/tags/", response_model = Club)
async def delete_org_tag(name: str, tag: str):
    """Remove tag for organization."""
    response = await remove_tag(name, tag, True)
    if response:
        return response
    raise HTTPException(404, f"There is no organization with the name {name}")

# GET one user
@app.get("/api/users/{rcsid}", response_model=User)
async def get_user_by_rcsid(rcsid: str):
    response = await fetch_one_user(rcsid)
    if response:
        return response
    raise HTTPException(404, f"There is no user with the RCSID {rcsid}")

# POST (create) a user
@app.post("/api/register", response_model=User)
async def register_user(user: User):
    existing_user = await fetch_one_user(user.rcsid)
    if existing_user:
        raise HTTPException(400, f"User with RCSID {user.rcsid} already exists")
    response = await create_user(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong when registering a user")

async def authenticate_user(email: str, password: str):
    user = await fetch_one_user(email)
    if not user:
        return None
    if not verify_password(password, user["password"]):
        return None
    return user

@app.post("/api/login")
async def login(login_input: LoginInput):
    user = await authenticate_user(login_input.email, login_input.password)
    if user is None:
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    return {"user": login_input.email, "role": "admin"}
