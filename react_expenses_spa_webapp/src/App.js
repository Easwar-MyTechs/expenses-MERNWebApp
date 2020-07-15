import React from 'react';
import logo from './logo.svg';
import './App.css';
import ExpensesList from './Components/ExpensesList/ExpensesList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />   
        <p>Expenses Single Page Application</p>       
      </header>
      <ExpensesList/>
    </div>
  );
}

export default App;
