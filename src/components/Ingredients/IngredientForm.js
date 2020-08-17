import React,{ useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // const [inputState, setInputState] = useState({
  //   title: '',
  //   amount: ''
  // });
  const [enteredTitle, setEnterTitle] =useState('');
  const [enteredAmount, setEnterAmount] =useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: enteredTitle, amount: enteredAmount});
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" 
              // value={inputState[0].title}
              // onChange={event => {
              //   const newTitle = event.target.value
              //   setInputState((prevInputState)=>({
              //     title: newTitle,
              //     amount: prevInputState.amount}))}}
              value={enteredTitle}
              onChange={event => {
                setEnterTitle(event.target.value)
              }}/>
          </div>
          <div className="form-control"> 
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" 
              // value={inputState[0].amount}
              // onChange={event => { 
              //   const newAmount = event.target.value 
              //   setInputState((prevInputState)=>({
              //     amount: newAmount,
              //     title: prevInputState.title}))}}
              value={enteredAmount}
              onChange={event => {
                setEnterAmount(event.target.value)
              }}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator />: null} 
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
