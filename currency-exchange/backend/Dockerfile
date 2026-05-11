FROM python:3.12-alpine

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_DEFAULT_TIMEOUT=60

WORKDIR /app

COPY requirements.txt /app/requirements.txt
COPY wheels /wheels
RUN pip install --no-cache-dir --no-index --find-links /wheels -r /app/requirements.txt

COPY . /app

EXPOSE 8081

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8081"]
