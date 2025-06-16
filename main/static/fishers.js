function submitted() {
    const urlInput = document.querySelector('#url-input');
    const url = urlInput.value.trim(); // Trim removes spaces
    const loadingSpinner = document.getElementById('loading-spinner');
    const resultMessage = document.getElementById('result-message');
    const resultMessage2 = document.getElementById('result-message2');

    // Reset visibility
    resultMessage.classList.add("hidden");
    resultMessage2.classList.add("hidden");

    // ✅ Check if the input is empty
    if (!url) {
        resultMessage.innerText = "⚠️ Please paste a URL before submitting.";
        resultMessage.style.color = "#000000"; 
        resultMessage.classList.remove("hidden");
        return; 
    }

    loadingSpinner.style.display = 'block';

    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        loadingSpinner.style.display = 'none';

        if (data.predictions[0] === 1) {
            resultMessage.innerText = "✔️ Safe Browsing Verified! This Website Is Secure";
            resultMessage.style.color = "green";
            resultMessage.classList.remove("hidden");
        } else {
            resultMessage2.innerText = "❌ Caution! Suspicious website detected";
            resultMessage2.style.color = "red";
            resultMessage2.classList.remove("hidden");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none';
    });
}
