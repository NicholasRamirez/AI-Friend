// Add click event listener to the "Next" button
document.getElementById("nextButton").addEventListener("click", goToNextPage);

// Function to navigate to the next page
function goToNextPage() {
   // Retrieve the value entered in the name input field
    var name = document.getElementById("nameInput").value;
    
    // Save the name to localStorage with the key "ai_name"
    localStorage.setItem("ai_name", name);

    // Redirect the user to the "personality.html" page
    window.location.href = "personality.html"; 
}
