# Product Vision

Cadence is a **local-first time manager for campus life** — built for students first, and useful to the people who organize them (teachers, dorm managers).

One sentence: *your schedule, habits, and focus time in one offline app — shareable as files and pictures, never through a server.*

---

## Personas & scenarios

### 🎓 Student (primary persona)
- Imports the class timetable the teacher shared in the group chat (one tap).
- Tracks personal to-dos, medication/exercise/reading habits with streaks.
- Uses **Focus mode** (Pomodoro) for study sessions; sees per-subject focus stats ("6.5 h of math this week").
- Backs up to a JSON file; moves phones without losing a day of history.

### 👩‍🏫 Teacher
- Builds the term timetable once, exports it as a **template file** (`.cadence.json` / `.ics`).
- Posts it to the class group (LINE, WeChat, wherever) — every student imports it in one tap.
- Shares week-plan changes as an **image card** that reads well inside a chat.

### 🏠 Dorm manager
- Maintains duty rosters and inspection schedules as recurring events.
- Shares the roster to the dorm group chat as an image card or `.ics`.
- Keeps records on their own device; no resident data ever collected.

---

## The sharing model (how "LINE integration" works here)

Cadence **never talks to any network API**. Sharing rides the operating system's share sheet:

```
Cadence generates an artifact          the OS hands it to any app
┌──────────────────────────┐          ┌──────────────────────────┐
│ • timetable template .json│  share  │ LINE · WeChat · WhatsApp │
│ • calendar file .ics      │ ──────► │ email · Drive · anything  │
│ • schedule image card .png│  sheet  │ (user picks, user sends) │
└──────────────────────────┘          └──────────────────────────┘
```

- Works with **every** chat app at once — no per-app SDK, no partnerships, no server.
- The app keeps zero network permission; the privacy policy stays one sentence long.
- Receiving = importing a file from the chat (Android intent filter for `.ics` / `.cadence.json`).

**Artifacts:**
1. **Template file** (`*.cadence.json`) — a partial export (e.g. just a timetable) with the same versioned envelope as backups. Import merges it.
2. **`.ics` file** — interoperable with Google/Apple Calendar and other apps.
3. **Image card** (`.png`) — a rendered day/week schedule or roster, designed to be legible inside a chat bubble. Pictures are how groups actually communicate.

---

## Focus mode (the study aid)

- **Pomodoro timer**: default 25/5, configurable; long-break cycles.
- A session can be **attached to a class or to-do** — focus time inherits the subject.
- **Per-subject stats**: weekly/monthly focus hours by class; personal record streaks.
- Focus sessions feed the same heat-map/stats engine as habits — one "discipline dashboard".
- On Android: suggest enabling Do-Not-Disturb during a session (no special permission grabbed by default).
- Local notification when a session or break ends.

Why it fits: focus data is the third leg of the product — **plan (calendar) → act (habits/focus) → review (stats)** — and it needs zero network, zero content licensing.

---

## Non-goals (written down so we don't drift)

| Not doing | Why |
|-----------|-----|
| Accounts / cloud sync | Kills the trust story; servers cost money forever; file-based sharing covers the real scenarios |
| LINE/WeChat **API** integration (bots, OAuth) | Requires network + partner terms; the share sheet achieves the user's actual goal |
| Real-time multi-user editing | Different product; enormous complexity |
| Flashcards / question banks / content | Focus tool ≠ content platform; stay a *time* manager |
| Ads, analytics, telemetry | Non-negotiable, forever |

---

## Positioning line

> For campus life: one offline app for your timetable, tasks, habit streaks and focus hours — share schedules as files or pictures through any chat app, with your data always on your own device.
