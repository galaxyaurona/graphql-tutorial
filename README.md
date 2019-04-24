# graphql-tutorial
Asset for a tutorial of GraphQL with typescript

## Commands
| Action | Command |
| --- | --- |
| Run application | `docker-compose up -d` |
| Preview logs | `docker-compose logs -f` |
| Stop logs preview | `Ctrl + c` |
| Stop running containers | `docker-compose stop` |
| Stop and/or shut down all the containers | `docker-compose down` |
| Lint | `docker-compose exec server npm run tslint` * |
| Test | `docker-compose exec server npm run test` * |
| Install new package | `docker-compose exec server npm i {name} --save` * |
\* Only when application is running.
