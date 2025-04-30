const buttons = document.querySelectorAll('.btn');
const movementStatus = document.getElementById('movement-status');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const command = button.getAttribute('data-command');
        sendCommand(command);
    });
});

function sendCommand(status) {
    const url = 'http://44.201.251.250:5000/api/devices';

    const data = {
        name: "Larisa Moreno",
        ip: "192.168.1.100",
        status: status
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta de la API:', data);
        movementStatus.textContent = status.replace(/_/g, ' ');
    })
    .catch(error => {
        console.error('Error:', error);
        movementStatus.textContent = 'ERROR';
    });
}
