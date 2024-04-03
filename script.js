// script.js
document.getElementById('loveForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var yourName = document.getElementById('yourName').value;
    var crushName = document.getElementById('crushName').value;

    // Validate input
    if (yourName.trim() === '' || crushName.trim() === '') {
        alert('Please enter both your name and your crush\'s name.');
        return;
    }

    // Prepare data
    var data = {
        yourName: yourName,
        crushName: crushName
    };

    // Send data to server
    fetch('/save-names', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Handle successful response
        console.log('Data saved successfully:', data);
        // You can display a success message or redirect the user
    })
    .catch(error => {
        // Handle errors
        console.error('Error saving data:', error);
        // You can display an error message to the user
    });

    // Calculate love percentage (just a random number for demonstration)
    var lovePercentage = Math.floor(Math.random() * 101);

    // Display result
    document.getElementById('lovePercentage').innerText = 'There is a ' + lovePercentage + '% chance of love between ' + yourName + ' and ' + crushName + '.';
    document.getElementById('result').style.display = 'block';
});
