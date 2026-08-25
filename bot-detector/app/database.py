import sqlite3
from pathlib import Path


DATABASE = Path(__file__).parent.parent / "sora.db"


def get_connection():
    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    return connection


def initialize_database():

    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp REAL NOT NULL,
            path TEXT NOT NULL,
            event_type TEXT NOT NULL,
            classification TEXT NOT NULL,
            score INTEGER NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()


def save_event(
    timestamp,
    path,
    event_type,
    classification,
    score
):

    connection = get_connection()

    connection.execute(
        """
        INSERT INTO events (
            timestamp,
            path,
            event_type,
            classification,
            score
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            timestamp,
            path,
            event_type,
            classification,
            score,
        ),
    )

    connection.commit()
    connection.close()


def get_recent_events(limit=50):

    connection = get_connection()

    rows = connection.execute(
        """
        SELECT *
        FROM events
        ORDER BY timestamp DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()

    connection.close()

    return [dict(row) for row in rows]