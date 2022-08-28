// const { response } = require("express");

const updateBtn = document.querySelector('#updateBtn');
const deleteButton = document.querySelector('#deleteBtn');
const messageDiv = document.querySelector('#message');

updateBtn.addEventListener('click', function () {
    fetch('/quotes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'informa',
            quote: 'I find your lack of faith disturbing',
        })
    })
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(response => {
            window.location.reload(true)
        });
});

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'informa'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No quote to delete') {
                messageDiv.textContent = 'No Darth Vadar quote to delete'
            } else {
                window.location.reload(true)
            }
        })
        .catch(console.error)
})