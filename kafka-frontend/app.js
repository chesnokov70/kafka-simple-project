const form = document.getElementById('messageForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/produce', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        console.error(error);
        alert('Error sending message.');
    }
});
