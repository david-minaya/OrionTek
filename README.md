# OrionTek

## Pre-requisites

- Node v20
- MySQL

## Getting started

1. install the dependencies. 
    - Go to the `/api` dir and run `npm install`.
    - Got to the `/app` dir and run `npm install`.
      
2. Open the `./api/.env` file and update the database env vars with your owns, ex:
   ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=oriontek
    DB_USER=root
    DB_PASS=root
   ```

2. Run the project
   - Go to the `/api` dir and run `npm run dev`.
   - Go to the `/app` dir and run `npm run dev`.
   - Open `http://localhost:5173` in the browser.
