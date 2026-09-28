// ==========================================================
// ARKOBOMBS STUDENT PORTAL
// student.js
// Receives all teacher updates in realtime.
// ==========================================================

// ---------- Global Data ----------
let studentAnnouncements = [];
let studentSchedules = [];
let studentMaterials = [];
let studentAlerts = [];

// ---------- Initialize ----------
window.addEventListener("DOMContentLoaded", async () => {
  await loadStudentDashboard();
  subscribeStudentRealtime();

  if ("Notification" in window) {
    Notification.requestPermission();
  }
});

// ==========================================================
// DASHBOARD LOADER
// ==========================================================

async function loadStudentDashboard() {
  await Promise.all([
    loadAnnouncements(),
    loadSchedules(),
    loadMaterials(),
    loadAlerts()
  ]);
}

// ==========================================================
// ANNOUNCEMENTS
// ==========================================================

async function loadAnnouncements() {
  const { data, error } = await db
    .from("announcements")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  studentAnnouncements = data || [];

  const container = document.getElementById("announcementFeed");
  if (!container) return;

  container.innerHTML = studentAnnouncements.map(item => `
    <div class="student-announcement">

      <div class="announcement-top">
        <span>${item.event_type}</span>
        <small>${item.subject}</small>
      </div>

      <h3>${item.title}</h3>

      <p>${item.coverage || ""}</p>

      <div class="announcement-footer">
        <span>📅 ${item.date}</span>
        <span>🕒 ${item.time}</span>
      </div>

      <small>📍 ${item.location}</small>

      <small>📎 ${item.requirements || "No requirements."}</small>

    </div>
  `).join("");
}

// ==========================================================
// SCHEDULE
// ==========================================================

async function loadSchedules() {
  const { data, error } = await db
    .from("schedules")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  studentSchedules = data || [];

  const schedule = document.getElementById("scheduleFeed");
  if (!schedule) return;

  schedule.innerHTML = studentSchedules.map(event => `
    <div class="schedule-card">

      <h4>${event.title}</h4>

      <p>${event.section}</p>

      <small>📅 ${event.date}</small><br>
      <small>🕒 ${event.time}</small><br>
      <small>📍 ${event.location}</small>

    </div>
  `).join("");
}

// ==========================================================
// STUDY MATERIALS
// ==========================================================

async function loadMaterials() {
  const { data, error } = await db
    .from("materials")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  studentMaterials = data || [];

  const materialFeed = document.getElementById("materialsFeed");
  if (!materialFeed) return;

  materialFeed.innerHTML = studentMaterials.map(file => `
    <div class="material-card">

      <div class="material-icon">📄</div>

      <div class="material-info">

        <b>${file.title}</b>

        <p>${file.subject}</p>

        <a href="${file.file_url}" target="_blank">
          Download Reviewer
        </a>

      </div>

    </div>
  `).join("");
}

// ==========================================================
// EMERGENCY ALERTS
// ==========================================================

async function loadAlerts() {
  const { data, error } = await db
    .from("alerts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  studentAlerts = data || [];

  const latest = studentAlerts[0];

  if (latest) {
    showAlertBanner(latest);
  }
}

function showAlertBanner(alert) {
  const banner = document.getElementById("emergencyBanner");
  if (!banner) return;

  banner.classList.remove("hidden");

  banner.innerHTML = `
      <div class="alert-header">
          🚨 ${alert.type}
      </div>

      <p>${alert.message}</p>

      <small>For: ${alert.section}</small>
  `;
}

// ==========================================================
// REALTIME CONNECTION
// ==========================================================

function subscribeStudentRealtime() {

  db.channel("student-live")

    // New Announcement
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "announcements"
      },
      payload => {
        loadAnnouncements();

        pushNotification(
          "📢 New Announcement",
          payload.new.title
        );
      }
    )

    // Updated Announcement
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "announcements"
      },
      payload => {
        loadAnnouncements();

        pushNotification(
          "🗓 Announcement Updated",
          payload.new.title
        );
      }
    )

    // Deleted Announcement
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "announcements"
      },
      () => {
        loadAnnouncements();
      }
    )

    // New Study Material
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "materials"
      },
      payload => {
        loadMaterials();

        pushNotification(
          "📂 New Reviewer Uploaded",
          payload.new.title
        );
      }
    )

    // New Schedule
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "schedules"
      },
      payload => {
        loadSchedules();

        pushNotification(
          "🗓 New Academic Schedule",
          payload.new.title
        );
      }
    )

    // Emergency Alert
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "alerts"
      },
      payload => {
        triggerEmergency(payload.new);
      }
    )

    .subscribe();

}

// ==========================================================
// FULL SCREEN EMERGENCY POPUP
// ==========================================================

function triggerEmergency(alert) {

  showAlertBanner(alert);

  const popup = document.getElementById("emergencyPopup");

  if (popup) {

    popup.classList.add("show");

    popup.querySelector("h2").textContent = alert.type;
    popup.querySelector("p").textContent = alert.message;

  }

  const sound = document.getElementById("alertSound");

  if (sound) {
    sound.play().catch(() => {});
  }

  if (navigator.vibrate) {
    navigator.vibrate([600, 200, 600, 200, 1200]);
  }

  pushNotification("🚨 Emergency Alert", alert.message);
}

function closeEmergencyPopup() {
  const popup = document.getElementById("emergencyPopup");

  if (popup) popup.classList.remove("show");

  const sound = document.getElementById("alertSound");

  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}

// ==========================================================
// BROWSER NOTIFICATIONS
// ==========================================================

function pushNotification(title, message) {

  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {

    new Notification(title, {
      body: message,
      icon: "assets/logo.png"
    });

  }

}