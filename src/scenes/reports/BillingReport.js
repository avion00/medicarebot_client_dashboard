import React from 'react';
import data from './data.json';

const BillingReport = () => {
  const { billingData } = data; // Use destructuring to extract billingData

  return (
    <div style={{
      margin: '1em',
      padding: '1em',
      borderRadius: '.5em',
      boxShadow: '2px 2px 50px 2px rgb(125, 125, 125, 0.2)',
      flexGrow: '1',
      minWidth: '320px',
      maxHeight: '500px',
      overflowY: 'auto'
    }}>
      <h2 style={{
        padding: '0 .5em',
        fontSize: '1em',
        margin: '1em 0',
        fontFamily: 'Inter, sans-serif',
      }}>Billing Report</h2>
      <ul style={{
        padding: '0 1em',
        fontFamily: 'Inter, sans-serif',
        fontSize: '.9em'
      }}>
        {billingData.map(({ date, amount }, index) => (
          <li key={index} style={{
            padding: ' 0.4em 0.75em',
            borderBottom: '1px solid rgb(110, 200, 150, .5)',
          }}>
            Date: {date}, Amount: ${amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillingReport;
