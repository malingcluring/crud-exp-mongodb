const { response } = require("express");

const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const messageDiv = document.querySelector('#message');

updateBtn.addEventListener('click', function () {
    fetch('/quotes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'Darth Maul',
            quote: 'I find your lack of faith disturbing',
        })
    })
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(response => {
            window.location.reload(true);
        });
});

deleteBtn.addEventListener('click', function () {
    fetch('/quote', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response=>{
            if(response === 'No quote to delete') {
                messageDiv.textContent = 'No Darth vader quote to delete'
            }
            else {
                window.location.reload(true)
            }
        })
        .then(data => {
            window.location.reload(true)
        })
});