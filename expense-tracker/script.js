let balanceEl = document.getElementById('balance');
let transactionList = document.getElementById('transactionList');
let addBtn = document.getElementById('addBtn');

let transactions = [];

function updateBalance() {
    let balance = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
    balanceEl.textContent = '$' + balance;
}

function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((t, index) => {
        let li = document.createElement('li');
        li.className = t.type;
        li.innerHTML = `
            <span>${t.text} - $${t.amount}</span>
            <button onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionList.appendChild(li);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    renderTransactions();
    updateBalance();
}

addBtn.addEventListener('click', () => {
    let text = document.getElementById('text').value;
    let amount = parseFloat(document.getElementById('amount').value);
    let type = document.getElementById('type').value;

    if(text === '' || isNaN(amount) || amount <= 0){
        alert('Please enter valid description and amount.');
        return;
    }

    transactions.push({ text, amount, type });
    renderTransactions();
    updateBalance();

    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
});
