# Timezones App

## Client
- To start the client all you need is inside `client` folder run:
```bash
- npm install #This will install dependencies
- npm start
```
The server will run at `http://localhost:3000/`

## Import timezones
Timezones can be imported from the API and persisted in Mongo.
To do that, open the `server_app` container and run
```bash
 node migrations/timezone-import.js
 ```
 This will fetch each timezone and persist it on the database database.

 For time saving, migrations can be stopped any time and the database will have the timezones that were able to finalize persistance.
## Server
The server runs with docker compose. So in order to run it you need to have it installed on your computer. [Instructions here](https://docs.docker.com/compose/install/)

To run the build and run containers just type inside `server`

```bash
docker-compose up
```

## Data fetching
Information can be fetched from both database and external API. 
If you want to switch between those sources all you have to do is change this variable from the `server/.env`
```bash
# NODE_APP_FETCH_MODE=server
NODE_APP_FETCH_MODE=db
```
