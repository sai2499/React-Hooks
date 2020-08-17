import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef()

  useEffect(() => {
    const timer= setTimeout(() => {
      if (entertedFilter === inputRef.current.value) {
        const queryParams = enteredFilter.length === 0 ? '' : `?orderby="title"equalTo="${enteredFilter}"`;
        fetch('url/ingredients.json' + queryParams).then(
          response => response.json()).then(
            responseData => {
              const loadedIngredients = [];
              for (const key in responseData) {
                loadedIngredients.push({
                  id: key,
                  title: responseData[key].title,
                  amount: responseData[key].amount
                });
              }
              onLoadIngredients(loadedIngredients)
            });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients,inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
