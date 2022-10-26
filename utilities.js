export const form = document.getElementById('new-expense');

export function factory(list, id) {
    
    const row = e('tr');

    for (const key in list) {
        if (key === 'id') {
            continue;
        }
        const td = e('td');

        if (key === 'amount') {
            const span = e('span');
            span.className = 'currency';
            span.textContent = list[key];
            td.appendChild(span);
            
        } else if (key === 'date') {
            td.textContent = newDate(list[key]);

        } else {
            td.textContent = list[key];

        }
        row.appendChild(td);
    }
    row.id = id;
    buttons(row);

    return row;
    
}

export function e(type) {
    const result = document.createElement(type);

    return result;
    
}

export function buttons(parent) {
    const td = e('td');
    const edit = e('button');
    const del = e('button');

    edit.textContent = 'Edit';
    edit.className = 'editBtn';
    del.textContent = 'Delete';
    del.className = 'deleteBtn';

    td.appendChild(edit);
    td.appendChild(del);
    parent.appendChild(td);  
}

export function newDate(date) {
    const parsedDate = new Date(date);
    const stringDate = `${parsedDate.getDate()}.${monthName[parsedDate.getMonth()]}`;

    return stringDate;
}

export const monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export function getId() {
    return ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
}

export function setData(data) {
    const values = [...data.values()];
    localStorage.setItem('records', JSON.stringify(values));

}

export function getData() {
    const values = JSON.parse(localStorage.getItem('records'));
    return new Map(values.map(e => [e.id, e]));
}

export function onEditClick(event) {
    if (event.target.tagName === 'BUTTON') {
        const row = event.target.parentElement.parentElement;

        if (event.target.classList.contains('editBtn')) {
            editRow(row);
        } else if (event.target.classList.contains('deleteBtn')) {
            deleteRec(row)
        }
    }
}

export function deleteRec(row) {
    if (confirm('Confirm deleting this?')) {
        row.remove();
        console.log(records.delete(1));
        //records.delete(row);
        setData(records)

    }
}

export const records = getData();

export function hydrate(bodyElement) {
    bodyElement.replaceChildren(...[...records.values()].map(factory));
 }



