import React from 'react';

function Counter({
  number,
  onIncrease,
  onDecrease,
  onIncreaseAsync,
  onDecreaseAsync,
}) {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
      <div>
        <button onClick={onIncreaseAsync}>+1</button>
        <button onClick={onDecreaseAsync}>-1</button>
      </div>
    </div>
  );
}

export default Counter;
