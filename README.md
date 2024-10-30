# TED Web Server

## Getting started

Install docker ([docs](https://docs.docker.com/engine/install/))

Clone this repo

Set up environment

```
cp .env.template .env
```

Change secrets in `.env`

```
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

Download data

```
https://zenodo.org/records/10848710
```

Start docker compose

```
docker compose build
docker compose up -d
```

Load data

```
docker compose exec db psql -U postgres app -f data/load_domainsummary.sql
docker compose exec db psql -U postgres app -f data/load_interactionsummary.sql
docker compose exec db psql -U postgres app -f data/load_chainparse.sql
docker compose exec db psql -U postgres app -c 'select tuples_processed from pg_stat_progress_copy'
```
