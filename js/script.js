organizeButton.addEventListener("click", function() {

    const announcement = announcementText.value.trim();

    if (announcement === "") {

        alert("Please enter an academic announcement first.");

        return;

    }

    const preview = document.createElement("div");

    preview.className = "announcement-preview";

    preview.innerHTML = `
        <span>ORGANIZED ANNOUNCEMENT</span>

        <h2>Programming I</h2>

        <h3>Laboratory Examination</h3>

        <p>📅 September 24 · 1:00 PM</p>

        <p>📍 Computer Laboratory</p>

        <h4>COVERAGE</h4>

        <ul>
            <li>Variables</li>
            <li>Data Types</li>
            <li>Conditional Statements</li>
            <li>Loops</li>
        </ul>

        <button class="dashboard-button">
            CONFIRM & PUBLISH
        </button>
    `;

    document.querySelector(".next-event").appendChild(preview);
 
});document.getElementById("publishButton").addEventListener("click", function() {
    localStorage.setItem("arkobombsAnnouncement", announcementText.value);

    alert("Announcement published successfully!");
});
