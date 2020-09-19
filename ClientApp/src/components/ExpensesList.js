import React from "react";
import Expense from "./Expense";

const ExpensesList = ({ expenses = [], onRemove }) => {
    return (
        <>
            {expenses.map(ex => (
                <Expense data={ex} onRemove={onRemove} />
            ))}
        </>
    );
};

export default ExpensesList;
