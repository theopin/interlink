from sqlalchemy import Column, Integer, String
from db.config import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username})>"