from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, declarative_base

__engine__ = create_engine('mysql+pymysql://user:password@db:3306/testdb')
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=__engine__))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import models   
    Base.metadata.create_all(bind=__engine__)