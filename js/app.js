// ======================================
// ARKOBOMBS Shared Announcement System
// ======================================

// ---------- PUBLISH ANNOUNCEMENT ----------

function publishAnnouncement(){

    const title = document.getElementById("announceTitle").value;
    const subject = document.getElementById("announceSubject").value;
    const date = document.getElementById("announceDate").value;
    const room = document.getElementById("announceRoom").value;
    const coverage = document.getElementById("announceCoverage").value;
    const details = document.getElementById("announceDetails").value;

    if(title === "" || details === ""){
        alert("Please complete the announcement.");
        return;
    }

    const announcements =
        JSON.parse(localStorage.getItem("arkAnnouncements")) || [];

    announcements.unshift({
        title,
        subject,
        date,
        room,
        coverage,
        details,
        time:new Date().toLocaleString()
    });

    localStorage.setItem(
        "arkAnnouncements",
        JSON.stringify(announcements)
    );

    alert("Announcement Published Successfully!");

    document.getElementById("announcementForm").reset();
}

// ---------- LOAD ANNOUNCEMENTS ----------

function loadAnnouncements(){

    const container =
        document.getElementById("announcementList");

    if(!container) return;

    const announcements =
        JSON.parse(localStorage.getItem("arkAnnouncements")) || [];

    container.innerHTML = "";

    if(announcements.length === 0){

        container.innerHTML =
        "<p style='color:#7B7396;'>No announcements yet.</p>";

        return;
    }

    announcements.forEach(item=>{

        container.innerHTML += `
        <div class="announcement">

            <small>${item.subject} • ${item.time}</small>

            <h3>${item.title}</h3>

            <p><strong>Date:</strong> ${item.date}</p>

            <p><strong>Venue:</strong> ${item.room}</p>

            <p><strong>Coverage:</strong> ${item.coverage}</p>

            <p>${item.details}</p>

        </div>
        `;

    });

}

// ---------- LOAD WHEN PAGE OPENS ----------

window.onload = function(){
    loadAnnouncements();
};