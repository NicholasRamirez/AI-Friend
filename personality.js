// Add click event listener to the "Next" button
document.getElementById("nextButton").addEventListener("click", function() {
    savePersonality();
    goToNextPage();
});

// Function to save the selected personality traits into localStorage
function savePersonality() {
    var selectedTraits = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedTraits.push(checkbox.id);
        }
    });
    localStorage.setItem('selectedPersonality', JSON.stringify(selectedTraits));
}

// Function to navigate to the next page
function goToNextPage() {
    window.location.href = "hobbies.html";
}
