# Graphs visualization system

В данном репозитории представлена Back-End часть курсовой.

## Установка базы данных

Рекомендуется использовать базу данных PostgreSQL

Установите пакет утилит Postgre по ссылке: https://get.enterprisedb.com/postgresql/postgresql-16.1-1-windows-x64.exe

Затем откройте pgAdmin и создайте базу данных, запомните её название.

## Клонирование репозитория

Откройте папку, в которую необходимо склонировать репозиторий с помощью утилиты git bash, затем выполните следующую команду:

```bash
git clone https://github.com/AlexeyVorobyev/backend-course.git
```

## Запуск, установка зависимостей и соединение с базой данных.

Откройте склонированный локальный репозиторий с помощью вашей IDE, перейдите в терминал и выполните следующие команды:

```bash
# Установка node_modules
yarn
```

Далее необходимо подключить базу данных, создаёте в корневом каталоге проекта файл .env и заполните его ссылкой на вашу базу данных в необходимом формате.

```env
DATABASE_URL="postgresql://login:password@address:port/db_name?schema=public"
```
Убедившись в корректном подключении базы данных обновим схему БД и запустим программу.

```bash
# Обновление схемы базы данных
npx prisma migrate dev

# Запуск программы
yarn run start
```
