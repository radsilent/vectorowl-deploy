# VectorOWL Deploy

Docker-only deployment for [VectorOWL](https://vectorstreamsystems.com/) — no source code required.

---

## Requirements

- **macOS** — [Docker Desktop for Mac](https://docs.docker.com/desktop/setup/install/mac-install/) (Apple Silicon or Intel)
- **Windows** — [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL2 backend recommended) or Windows Subsystem for Linux (WSL2) with Docker Engine
- **Linux** — [Docker Engine](https://docs.docker.com/engine/install/) + [Docker Compose](https://docs.docker.com/compose/install/) (plugin or standalone)
- A valid VectorOWL license key ([request one](mailto:streamline@vectorstreamsystems.com))

---

## macOS

```bash
# 1. Download the deploy package (no source code)
curl -L https://github.com/radsilent/vectorowl-deploy/archive/main.tar.gz | tar xz
mv vectorowl-deploy-main vectorowl && cd vectorowl

# 2. Configure your license key
cp .env.example .env
# Edit .env and set VECTOROWL_LICENSE_KEY

# 3. Start
docker compose up -d
```

Open **http://localhost:8080** (or the port mapped in your compose file).

---

## Windows

### Option A — Docker Desktop (recommended)

Open **PowerShell** and run:

```powershell
# 1. Download the deploy package
Invoke-WebRequest -Uri https://github.com/radsilent/vectorowl-deploy/archive/main.tar.gz -OutFile vectorowl-deploy.tar.gz
tar -xzf vectorowl-deploy.tar.gz
Rename-Item vectorowl-deploy-main vectorowl
Set-Location vectorowl

# 2. Configure your license key
Copy-Item .env.example .env
# Edit .env and set VECTOROWL_LICENSE_KEY

# 3. Start
docker compose up -d
```

### Option B — WSL2

Inside your WSL2 distro:

```bash
# 1. Download the deploy package
curl -L https://github.com/radsilent/vectorowl-deploy/archive/main.tar.gz | tar xz
mv vectorowl-deploy-main vectorowl && cd vectorowl

# 2. Configure your license key
cp .env.example .env
# Edit .env and set VECTOROWL_LICENSE_KEY

# 3. Start
docker compose up -d
```

Access the UI at **http://localhost:8080** from Windows — Docker Desktop forwards the port automatically.

---

## Linux

```bash
# 1. Download the deploy package (contains only Docker configs, no source code)
curl -L https://github.com/radsilent/vectorowl-deploy/archive/main.tar.gz | tar xz
mv vectorowl-deploy-main vectorowl && cd vectorowl

# 2. Configure your license key
cp .env.example .env
# Edit .env and set VECTOROWL_LICENSE_KEY

# 3. Start
docker-compose up -d
```

Open **http://localhost:8080**.

> **Note:** If your system has the newer Docker Compose plugin, use `docker compose up -d` (space, no hyphen). Both work the same.

---

## What's included

- `docker-compose.yml` — pulls `radsilent/vectorowl:latest` from Docker Hub
- `Caddyfile` — reverse proxy for API + static UI
- `.env.example` — license key and optional LLM config

---

## Upgrade

```bash
docker-compose pull
docker-compose up -d
```

> **Note:** Use `docker compose` (space) if you have the Docker Compose plugin instead of the standalone binary.

---

## Logs

```bash
docker logs -f vectorowl
docker logs -f vectorowl-caddy
```

---

## Troubleshooting

### `docker: unknown command: docker compose`

Your installation uses the standalone `docker-compose` binary (older style). Simply replace `docker compose` with `docker-compose` (hyphen) in every command:

```bash
docker-compose up -d
docker-compose pull
docker-compose logs -f
```

If you'd rather use the modern plugin syntax, install it:

```bash
sudo apt-get install docker-compose-plugin   # Debian/Ubuntu
```

---

## GPU acceleration (optional)

Requires the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html).

Add to `docker-compose.yml` under the `vectorowl` service:

```yaml
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
```

And set `VECTOROWL_REQUIRE_TORCH_GPU=true` in your `.env`.
