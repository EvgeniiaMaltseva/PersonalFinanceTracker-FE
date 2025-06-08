import React, { useState } from 'react';
import { addTransaction } from '../services/api';

function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    type: 'Income',
    category: '',
    description: '',
    amount: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      onAdd(response.data);
      setFormData({ type: 'Income', category: '', description: '', amount: '' });
    } catch (err) {
      console.error('Failed to add transaction', err);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount €</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;