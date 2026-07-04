import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

url = os.getenv('DATABASE_URL')
print(url)
engine = create_engine(url, connect_args={'sslmode': 'require'}, pool_pre_ping=True)

try:
    with engine.connect() as conn:
        print('connected')
        print(conn.execute(text('select current_database()')).scalar())
except Exception as exc:
    import traceback
    traceback.print_exc()
finally:
    engine.dispose()
