FROM python:3.10-slim

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8082

CMD ["python", "manage.py", "runserver", "0.0.0.0:8082"]