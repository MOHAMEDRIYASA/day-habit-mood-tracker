// Load saved data
let habits = JSON.parse(localStorage.getItem("habits")) || {};
let mood = localStorage.getItem("mood") || "";

// Update UI on page load
updateUI();

// Set mood
function setMood(selectedMood) {
    mood = selectedMood;
    localStorage.setItem("mood", mood);
    updateUI();
}

// Toggle habit completion
function toggleHabit(habitName) {
    habits[habitName] = !habits[habitName];
    localStorage.setItem("habits", JSON.stringify(habits));
    updateUI();
}

// Update summary UI
function updateUI() {
    const moodText = document.getElementById("currentMood");
    if (moodText) {
        moodText.innerText = mood ? "Today's Mood: " + mood : "";
    }

    const summary = document.getElementById("summary");
    if (!summary) return;

    summary.innerHTML = "";
    for (let habit in habits) {
        const li = document.createElement("li");
        li.textContent = `${habits[habit] ? "✅" : "❌"} ${habit}`;
        summary.appendChild(li);
    }
}

// Reset daily data
function resetDay() {
    if (confirm("Reset today's data?")) {
        localStorage.removeItem("habits");
        localStorage.removeItem("mood");
        habits = {};
        mood = "";
        updateUI();
    }
}
