Images
Build an image

Backend:

docker build -t fortune-backend ./backend

Frontend:

docker build -t fortune-frontend ./frontend

Meaning:

-t                 => image tag/name
fortune-backend    => image name
./backend          => build context
List images
docker images

or

docker image ls

Example:

REPOSITORY         TAG       IMAGE ID
fortune-backend    latest    a8203e054406
fortune-frontend   latest    b1234abcd567
Remove image
docker rmi fortune-backend

or

docker image rm fortune-backend
Containers
Start a container

Backend:

docker run -d \
  --name backend \
  -p 8000:8000 \
  fortune-backend

Frontend:

docker run -d \
  --name frontend \
  -p 3000:80 \
  fortune-frontend

Meaning:

-d            => detached mode
--name        => container name
-p            => port mapping
List running containers
docker ps

Example:

CONTAINER ID   IMAGE
123abc         fortune-backend
456def         fortune-frontend
List all containers

Including stopped containers:

docker ps -a
Stop container
docker stop backend
Start stopped container
docker start backend
Restart container
docker restart backend
Remove container
docker rm backend

Container must be stopped first.

Force remove:

docker rm -f backend
Logs
View logs
docker logs backend
Stream logs

Equivalent of tail -f:

docker logs -f backend
Last 50 lines
docker logs --tail 50 backend
Execute Commands Inside Container
Open shell
docker exec -it backend bash

If bash doesn't exist:

docker exec -it backend sh
Run one command
docker exec backend ls
See environment variables
docker exec backend env
Networking
Test app directly

Backend:

curl http://localhost:8000/fortune

Frontend:

curl http://localhost:3000
See exposed ports
docker ps

Example:

0.0.0.0:8000->8000/tcp
0.0.0.0:3000->80/tcp

Meaning:

Host 8000 → Container 8000
Host 3000 → Container 80
Cleanup
Stop all running containers
docker stop $(docker ps -q)

Remove all stopped containers
docker container prune

Remove unused images
docker image prune

Remove everything unused
docker system prune

Interactive confirmation appears.

Docker Compose (Next Step)
Start all services
docker compose up -d

View services
docker compose ps

View logs
docker compose logs

Follow logs
docker compose logs -f

Stop everything
docker compose down

Rebuild and start
docker compose up --build -d

Commands We Actually Used in This Project
These are the core commands you've already used:

docker --version
docker run hello-world
docker build -t fortune-backend ./backend
docker build -t fortune-frontend ./frontend
docker images
docker run -d --name backend -p 8000:8000 fortune-backend
docker run -d --name frontend -p 3000:80 fortune-frontend
docker ps
docker logs backend
docker stop backend
docker rm backend