import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencyChange = () => {
  // Consume dispatch and currency state form AppContext
  const { dispatch, currency } = useContext(AppContext);

  const handleCurrency = (e) => {
    const newCurrencyValue = e.target.value;
    dispatch({ type: 'CHG_CURRENCY', payload: newCurrencyValue });
    console.log(newCurrencyValue);
  };

  return (
    <>
      <div className='currency-change'>
        <h5 className='alert alert-warning'>Currency Change</h5>
        <div>Choose your currency here:</div>
        <select
          onChange={handleCurrency}
          name='curency'
          id='currency'
          value={currency}
        >
          <option value='￡'>￡ Pound</option>
          <option value='₹'>₹ Ruppee</option>
          <option value='€'>€ Euro</option>
          <option value='$'>$ Dollar</option>
        </select>
      </div>
    </>
  );
};

export default CurrencyChange;
