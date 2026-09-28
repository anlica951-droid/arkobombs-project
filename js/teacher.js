
// ==========================================================
// ARKOBOMBS TEACHER PORTAL
// teacher.js
// Teacher ↔ Student realtime synchronization using Supabase
// ==========================================================

// ---------- Global Data ----------
let announcements = [];
let schedules = [];
let reviewers = [];
let emergencyAlerts = [];
let historyLogs = [];

// ==========================================================
// INITIALIZE
// ==========================================================

window.addEventListener("DOMContentLoaded", async () => {
  await loadDashboard();
  subscribeRealtime();
});

// ==========================================================
// DASHBOARD
// ==========================================================

async function loadDashboard() {
  await Promise.all([
    loadAnnouncements(),
    loadSchedules(),
    loadReviewers(),
    loadEmergencyHistory(),
    loadAlerts()
  ]);

  const announcementCounter = document.getElementById("statAnnouncements");
  const eventCounter = document.getElementById("statEvents");
  const alertCounter = document.getElementById("statAlerts");

  if (announcementCounter) announcementCounter.textContent = announcements.length;
  if (eventCounter) eventCounter.textContent = schedules.length;
  if (alertCounter) alertCounter.textContent = emergencyAlerts.length;
}

// ==========================================================
// CREATE ANNOUNCEMENT
// ==========================================================

async function publishAnnouncement() {

  const announcement = {

    subject: document.getElementById("subject").value,
    event_type: document.getElementById("eventType").value,

    title: document.getElementById("eventTitle").value,
    section: document.getElementById("section").value,

    date: document.getElementById("eventDate").value,
    time: document.getElementById("eventTime").value,

    location: document.getElementById("location").value,
    requirements: document.getElementById("requirements").value,
    coverage: document.getElementById("coverage").value,

    created_at: new Date().toISOString()

  };

  if (
    !announcement.title ||
    !announcement.section ||
    !announcement.date ||
    !announcement.time
  ) {
    toast("Please complete all required fields.");
    return;
  }

  const { error } = await db
    .from("announcements")
    .insert([announcement]);

  if (error) {
    console.error(error);
    toast("Failed to publish announcement.");
    return;
  }

  await addHistory(`📢 Published "${announcement.title}"`);

  clearAnnouncementForm();
  loadAnnouncements();
  toast("Announcement published successfully.");

}

// ==========================================================
// LOAD ANNOUNCEMENTS
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

  announcements = data || [];

  const list = document.getElementById("announcementList");

  if (!list) return;

  list.innerHTML = announcements.map(item => `
      <div class="announcement-card">

        <h4>${item.title}</h4>

        <small>${item.subject} • ${item.section}</small>

        <p>📅 ${item.date} • 🕒 ${item.time}</p>

        <p>📍 ${item.location}</p>

        <div class="announcement-actions">

          <button onclick="moveAnnouncement('${item.id}')">
            Reschedule
          </button>

          <button onclick="deleteAnnouncement('${item.id}')">
            Delete
          </button>

        </div>

      </div>
  `).join("");

}

// ==========================================================
// DELETE ANNOUNCEMENT
// ==========================================================

async function deleteAnnouncement(id) {

  await db
    .from("announcements")
    .delete()
    .eq("id", id);

  await addHistory("🗑 Deleted an announcement.");

  loadAnnouncements();
  toast("Announcement deleted.");

}

// ==========================================================
// RESCHEDULE ANNOUNCEMENT
// ==========================================================

async function moveAnnouncement(id) {

  const newDate = prompt("Enter new date (YYYY-MM-DD)");
  const newTime = prompt("Enter new time (HH:MM)");

  if (!newDate || !newTime) return;

  const { error } = await db
    .from("announcements")
    .update({
      date: newDate,
      time: newTime
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    toast("Unable to update schedule.");
    return;
  }

  await addHistory("🗓 Announcement rescheduled.");

  loadAnnouncements();
  toast("Schedule updated.");

}

// ==========================================================
// STUDY MATERIALS
// ==========================================================

async function uploadReviewer() {

  const reviewer = {

    subject: document.getElementById("reviewSubject").value,
    title: document.getElementById("reviewTitle").value,
    file_url: document.getElementById("reviewLink").value,

    uploaded_at: new Date().toISOString()

  };

  if (!reviewer.title || !reviewer.file_url) {
    toast("Please complete reviewer information.");
    return;
  }

  const { error } = await db
    .from("materials")
    .insert([reviewer]);

  if (error) {
    console.error(error);
    toast("Upload failed.");
    return;
  }

  await addHistory(`📂 Uploaded "${reviewer.title}"`);

  loadReviewers();
  toast("Reviewer uploaded.");

}

async function loadReviewers() {

  const { data } = await db
    .from("materials")
    .select("*")
    .order("uploaded_at", { ascending: false });

  reviewers = data || [];

  const container = document.getElementById("reviewerList");

  if (!container) return;

  container.innerHTML = reviewers.map(file => `
      <div class="reviewer-card">

          <b>${file.title}</b>

          <small>${file.subject}</small>

          <a href="${file.file_url}" target="_blank">
            View Reviewer
          </a>

      </div>
  `).join("");

}

// ==========================================================
// SCHEDULE MANAGER
// ==========================================================

async function createSchedule() {

  const event = {

    title: document.getElementById("scheduleTitle").value,
    section: document.getElementById("scheduleSection").value,

    date: document.getElementById("scheduleDate").value,
    time: document.getElementById("scheduleTime").value,

    location: document.getElementById("scheduleLocation").value

  };

  if (!event.title || !event.date) {
    toast("Complete schedule information.");
    return;
  }

  await db
    .from("schedules")
    .insert([event]);

  await addHistory(`🗓 Added "${event.title}"`);

  loadSchedules();
  toast("Schedule created.");

}

async function loadSchedules() {

  const { data } = await db
    .from("schedules")
    .select("*")
    .order("date", { ascending: true });

  schedules = data || [];

  const container = document.getElementById("scheduleList");

  if (!container) return;

  container.innerHTML = schedules.map(event => `
      <div class="schedule-card">

          <h4>${event.title}</h4>

          <small>${event.section}</small>

          <p>${event.date} • ${event.time}</p>

          <p>📍 ${event.location}</p>

      </div>
  `).join("");

}

// ==========================================================
// EMERGENCY ALERTS
// ==========================================================

async function sendEmergency() {

  const payload = {

    type: document.getElementById("alertType").value,
    section: document.getElementById("alertSection").value,
    message: document.getElementById("alertMessage").value,

    created_at: new Date().toISOString()

  };

  if (!payload.message.trim()) {
    toast("Type an emergency message.");
    return;
  }

  const { error } = await db
    .from("alerts")
    .insert([payload]);

  if (error) {
    console.error(error);
    toast("Emergency broadcast failed.");
    return;
  }

  await addHistory(`🚨 Emergency Alert: ${payload.type}`);

  loadAlerts();

  document.getElementById("alertMessage").value = "";

  toast("Emergency broadcast sent.");

}

async function loadAlerts() {

  const { data } = await db
    .from("alerts")
    .select("*")
    .order("created_at", { ascending: false });

  emergencyAlerts = data || [];

  const list = document.getElementById("alertHistory");

  if (!list) return;

  list.innerHTML = emergencyAlerts.map(alert => `
      <div class="alert-card">

          <strong>${alert.type}</strong>

          <p>${alert.message}</p>

          <small>Target: ${alert.section}</small>

      </div>
  `).join("");

}

// ==========================================================
// HISTORY
// ==========================================================

async function addHistory(action) {

  await db
    .from("history")
    .insert([{
      action,
      created_at: new Date().toISOString()
    }]);

}

async function loadEmergencyHistory() {

  const { data } = await db
    .from("history")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  historyLogs = data || [];

  const container = document.getElementById("historyList");

  if (!container) return;

  container.innerHTML = historyLogs.map(log => `
      <div class="history-card">

          <p>${log.action}</p>

          <small>${new Date(log.created_at).toLocaleString()}</small>

      </div>
  `).join("");

}

// ==========================================================
// REALTIME SYNC
// ==========================================================

function subscribeRealtime() {

  db.channel("teacher-sync")

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "announcements"
      },
      () => {
        loadAnnouncements();
      }
    )

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "materials"
      },
      () => {
        loadReviewers();
      }
    )

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "schedules"
      },
      () => {
        loadSchedules();
      }
    )

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "alerts"
      },
      () => {
        loadAlerts();
      }
    )

    .subscribe();

}

// ==========================================================
// HELPERS
// ==========================================================

function clearAnnouncementForm() {

  [
    "eventTitle",
    "section",
    "eventDate",
    "eventTime",
    "location",
    "requirements",
    "coverage"
  ].forEach(id => {

    const input = document.getElementById(id);

    if (input) input.value = "";

  });

}

function toast(message) {

  const toastBox = document.getElementById("toast");

  if (!toastBox) {
    alert(message);
    return;
  }

  toastBox.textContent = message;
  toastBox.classList.add("show");

  setTimeout(() => {
    toastBox.classList.remove("show");
  }, 2500);

}