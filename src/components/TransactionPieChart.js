import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const TransactionPieChart = ({ transactions }) => {
  const income = transactions
    .filter(tx => tx.type === 'Income')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const expenses = transactions
    .filter(tx => tx.type === 'Expense')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const data = [
    { name: 'Income', value: income, color: '#28a745' }, 
    { name: 'Expenses', value: expenses, color: '#dc3545' }, 
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label={({ value }) => `€${value.toFixed(2)}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
      <Legend />
    </PieChart>
  );
};

export default TransactionPieChart;