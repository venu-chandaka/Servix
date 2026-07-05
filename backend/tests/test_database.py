from app.db.database import build_async_database_url


def test_build_async_database_url_encodes_password_for_asyncpg():
    raw_url = "postgresql://postgres:Fixflow@ai1@db.example.supabase.co:5432/postgres"

    normalized = build_async_database_url(raw_url)

    assert normalized.startswith("postgresql+asyncpg://")
    assert "Fixflow%40ai1" in normalized
    assert "sslmode" not in normalized
