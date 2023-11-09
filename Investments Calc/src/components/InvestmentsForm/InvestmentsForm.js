import { useState } from 'react';
import formStyle from './InvestmentsForm.module.css';

const intialValues = {
  'current-savings': 10000,
    'yearly-contribution': 1200,
    'expected-return': 7,
    'duration': 10
}

const InvestmentsForm = (props) => {
  const [userInput, setUserInput] = useState(intialValues);
  
  
  const submitHandler = (event) => {
    event.preventDefault();
    props.onCalc(userInput);
  }

  const resetHandler = () => {
    setUserInput(intialValues)
  }

  const inputChangeHandler = (input, value) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input] : +value
      }
    });
  }
  return (
    <form className={formStyle.form} onSubmit={submitHandler}>
      <div className={`${formStyle['input-group']}`}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            value={userInput['current-savings']}
            onChange={(event) => inputChangeHandler('current-savings', event.target.value)}
            type="number" id="current-savings" />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            value={userInput['yearly-contribution']}
            onChange={(event) => inputChangeHandler('yearly-contribution', event.target.value)}
            type="number" id="yearly-contribution" />
        </p>
      </div>
      <div className={`${formStyle['input-group']}`}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            value={userInput['expected-return']}
            onChange={(event) => inputChangeHandler('expected-returns', event.target.value)}
            type="number" id="expected-returns" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            value={userInput['duration']}
            onChange={(event) => inputChangeHandler('duration', event.target.value)}
            type="number" id="duration" />
        </p>
      </div>
      <p className={formStyle.actions}>
        <button onClick={resetHandler} type="reset" className={formStyle.buttonAlt}>
          Reset
        </button>
        <button type="submit" className={formStyle.button}>
          Calculate
        </button>
      </p>
    </form>
  )
}
export default InvestmentsForm;