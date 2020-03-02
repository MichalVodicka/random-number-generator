Random Number Generator
====
The project is separated into two nodejs apps(backend -> folder be and frontend -> folder fe)

How to install
---
in the root folder run a command 

`npm install`

The command install concurrently BE and FE in subfolders. 

How to config (for development purpose)
---
in each folder (be and fe) is `.env` file in which you can configure ports. In the production environment the application should be configured by environment variables.

How to start
---
in the root folder run a command 

`npm run start`


How to test
--
test scripts are seperated for FE and BE. You have to run test in each folder e.g.

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
