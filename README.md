# VectorOWL Deploy

Docker-only deployment for [VectorOWL](https://vectorstreamsystems.com/) — no source code required.

## Quick start

```bash
# 1. Clone this repo (contains only Docker configs, no source code)
git clone https://github.com/radsilent/vectorowl-deploy.git
cd vectorowl-deploy

# 2. Configure your license key
cp .env.example .env
# Edit .env and set VECTOROWL_LICENSE_KEY

# 3. (Optional) Place your UI build in ./www/
# If you want the web UI served at :80, copy your dist/ files here.
# Otherwise Caddy will serve a 404 on static requests.

# 4. Start
docker compose up -d
```

## What's included

- `docker-compose.yml` — pulls `radsilent/vectorowl:latest` from Docker Hub
- `Caddyfile` — reverse proxy for API + static UI
- `.env.example` — license key and optional LLM config

## Requirements

- Docker + Docker Compose
- A valid VectorOWL license key ([get one](mailto:streamline@vectorstreamsystems.com))

## Upgrade

```bash
docker compose pull
docker compose up -d
```

## Logs

```bash
docker logs -f vectorowl
docker logs -f vectorowl-caddy
```
