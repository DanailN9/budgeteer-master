import { e, getData } from '/utilities.js';

const data = getData();

const budgetData = new Map();
const expenseData = new Map();
//console.log(arr)

for (const el of data) {
     if (Object.keys(el[1]).length > 4) {
        expenseData.set(el[0], el[1]);
     } else {
        budgetData.set(el[0], el[1]);
     }
}

console.log(budgetData);
console.log(expenseData)