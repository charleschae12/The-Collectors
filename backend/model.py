from pydantic import BaseModel

class Club(BaseModel):
  name: str
  description: str
  size: int
  status: bool
  email: str

  