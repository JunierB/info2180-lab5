// Wait for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function () {
    // Get references to the buttons and result div
    const lookupButton = document.getElementById('lookup');
    const lookupCitiesButton = document.getElementById('lookup-cities');
    const resultDiv = document.getElementById('result');
    const countryInput = document.getElementById('country');

    // Function to perform lookup with specified type
    function performLookup(lookupType) {
        // Get the country value from the input field
        const country = countryInput.value.trim();

        // Create the URL with the country parameter and optional lookup parameter
        let url = `world.php?country=${encodeURIComponent(country)}`;
        if (lookupType) {
            url += `&lookup=${encodeURIComponent(lookupType)}`;
        }

        // Make an AJAX request using fetch
        fetch(url)
            .then(response => {
                // Check if the response is OK
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Display the data in the result div
                resultDiv.innerHTML = data;
            })
            .catch(error => {
                // Handle any errors
                console.error('Error fetching data:', error);
                resultDiv.innerHTML = '<p style="color: red;">Error loading data. Please try again.</p>';
            });
    }

    // Add click event listener to the lookup country button
    lookupButton.addEventListener('click', function () {
        performLookup(); // No lookup parameter for countries
    });

    // Add click event listener to the lookup cities button
    lookupCitiesButton.addEventListener('click', function () {
        performLookup('cities'); // Pass 'cities' as the lookup parameter
    });

    // Optional: Allow pressing Enter in the input field to trigger country lookup
    countryInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            lookupButton.click();
        }
    });
});

