import {factory, e, getId, setData, records, deleteRec, hydrate }  from '/utilities.js';

const form = document.getElementById('new-expense');

let editMode = false;
let currentId = null;

const saveBtn = document.getElementsByClassName('action')[0];
document.getElementsByClassName('action')[1].addEventListener('click', (event) => {
    editMode = false;
    currentId = null;
})

saveBtn.addEventListener('click', collectingInfo);

function collectingInfo(event) {
    event.preventDefault();
    const items = {};
    const list = document.getElementsByClassName('row-label');
    const arr = [...list];
    let rowElement = '';
    

    arr.forEach(el => {
        if (el.children[0].tagName === 'INPUT') {
            if (el.children[0].value !== '') {
                items[el.children[0].name] = el.children[0].value;

            }
        } else {
            let categories = form.querySelector('[name="category"]');
            let index = categories.value;
            items[categories.name] = categories[index].textContent;
        }
    })

    const id = editMode ? currentId : getId();

    if (Object.keys(items).length === 4) {
        let record = {
            id,
            ...items
        }

        records.set(record.id, record);
        rowElement = factory(items, record.id);

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
    form.reset()
}


const bodyElement = document.getElementsByTagName('tbody')[0];
bodyElement.addEventListener('click', onEditClick);

hydrate(bodyElement);


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
    let categories = form.querySelector('[name="category"]');
    let index = categories.value;
    
    form.querySelector('[name="date"]').value = record.date;
    form.querySelector('[name="name"]').value = record.name;
    categories[index].textContent = record.category;
    form.querySelector('[name="amount"]').value = record.amount;
    
    editMode = true;
    currentId = row.id;
}












