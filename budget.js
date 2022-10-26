import { setData, e, buttons, getId, newDate, records, deleteRec} from '/utilities.js';

const form = document.getElementById('new-budget');
const bodyElement = document.getElementsByTagName('tbody')[0];
bodyElement.addEventListener('click', onEditClick);

document.getElementsByClassName('action')[1].addEventListener('click', (event) => {
    editMode = false;
    currentId = null;
})

let editMode = false;
let currentId = null;

form.addEventListener('submit', collectInfo);

function collectInfo(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const id = editMode ? currentId : getId();

    if (Object.values(data).every(el => el) === true) {
        let record = {
            id,
            ...data
        }

        records.set(record.id, record);
        let rowElement = factory(data, record.id);

        if (editMode) {
            const oldRow = document.getElementById(id);
            bodyElement.replaceChild(rowElement, oldRow);
            editMode = false;
            currentId = null;

        } else {
            bodyElement.appendChild(rowElement);
            setData(records);
        }
    }   
    form.reset();
}

function factory(list, id) {
    const row = e('tr');

    for (const key in list) {
        if (key === 'id') {
            continue;
        }
        const td = e('td');

        if (key === 'income' || key === 'budget') {
            const span = e('span');
            span.className = 'currency';
            span.textContent = list[key];
            td.appendChild(span);
            
        } else if (key === 'month') {
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

hydrate(bodyElement)


function onEditClick(event) {
    if (event.target.tagName === 'BUTTON') {
        const row = event.target.parentElement.parentElement;

        if (event.target.classList.contains('editBtn')) {
            editRow(row);
        } else if (event.target.classList.contains('deleteBtn')) {
            deleteRec(row)
        }
    }
}


function editRow(row) {
    const record = records.get(row.id);

    form.querySelector('[name="month"]').value = record.month;
    form.querySelector('[name="income"]').value = record.income;
    form.querySelector('[name="budget"]').value = record.budget;
    
    editMode = true;
    currentId = row.id;
}

function hydrate(bodyElement) {
    bodyElement.replaceChildren(...[...records.values()].map(factory));
 }

