FROM mcr.microsoft.com/devcontainers/typescript-node:24-bookworm

RUN npx -y playwright@1.59.1 install-deps chromium

RUN corepack enable

WORKDIR /workspace
