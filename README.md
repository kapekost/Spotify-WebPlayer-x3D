# React-REST-Auth - in Docker with NodeJS service

A template project to start a fast PoC

- easy to add modules to the current service, and support versioning
- client ready to support navigation menu, split context for each page in React

[in progress]

React Authentication, middleware, hooks, navigation and async REST requests

There is a basic setup for 2 projects,

- ReactJS app
- NodeJS server

Each project has a Dockerfile to start in development mode hooking to your local files for live editing and refresh
A main docker-compose file starts both, and a production version that copies the react built project under the /public serve directory of the server

## Development

```
docker-compose up
```

- node server on http://localhost:8080
- react development server on http://localhost:3000/public

## Production build

### with Docker

```
docker-compose -f docker-compose.production.yml up
```

- node server on http://localhost:8080

### alternatively, `without Docker`, you can start the projects within their directory with common node / yarn

in each project

```
yarn install
yarn start
```

- navigate with the browser to http://localhost:8080/public/index.html
