import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const InputNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !InputNameIsValid && enteredNameTouched;

  const nameInputChaageHandler = (e) => {
    // e.preventDefualt();
    setEnteredName(e.target.value);
  };

  const isInputTouched = () => {
    setEnteredNameTouched(true);
  };

  const formSubmitionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    if (!InputNameIsValid) {
      return
    }
    console.log(enteredName);
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control ";
  return (
    <form onSubmit={formSubmitionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={nameInputChaageHandler}
          value={enteredName}
          type="text"
          id="name"
          onBlur={isInputTouched}/>

        {nameInputIsInvalid && (
          <p className="error-text">the Name Is not Valid and required</p>
        )}

      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
