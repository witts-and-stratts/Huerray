#!/usr/bin/env bash
set -euo pipefail

normalize_path() {
  if [[ "$1" == "~" ]]; then
    printf '%s' "$HOME"
  elif [[ "${1:0:2}" == "~/" ]]; then
    printf '%s/%s' "$HOME" "${1:2}"
  else
    printf '%s' "$1"
  fi
}

DEPLOY_PATH="$(normalize_path "${DEPLOY_PATH:-$PWD}")"
DEPLOY_APP_NAME="${DEPLOY_APP_NAME:-huerray-web}"
ACTIVE_COLOR_FILE="${ACTIVE_COLOR_FILE:-${HOME}/.${DEPLOY_APP_NAME}.active-color}"
BLUE_PORT="${BLUE_PORT:-18080}"
GREEN_PORT="${GREEN_PORT:-28080}"
HEALTH_PATH="${HEALTH_PATH:-/health}"
HEALTH_RETRIES="${HEALTH_RETRIES:-60}"
HEALTH_RETRY_DELAY="${HEALTH_RETRY_DELAY:-2}"
CADDY_UPSTREAM_FILE="${CADDY_UPSTREAM_FILE:-/etc/caddy/upstreams/huerray_upstream.caddy}"
CADDY_RELOAD_CMD="${CADDY_RELOAD_CMD:-systemctl reload caddy}"
DRAIN_SECONDS="${DRAIN_SECONDS:-5}"
APP_HOST="${APP_HOST:-}"
COMPOSE_FILE_PATH="${COMPOSE_FILE_PATH:-${DEPLOY_PATH}/docker-compose.yml}"
COMPOSE_PROJECT_DIR="${COMPOSE_PROJECT_DIR:-${DEPLOY_PATH}}"

docker_compose() {
  docker compose --project-directory "${COMPOSE_PROJECT_DIR}" -f "${COMPOSE_FILE_PATH}" "$@"
}

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but not installed or not in PATH"
  exit 1
fi

if [[ ! -f "${COMPOSE_FILE_PATH}" ]]; then
  echo "Compose file not found: ${COMPOSE_FILE_PATH}"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose plugin is required but unavailable"
  exit 1
fi

if [[ -f "${ACTIVE_COLOR_FILE}" ]]; then
  active_color="$(tr -d '[:space:]' < "${ACTIVE_COLOR_FILE}")"
else
  active_color=""
fi

case "${active_color}" in
  blue)
    target_color="green"
    old_color="blue"
    ;;
  green)
    target_color="blue"
    old_color="green"
    ;;
  *)
    target_color="blue"
    old_color=""
    ;;
esac

if [[ "${target_color}" == "blue" ]]; then
  target_port="${BLUE_PORT}"
else
  target_port="${GREEN_PORT}"
fi

target_service="app_${target_color}"

echo "Deploying target service: ${target_service}"
docker_compose up -d --build "${target_service}"

health_url="http://127.0.0.1:${target_port}${HEALTH_PATH}"
echo "Waiting for health endpoint: ${health_url}"

if ! command -v curl >/dev/null 2>&1 && ! command -v wget >/dev/null 2>&1; then
  echo "Health checks require curl or wget, but neither is available"
  exit 1
fi

health_ok=0
for ((i=1; i<=HEALTH_RETRIES; i++)); do
  if command -v curl >/dev/null 2>&1; then
    if curl -fsS "${health_url}" >/dev/null; then
      health_ok=1
      break
    fi
  else
    if wget -q -O - "${health_url}" >/dev/null 2>&1; then
      health_ok=1
      break
    fi
  fi
  echo "Health check attempt ${i}/${HEALTH_RETRIES} failed; retrying in ${HEALTH_RETRY_DELAY}s"
  sleep "${HEALTH_RETRY_DELAY}"
done

if [[ "${health_ok}" -ne 1 ]]; then
  echo "Target service failed health checks; keeping current live color unchanged"
  docker_compose logs --tail=200 "${target_service}" || true
  exit 1
fi

echo "Switching Caddy upstream to ${target_color} on port ${target_port}"

# APP_HOST is required and should match the host served by Caddy.
caddy_host="${APP_HOST}"

if [[ -z "${caddy_host}" ]]; then
  echo "Missing Caddy host. Set APP_HOST."
  exit 1
fi

# Use a temp file in the deploy user's home directory
TEMP_UPSTREAM_FILE="${HOME}/.tmp-${DEPLOY_APP_NAME}-upstream.conf"

# Always write the upstream file from a template.
cat > "${TEMP_UPSTREAM_FILE}" <<EOF
${caddy_host} {

    reverse_proxy 127.0.0.1:${target_port}

    encode gzip

    header {
        Strict-Transport-Security "max-age=31536000;"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    log {
        output file /var/log/caddy/huerray-api.log
        format json
    }
}
EOF

if [[ -w "${CADDY_UPSTREAM_FILE}" ]] || [[ ! -e "${CADDY_UPSTREAM_FILE}" && -w "$(dirname "${CADDY_UPSTREAM_FILE}")" ]]; then
  sudo mv "${TEMP_UPSTREAM_FILE}" "${CADDY_UPSTREAM_FILE}"
else
  echo "Cannot write Caddy upstream file ${CADDY_UPSTREAM_FILE}; no permission and sudo is unavailable"
  rm -f "${TEMP_UPSTREAM_FILE}"
  exit 1
fi

# shellcheck disable=SC2086
eval "${CADDY_RELOAD_CMD}"

echo "${target_color}" > "${ACTIVE_COLOR_FILE}"

if [[ -n "${old_color}" ]]; then
  old_service="app_${old_color}"
  echo "Draining old service ${old_service} for ${DRAIN_SECONDS}s"
  sleep "${DRAIN_SECONDS}"
  docker_compose stop "${old_service}" || true
fi

echo "Blue/green deployment completed. Active color: ${target_color}"
