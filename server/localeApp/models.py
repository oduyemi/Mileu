from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, sessionmaker, registry
from sqlalchemy.ext.declarative import declarative_base
from localeApp import Base, engine


Session = sessionmaker(bind=engine)
session = Session()

mapper_registry = registry()
mapper_registry.configure()

Base = declarative_base()



class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    fname = Column(String(250), index=True)
    lname = Column(String(250), index=True)
    email = Column(String(150), index=True)
    pwd = Column(String(120), index=True)
    hashed_pwd = Column(String(120), index=True)

    api_keys = relationship("APIKey", back_populates="user")

class Region(Base):
    __tablename__ = "region"
    region_id = Column(Integer, primary_key=True, index=True)
    region_name = Column(String(255), index=True, nullable=False)

    states = relationship("State", back_populates="region")


class State(Base):
    __tablename__ = "state"
    state_id = Column(Integer, primary_key=True, index=True)
    state_name = Column(String(250), index=True, nullable=False)
    state_region_id = Column(Integer, ForeignKey("region.region_id"), nullable=False)

    region = relationship("Region", back_populates="states")  
    lgas = relationship("LGA", back_populates="state")


class LGA(Base):
    __tablename__ = "lga"
    lga_id = Column(Integer, primary_key=True, index=True)
    lga_name = Column(String(250), index=True)
    lga_stateid = Column(Integer, ForeignKey("state.state_id"), nullable=False)

    state = relationship("State", back_populates="lgas") 



class APIKey(Base):
    __tablename__ = "api_key"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(255), index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)

    user = relationship("User", back_populates="api_keys")