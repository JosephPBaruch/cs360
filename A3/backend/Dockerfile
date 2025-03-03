FROM python:3.10-slim

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .


# Ensure the root directory is writable by myuser
RUN chown -R myuser:myuser /backend

RUN useradd -m myuser
USER myuser


EXPOSE 8082

CMD ["python", "manage.py", "runserver", "0.0.0.0:8082"]
