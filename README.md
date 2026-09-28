# arkobombs-project
project in arkobombs
our hackathon project
## Team Leader

Anlica
# 🎓 ARKOBOMBS

### Academic Announcement & Readiness Platform

**CODEFEST 2026 Project**

> *From Announcement to Action.*

ARKOBOMBS is a web-based academic readiness platform designed to organize school announcements into one synchronized dashboard for both teachers and students. Instead of students searching through Messenger chats, group chats, LMS announcements, or classroom reminders, ARKOBOMBS gathers everything into one organized system where announcements become actionable academic events.

---

## 📌 Project Overview

### What is ARKOBOMBS?

ARKOBOMBS (Academic Announcement & Readiness Platform) is a centralized announcement management system that helps teachers publish academic information while helping students stay prepared for quizzes, examinations, laboratory activities, presentations, assignments, and emergency announcements.

The platform provides two connected portals:

* **Teacher Portal** — where teachers create, update, and manage announcements.
* **Student Portal** — where students automatically receive organized announcements and academic reminders.

The goal is to reduce missed deadlines, improve organization, and keep students academically ready.

---

## 💡 Problem Statement

Students often receive academic announcements from different platforms, such as:

* Messenger group chats
* Google Classroom
* LMS announcements
* Classroom chats
* Verbal announcements

Because announcements are scattered, students may:

* Miss quizzes and deadlines.
* Forget exam coverage.
* Lose important reviewer files.
* Miss schedule changes.
* Become confused about classroom requirements.

ARKOBOMBS solves this by organizing announcements into one synchronized platform.

---

## 🎯 Proposed Solution

Teachers publish one announcement.

ARKOBOMBS automatically organizes the information into:

* Announcement Feed
* Academic Calendar
* Countdown Widget
* Subject Organizer
* Emergency Notification Center

Students immediately receive the update inside their dashboard.

**Teacher Announces → ARKOBOMBS Organizes → Student Acts**

---

# ✨ Main Features

## 👩‍🏫 Teacher Portal

Teachers can:

* Publish academic announcements.
* Create quizzes and examination schedules.
* Add laboratory exam coverage.
* Upload reviewer links.
* Manage class schedules.
* Reschedule announcements.
* Send emergency broadcasts.
* View announcement history.

### Teacher Dashboard Includes

* Academic statistics.
* Weekly summary.
* Today's schedule.
* Activity feed.
* Quick action shortcuts.

---

## 👨‍🎓 Student Portal

Students can:

* View all announcements.
* Receive synchronized schedule updates.
* View upcoming quizzes and exams.
* Download reviewers.
* Receive emergency alerts.
* See countdown timers for academic events.
* Organize announcements by subject.

---

## 🚨 Emergency Center

Teachers can instantly broadcast emergency announcements.

Examples include:

* Heavy rain suspension.
* Typhoon advisories.
* Earthquake reminders.
* Important school notices.
* Schedule suspension announcements.

Students receive emergency notifications immediately inside their portal.

---

## 📚 Study Materials

Teachers upload reviewer links.

Students can access:

* PDF reviewers.
* Lecture notes.
* PowerPoint presentations.
* Programming exercises.
* Laboratory instructions.

---

## 📅 Schedule Manager

Teachers manage:

* Quiz schedules.
* Examination schedules.
* Presentation schedules.
* Laboratory schedules.

Students automatically see updated schedules.

---

# 🖥️ System Workflow

## Teacher Workflow

1. Teacher logs in.
2. Opens Teacher Portal.
3. Creates a new announcement.
4. Fills in:

   * Subject
   * Event Type
   * Event Title
   * Section
   * Date
   * Time
   * Location
   * Requirements
   * Coverage
5. Clicks **Publish Announcement**.
6. Announcement is saved and synchronized.

---

## Student Workflow

1. Student logs in.
2. Opens Student Dashboard.
3. Dashboard automatically displays:

   * Latest announcements.
   * Upcoming events.
   * Reviewers.
   * Emergency alerts.
4. Student views event information.
5. Student prepares for the activity.

---

# 🛠️ Project Structure

```
arkobombs-project/
│
├── index.html                 # Landing Page
├── login.html                 # Login Page
├── students.html              # Student Portal
├── Teacher Enhanced.html      # Teacher Portal
│
├── css/
│   └── style.css              # Landing page styles
│
├── js/
│   ├── app.js                 # Landing page interactions
│   ├── teacher.js             # Teacher Portal logic
│   ├── student.js             # Student Portal logic
│   └── supabase.js            # Database connection
│
├── assets/
│   ├── logo.png
│   ├── icons/
│   └── images/
│
└── README.md
```

---

# ⚙️ Technologies Used

| Technology   | Purpose                                       |
| ------------ | --------------------------------------------- |
| HTML5        | Website structure                             |
| CSS3         | User interface styling                        |
| JavaScript   | Interactive functionality                     |
| Supabase     | Backend database and realtime synchronization |
| GitHub Pages | Website deployment                            |
| Git & GitHub | Version control and collaboration             |

---

# 🚀 Installation Guide

Follow these steps to run ARKOBOMBS locally.

## Step 1 — Clone Repository

```bash
git clone https://github.com/anlica951-droid/arkobombs-project.git
```

## Step 2 — Open Project Folder

```bash
cd arkobombs-project
```

## Step 3 — Open with VS Code

Open the folder inside Visual Studio Code.

## Step 4 — Install Live Server

Install the **Live Server** extension inside VS Code.

## Step 5 — Run Website

Right-click `index.html`.

Choose:

**Open with Live Server**

The website opens in your browser.

---

# 🌐 Website Navigation Guide

## Landing Page (`index.html`)

Purpose:

* Introduces ARKOBOMBS.
* Explains project goals.
* Shows features.
* Shows roadmap.
* Leads users to Login Page.

Buttons:

* Learn More
* Log In

---

## Login Page (`login.html`)

Purpose:

Allows users to choose their portal.

### Student Login

* Select **Student**.
* Enter any username.
* Enter any password.
* Click **Continue**.
* Redirects to Student Portal.

### Teacher/Admin Login

* Select **Teacher / Admin**.
* Enter teacher username.
* Enter password.
* Click **Continue**.
* Redirects to Teacher Portal.

*(Current login is a prototype for CODEFEST demonstration and does not require real authentication.)*

---

## Teacher Portal (`Teacher Enhanced.html`)

Purpose:

Teacher workspace for managing academic information.

Main Sections:

* Dashboard
* Create Announcement
* My Classes
* Study Materials
* Schedule Manager
* History
* Emergency Center
* Settings

---

### Create Announcement

Steps:

1. Choose Subject.
2. Choose Event Type.
3. Enter Event Title.
4. Enter Section.
5. Select Date.
6. Select Time.
7. Enter Location.
8. Enter Requirements.
9. Enter Coverage.
10. Click **Publish Announcement**.

Result:

Announcement appears inside Student Portal.

---

### Upload Reviewer

1. Enter Subject.
2. Enter Reviewer Title.
3. Paste Reviewer Link.
4. Upload.

Students can download it immediately.

---

### Emergency Broadcast

1. Choose Alert Type.
2. Choose Target Class.
3. Type Emergency Message.
4. Click **Send Alert**.

Students receive notification.

---

## Student Portal (`students.html`)

Purpose:

Student academic dashboard.

Sections include:

* Dashboard
* Announcement Feed
* Academic Calendar
* Upcoming Exams
* Study Materials
* Countdown Widget
* Emergency Alerts

Students only receive information published by teachers.

---

# 🔄 Teacher and Student Synchronization

ARKOBOMBS uses **Supabase Realtime**.

### Teacher publishes announcement.

↓

### Supabase stores announcement.

↓

### Student Portal listens for changes.

↓

### Student Dashboard updates automatically.

This creates real-time synchronization between both portals.

---

# 📂 Database Tables

The project connects to Supabase using `supabase.js`.

Tables used:

| Table         | Description              |
| ------------- | ------------------------ |
| announcements | Academic announcements   |
| schedules     | Quiz and exam schedules  |
| materials     | Reviewer links           |
| alerts        | Emergency announcements  |
| history       | Teacher activity history |

---

# 📱 User Flow Diagram

```
Teacher Login
      │
      ▼
Teacher Dashboard
      │
      ▼
Create Announcement
      │
      ▼
Supabase Database
      │
      ▼
Realtime Sync
      │
      ▼
Student Dashboard
      │
      ▼
Countdown • Calendar • Notifications
```

---

# 🎨 UI Design Concept

ARKOBOMBS follows a soft startup-inspired interface.

Design Style:

* Soft Purple
* Lavender
* Indigo
* Glassmorphism
* Rounded Cards
* Modern Educational Dashboard

Fonts:

* DM Sans
* Playfair Display
* Inter
* Merriweather

Design Goal:

Create a calm academic workspace that feels organized and easy for students and teachers.

---

# 🎯 CODEFEST MVP Scope

Completed MVP Features:

* Landing Page
* Login Page
* Teacher Portal
* Student Portal
* Announcement Publishing
* Schedule Manager
* Reviewer Upload
* Emergency Center
* Realtime Sync (Supabase)
* Responsive Design

Future Improvements:

* Google Authentication
* Push Notifications
* Mobile Application
* Conflict Detection for overlapping schedules.
* Student Attendance Integration.
* Personalized Academic Planner.
* AI-powered Reminder Suggestions.

---

# 👥 Target Users

Primary Users:

* Senior High School Students
* College Students
* Teachers
* Academic Advisers

Potential Expansion:

* Entire schools and universities.
* Student organizations.
* Academic departments.

---

# 📖 How to Demonstrate ARKOBOMBS (CODEFEST Demo)

### Scenario

1. Open `index.html`.
2. Click **Log In**.
3. Choose **Teacher/Admin**.
4. Log into Teacher Portal.
5. Create a Programming Laboratory Exam announcement.
6. Publish announcement.
7. Open Student Portal.
8. Show that the announcement appears automatically.
9. Open Calendar and Countdown.
10. Show Emergency Alert feature.

Demo Message:

> "Instead of sending announcements in multiple chats, ARKOBOMBS converts every announcement into an organized academic event that students can immediately see, track, and prepare for."

---

# 🏆 Project Information

**Project Name:** ARKOBOMBS

**Tagline:** *From Announcement to Action.*

**Project Category:** Educational Technology / Academic Productivity

**Hackathon:** CODEFEST 2026

**Team Project:** Academic Announcement & Readiness Platform

---

# 💜 ARKOBOMBS Vision

ARKOBOMBS aims to create a smarter academic communication system where every announcement becomes an organized action item instead of another forgotten message.

By connecting teachers and students in one synchronized platform, ARKOBOMBS helps schools build a more organized, prepared, and academically ready community.

**From Announcement to Action.**
