document.addEventListener('DOMContentLoaded', () => {
    const clock = document.getElementById('clock');
    const invoiceForm = document.getElementById('invoiceForm');
    const itemName = document.getElementById('itemName');
    const itemType = document.getElementById('itemType');
    const itemQuantity = document.getElementById('itemQuantity');
    const itemPrice = document.getElementById('itemPrice');
    const addItem = document.getElementById('addItem');
    const totalSpan = document.getElementById('total');
    const invoiceTable = document.getElementById('invoiceTable').querySelector('tbody');
    const printInvoice = document.getElementById('printInvoice');

    let total = 0;

    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const day = now.toLocaleDateString('ar-EG', { weekday: 'long' });
        const date = now.toLocaleDateString('ar-EG');
        clock.textContent = `${hours}:${minutes}:${seconds} ${ampm} - ${day}, ${date}`;
    }

    setInterval(updateClock, 1000);

    addItem.addEventListener('click', () => {
        const name = itemName.value.trim();
        const type = itemType.value;
        const quantity = parseInt(itemQuantity.value, 10);
        const price = parseFloat(itemPrice.value);
        
        if (name && quantity > 0 && price > 0) {
            const subtotal = quantity * price;
            total += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${type}</td>
                <td>${quantity}</td>
                <td>${price.toFixed(2)}</td>
                <td>${subtotal.toFixed(2)}</td>
            `;
            invoiceTable.appendChild(row);

            totalSpan.textContent = total.toFixed(2);

            itemName.value = '';
            itemQuantity.value = '';
            itemPrice.value = '';
        } else {
            alert('يرجى إدخال بيانات صحيحة');
        }
    });

    printInvoice.addEventListener('click', () => {
        window.print();
    });
});
