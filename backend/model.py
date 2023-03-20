from pydantic import BaseModel

class Club(BaseModel):
  name: str
  description: str
  email: str
  status: bool
  size: int
  