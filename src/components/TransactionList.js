import React from 'react';
import { deleteTransaction } from '../services/api';

function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      onDelete(id);
    } catch (err) {
      console.error('Failed to delete transaction', err);
    }
  };

  return (
    <div className="card p-3">
      <h3>Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount €</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.type}</td>
                <td>{t.category}</td>
                <td>{t.description}</td>
                <td>€{t.amount.toFixed(2)}</td>
                <td>{new Date(t.date).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;