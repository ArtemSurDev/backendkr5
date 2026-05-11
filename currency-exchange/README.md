# Currency Exchange

Сервис бэкенда обменного пункта валют: роли пользователей (админ, кассир, клиент), курсы валют, операции и PDF-отчеты. Для защищенных эндпоинтов используется JWT-аутентификация.

## Стек технологий
- Python 3.12, FastAPI
- SQLAlchemy, PostgreSQL
- Pydantic v1
- JWT (python-jose), Passlib (bcrypt)
- ReportLab (PDF)
- Docker, Docker Compose

## Запуск через Docker (самый простой и безопасный вариант)
Вариант без доступа к PyPI из контейнера: зависимости скачиваются на хосте один раз, сборка Docker проходит офлайн.

1. Скачайте wheel-пакеты на хосте (если уже есть, повторно не скачиваются):

```bash
cd /Users/artem/WebstormProjects/backendkr5/currency-exchange
./backend/scripts/download_wheels.sh
```

Если нужно перескачать принудительно:

```bash
FORCE=1 ./backend/scripts/download_wheels.sh
```

2. Соберите и запустите контейнеры:

```bash
docker compose up -d --build
```

3. API будет доступно по адресу `http://localhost:8081`.

### Окружение (значения по умолчанию из Docker Compose)
- Порт приложения: `8081`
- Порт БД на хосте: `5433`
- Админ по умолчанию: `admin@exchange.ru` / `admin12345`

### Инициализация БД
Таблицы создаются автоматически при старте приложения через SQLAlchemy metadata.

## Основные эндпоинты API
Аутентификация
- `POST /api/auth/register` — регистрация клиента
- `POST /api/auth/login` — получение JWT-токена
- `GET /api/auth/me` — текущий пользователь (JWT)
- `PATCH /api/auth/me` — обновление профиля (JWT)
- `POST /api/auth/me/change-password` — смена пароля (JWT)

Валюты
- `GET /api/currencies` — список валют
- `GET /api/currencies/{currency_id}` — валюта по id

Админ (JWT, роль admin)
- `POST /api/admin/admins`
- `GET /api/admin/admins`
- `DELETE /api/admin/admins/{admin_id}`
- `POST /api/admin/cashiers`
- `GET /api/admin/cashiers`
- `PATCH /api/admin/cashiers/{cashier_id}`
- `PATCH /api/admin/cashiers/{cashier_id}/status`
- `PATCH /api/admin/cashiers/{cashier_id}/reset-password`
- `POST /api/admin/currencies`
- `PUT /api/admin/currencies/{currency_id}`
- `DELETE /api/admin/currencies/{currency_id}`
- `POST /api/admin/exchange-rates`
- `GET /api/admin/exchange-rates`

Кассир (JWT, роли cashier/admin)
- `GET /api/cashiers/clients/search`
- `POST /api/cashiers/clients/quick-register`
- `PUT /api/cashiers/clients/{client_id}`

Операции (JWT)
- `POST /api/operations`
- `GET /api/operations/my`
- `GET /api/operations/receipt/{operation_id}`

Отчеты (JWT, роль admin)
- `POST /api/reports/stats`
- `POST /api/reports/stats/pdf`

