window.addEventListener('DOMContentLoaded', function () {
    const lookupButton = document.getElementById('lookup');
    const lookupCitiesButton = document.getElementById('lookup-cities');
    const resultDiv = document.getElementById('result');
    const countryInput = document.getElementById('country');

    function performLookup(lookupType) {
        const country = countryInput.value.trim();
        let url = `world.php?country=${encodeURIComponent(country)}`;
        if (lookupType) {
            url += `&lookup=${encodeURIComponent(lookupType)}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                resultDiv.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultDiv.innerHTML = '<p style="color: red;">Error loading data. Please try again.</p>';
            });
    }
    lookupButton.addEventListener('click', function () {
        performLookup();
    });
    lookupCitiesButton.addEventListener('click', function () {
        performLookup('cities');
    });
    countryInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            lookupButton.click();
        }
    });
});

