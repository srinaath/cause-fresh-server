set -o allexport
source .env.prod
set +o allexport
docker-compose down
