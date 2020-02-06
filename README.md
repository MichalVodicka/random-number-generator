Random Number Generator
====
The project is separated into two nodejs apps(backend -> folder be and frontend -> folder fe)

How to install
---
in root folder run command 

`npm install`

The command install concurrently into root folder as helper for running BE and FE in one command. And install node modules for BE and FE

How to config (for development)
---
in each folder (be and fe) is `.env` file where configuration (ports) is. In production the app is configured through environment variables

How to start
---
in root folder run command 

`npm run start`


How to test
--
to run test you have to run them in each folder e.g.

__backend - unit test__

`cd be`

`npm run test`

__frontend - unit test__

`cd fe `

`npm run test`

__test backend is running__

`curl -d '{"min": "1", "max": "100"}' -H "Content-Type: application/json" -X POST localhost:3001/api/generator/`

or

open in browser URL `http://localhost:3001/api/generator/heltz`


*port/domain may differ
