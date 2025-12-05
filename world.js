document.addEventListener('DOMContentLoaded', function() {
    const lookupButton = document.getElementById('lookup');
    const countryInput = document.getElementById('country');
    const resultDiv = document.getElementById('result');

    lookupButton.addEventListener('click', function() {
        const country = countryInput.value.trim();

        // Build the URL with query parameter
        const url = `world.php?country=${encodeURIComponent(country)}`;

        // Make AJAX request using fetch
        fetch(url)
            .then(response => response.text())
            .then(data => {
                resultDiv.innerHTML = data;
            })
            .catch(error => {
                resultDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
                console.error('Error:', error);
            });
    });
});