from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker
from sqlalchemy.orm import declarative_base

DATABASE_URL = "sqlite+aiosqlite:///./jobportal.db"

engine = create_async_engine(DATABASE_URL,echo=True)

AsyncSessionLocal = async_sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session