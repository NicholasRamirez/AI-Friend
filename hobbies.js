// Add click event listener to the "Next" button
document.getElementById("nextButton").addEventListener("click", function() {
    saveHobbies();
    goToNextPage();
});

// Function to save the selected hobbies into localStorage
function saveHobbies() {
    var selectedHobby = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedHobby.push(checkbox.id);
        }
    });
    localStorage.setItem('selectedHobbies', JSON.stringify(selectedHobby));
}

// Function to navigate to the next page
function goToNextPage() {
    window.location.href = "chatbot.html";
}
