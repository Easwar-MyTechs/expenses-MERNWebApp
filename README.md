# expenses-MERNWebApp
Expense MERNWebApp
Setup on Local Environment
Clone the repository. HTTPS: git clone https://github.com/Easwar-MyTechs/expenses-MERNWebApp.git

cd expenses-MERNWebApp

Install node modules Node API: 
cd expenses_men_rest_api
npm install

npm run start

Go to localhost:3001/expenses

Install node modules React App: 
cd react_expenses_spa_webapp
npm install

npm run start

Go to localhost:3000/expenses

Optional
Create Mongo DB expenses_mernapp:

$ use expenses_mernapp
$ db.createCollection('expenses')
