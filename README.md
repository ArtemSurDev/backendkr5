# Контрольная работа №5 Суринов Артём ЭФБО-03-24
# Currency Exchange

## Описание
Краткое описание проекта и его функциональности.
Сервис бэкенда обменного пункта валют: роли пользователей (админ, кассир, клиент), курсы валют, операции, отчеты и JWT-аутентификация.

## Стек технологий
- Frontend: React (Vite)
- Backend: Python 3.12, FastAPI
- База данных: PostgreSQL
- Авторизация: JWT (python-jose)
- Контейнеризация: Docker, Docker Compose

## Запуск проекта
### Требования
- Docker и Docker Compose

### Шаги
1. Клонировать репозиторий: `git clone <url>`
2. Скачайте wheel-пакеты для офлайн сборки: `./backend/scripts/download_wheels.sh`
3. Запустить все сервисы: `docker compose up -d --build`
4. Открыть в браузере:
   - Backend API: http://localhost:8082
   - Frontend (dev): http://localhost:5174

## Переменные окружения
Описание всех переменных из `.env.example`.
Фактически используются переменные из `docker-compose.yml`:
- `DATABASE_URL` — строка подключения к PostgreSQL
- `SECRET_KEY` — секрет для JWT
- `ACCESS_TOKEN_EXPIRE_MINUTES` — время жизни токена
- `DEFAULT_ADMIN_EMAIL` — email администратора по умолчанию
- `DEFAULT_ADMIN_PASSWORD` — пароль администратора по умолчанию

## Запуск тестов
`npm test` или `npm run test:coverage`
