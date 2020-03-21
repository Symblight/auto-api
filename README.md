# Adonis API application

### Install
```bash
  npm install
```

### ENV file

add `.env` file

set `DB_PASSWORD` and `KEY`

```bash
HOST=127.0.0.1
PORT=3333
NODE_ENV=development

APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}

CACHE_VIEWS=false
APP_KEY=$GENERATE_KEY

DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=$DB_PASSWORD
DB_DATABASE=dbauto

HASH_DRIVER=bcrypt

```


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Seeds

Run the following command to run startup seed.

```js
adonis seed
```

### Run

Run the following command to run startup seed.

```js
npm run dev
```
