from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Club(BaseModel):
  name: str
  description: str
  email: str
  status: bool
  size: int
  tags: Optional[List[str]] = None

class Event(BaseModel):
  clubName: str
  name: str
  description: str
  date: datetime
  
class User(BaseModel):
  rcsid: str
  email: str
  password: str
  major: Optional[str] = ""
  graduate_year: Optional[str] = ""
  description: Optional[str] = ""
  discode: Optional[str] = ""

class LoginInput(BaseModel):
  email: str
  password: str