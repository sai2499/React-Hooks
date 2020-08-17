import React, { useReducer, useState, useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should nto get there!');
  }
}

const httpReducer = (currHttpState, action) => {
  switch(action.type) {
    case 'SEND':
      return {loading: true, error: null}
    case 'RESPONSE':
      return {...currHttpState,loading: false}
    case 'ERROR':
      return {loading: false, error: action.errorData};
    case 'CLEAR':
      return {...currHttpState,error: null};
    default: 
      throw new Error('Should not be reached!');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  //const [userIngredients, setUserIngredients] = useState([]);
  const [httpState, dispatchHttp]= useReducer(httpReducer,{loading: false,error: null})
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   fetch('url/ingredients.json').then(
  //     response => response.json()).then(
  //       responseData => {
  //         const loadedIngredients = [];
  //         for (const key in responseData) {
  //           loadedIngredients.push({
  //             id: key,
  //             title: responseData[key].title,
  //             amount: responseData[key].amount
  //           });
  //         }
  //         setUserIngredients(loadedIngredients);
  //       });
  // }, []);


  const filteredIngredientsHandler = useCallBack(filteredIngredients => {
    //setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, [])

  const addIngredientHandler = ingredient => {
    dispatchHttp({type: 'SEND'})
    fetch('url/ingredient.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'})
      return response.json()
    }).then(response => {
      // setUserIngredients(prevIngredients =>
      //   [...prevIngredients, { id: response.name, ...ingredient }
      //   ])
      dispatch({ type: 'ADD', ingredient: { id: response.name, ...ingredient } });
    }
    );
  };
  const removeIngredientHandler = ingredientId => {
    //setIsLoading(true);
    dispatchHttp({type: 'SEND'})
    fetch('url/ingredient/${ingredientId}.json', {
      method: 'DELETE'
    }).then(response => {
      //setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'})
      // setUserIngredients(prevIngredients => 
      // prevIngredients.filter(ingredient => ingredient.id !== ingredientId))}
      dispatch({ type: 'DELETE', id: ingredientId })
    })
      .catch(error => {
        dispatchHttp({type: 'ERROR',errorData: 'Something went wrong!'})
      });
  }

  const clearError = () => {
    dispatchHttp({type: 'CLEAR'});
  }

  return (
    <div className="App">
      {httpState.error ? <ErrorModal onClose={clearError}>{httpStateerror}</ErrorModal> : null}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
