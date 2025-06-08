import React from 'react';

function RecentTransactions({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return <p>No recent transactions.</p>;
    }

    return (
        <div>
            <ul className="list-group">
                {transactions.map(transaction => (
                    <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{transaction.description}</span>
                        <span className={transaction.type === 'Income' ? 'text-success' : 'text-danger'}>
                            €{transaction.amount.toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentTransactions; 