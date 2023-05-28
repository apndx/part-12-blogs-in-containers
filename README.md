# part-12-blogs-in-containers

## Development environment

First build projects in their own folders, then run compose in the root. The project is run in http://localhost:3000
### Building projects

  dockercd blogs-back
  build -f ./blogs-back/dev.Dockerfile -t blogs-back-dev .
  cd blogs-front
  docker build -f ./blogs-front/dev.Dockerfile -t blogs-front-dev .

### Composing

  docker compose -f docker-compose.dev.yml up


### Clean-up

  docker compose -f docker-compose.dev.yml down --volumes
## Production environment

First build the frontend
  cd blogs-front
  npm run build 

The build folder from frontend is copied to the backend, and served from there, and can be opened in the browser: http://localhost:9001


### Building projects
  cd blogs-back
  docker build -f ./Dockerfile -t blogs-back-prod .

  cd blogs-front
  docker build -f ./Dockerfile -t blogs-front-prod .

### Composing

  docker compose -f docker-compose.yml up


### Clean-up

  docker compose -f docker-compose.yml down --volumes
