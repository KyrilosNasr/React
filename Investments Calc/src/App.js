import { useState } from 'react';
import Header from './components/Header/Header';
import InvestmentsForm from './components/InvestmentsForm/InvestmentsForm';
import InvestmentsTable from './components/InvestmentsTable/InvestmentsTable';
function App() {
 const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    
    setUserInput(userInput)
  };

  const yearlyData = [];
  if (userInput) {
    
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  
  return (
    <div>
      <Header />
      {/* investments form Comp */}
      <InvestmentsForm onCalc={calculateHandler} />

      {!userInput && <p style={{textAlign:'center'}}>No Investments Calculated yet!</p>}
      {userInput && <InvestmentsTable data={yearlyData} intialInvestment={userInput['current-savings']} />}
    </div>
  );
}

export default App;
