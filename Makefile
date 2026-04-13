SHELL := /bin/sh

COMPOSE := docker compose
SERVICE := workspace
PNPM := pnpm

.DEFAULT_GOAL := help

.PHONY: help build setup install up run dev restart stop down cleanup clean clean-volumes shell logs logs-all logs-once test test-unit test-content lint app-build validate e2e-setup e2e

help:
	@printf '%s\n' 'The Deep Vault container targets:'
	@printf '%s\n' ''
	@printf '%s\n' '  make setup          Build the workspace image and install dependencies'
	@printf '%s\n' '  make run            Start the game dev server at http://localhost:5173'
	@printf '%s\n' '  make restart        Stop containers, then start the game dev server'
	@printf '%s\n' '  make up             Start the long-running workspace container'
	@printf '%s\n' '  make shell          Open a shell in the workspace container'
	@printf '%s\n' '  make logs           Follow workspace container logs'
	@printf '%s\n' '  make logs-all       Follow logs for every Compose service'
	@printf '%s\n' '  make logs-once      Print recent workspace container logs'
	@printf '%s\n' '  make stop           Stop running containers'
	@printf '%s\n' '  make cleanup        Stop containers and remove orphan containers/networks'
	@printf '%s\n' '  make clean-volumes  Cleanup plus remove Docker volumes for pnpm and Playwright caches'
	@printf '%s\n' ''
	@printf '%s\n' 'Validation:'
	@printf '%s\n' '  make test           Run unit tests'
	@printf '%s\n' '  make test-content   Run content tests'
	@printf '%s\n' '  make lint           Run ESLint'
	@printf '%s\n' '  make build          Build the workspace image'
	@printf '%s\n' '  make app-build      Build the static app'
	@printf '%s\n' '  make validate       Run the full validation suite'
	@printf '%s\n' '  make e2e-setup      Install Playwright Chromium in the shared Docker volume'
	@printf '%s\n' '  make e2e            Run Playwright tests'

build:
	$(COMPOSE) build $(SERVICE)

setup: build install

install:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) install --frozen-lockfile

up:
	$(COMPOSE) up -d $(SERVICE)

run dev:
	$(COMPOSE) run --rm --service-ports $(SERVICE) $(PNPM) dev

restart: down run

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

cleanup clean:
	$(COMPOSE) down --remove-orphans

clean-volumes:
	$(COMPOSE) down --volumes --remove-orphans

shell:
	$(COMPOSE) run --rm $(SERVICE) bash

logs:
	$(COMPOSE) logs -f $(SERVICE)

logs-all:
	$(COMPOSE) logs -f

logs-once:
	$(COMPOSE) logs --tail=200 $(SERVICE)

test test-unit:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) test:unit

test-content:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) test:content

lint:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) lint

app-build:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) build

validate:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) validate

e2e-setup:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) test:e2e:setup

e2e:
	$(COMPOSE) run --rm $(SERVICE) $(PNPM) test:e2e
