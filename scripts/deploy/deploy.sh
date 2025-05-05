#!/bin/bash
set -e

PROJECT_DIR_PATH=$1
ENV=$2
DEPLOY_DIR_PATH=$PROJECT_DIR_PATH/scripts/deploy

# Load deployment configuration
source "${DEPLOY_DIR_PATH}/deploy.conf"

# Determine environment settings
if [[ "$ENV" == "staging" ]]; then
  ENV_FILE=$ENV_FILE_STAGING
  STAGE="staging"
  DOMAIN=$DOMAIN_STAGING
elif [[ "$ENV" == "production" ]]; then
  ENV_FILE=$ENV_FILE_PRODUCTION
  STAGE="production"
  DOMAIN=$DOMAIN_PRODUCTION
else
  echo "❌ Unknown environment: $ENV"
  exit 1
fi

ENV_FILE_PATH=$PROJECT_DIR_PATH/$ENV_FILE

echo "Deploying to $STAGE"

echo "1️⃣Stopping and removing containers and network"
STAGE=$STAGE docker compose --env-file $ENV_FILE_PATH down
echo "2️⃣Remove all stopped containers"
docker container prune -f
echo "3️⃣Remove all unused images"
docker image prune -af

echo "4️⃣Starting new containers"
STAGE=$STAGE docker compose --env-file $ENV_FILE_PATH up -d --build 2>&1 | tee deploy.log


echo "5️⃣Save deployment log with timestamp"
mkdir -p "$DEPLOY_DIR_PATH/logs"
DATE=$(date '+%Y-%m-%d_%H-%M')
mv deploy.log "$DEPLOY_DIR_PATH/logs/deploy_${STAGE}_${DATE}.log"
echo "📦 Log saved as deploy_${STAGE}_${DATE}.log"

sleep 30

echo "6️⃣Checking if the app is live at https://$DOMAIN/api/health"
if curl -fsL "https://$DOMAIN/api/health" > /dev/null; then
  echo "✅ Health check passed"

  # Notify success via Telegram
  curl -s -X POST https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage \
    -d chat_id=$TELEGRAM_CHAT_ID \
    -d text="✅ Deploy *$PROJECT_NAME $STAGE* successful: https://$DOMAIN" \
    -d parse_mode=Markdown
else
  echo "❌ Health check failed"

  # Notify failure via Telegram
  curl -s -X POST https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage \
    -d chat_id=$TELEGRAM_CHAT_ID \
    -d text="🚨 Deploy *$PROJECT_NAME $STAGE* completed, but the site is not responding: https://$DOMAIN" \
    -d parse_mode=Markdown
    exit 1
fi

echo "✅ Deployment script completed for $STAGE"