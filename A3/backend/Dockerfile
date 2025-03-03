FROM python:3.10-slim

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd -m myuser
USER myuser

# Create the database file and ensure it is writable by myuser
RUN mkdir -p /backend/db && touch /backend/db/db.sqlite3 && chown myuser:myuser /backend/db/db.sqlite3



EXPOSE 8082

CMD ["python", "manage.py", "runserver", "0.0.0.0:8082"]