"""Author a static Android design board. This is not application code."""
from html import escape
import xml.etree.ElementTree as ET


def build_android_study(art, write, icons):
    ink, muted, wine = '#2F3033', '#6B6B70', '#7C394B'
    rule, wash, boundary = '#E8E8EB', '#F5EEF0', '#87838A'
    parts = []

    def text(x, y, label, size=16, color=ink, weight=400, serif=False):
        family = 'Georgia, serif' if serif else 'Arial, sans-serif'
        parts.append(f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" '
                     f'font-weight="{weight}" fill="{color}">{escape(label)}</text>')

    def box(x, y, w, h, fill='white', stroke='none', radius=6):
        parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" '
                     f'fill="{fill}" stroke="{stroke}"/>')

    def line(x1, y1, x2, y2, color=rule):
        parts.append(f'<path d="M{x1} {y1}H{x2}" stroke="{color}"/>' if y1 == y2 else
                     f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}"/>')

    def icon(name, x, y, size=24, color=ink):
        parts.append(f'<g transform="translate({x} {y}) scale({size / 24})" fill="none" '
                     f'stroke="{color}" stroke-width="1.75" stroke-linecap="round" '
                     f'stroke-linejoin="round">{icons[name]}</g>')

    def button(y, label):
        box(16, y, 358, 48, wine)
        icon('add', 32, y + 12, color='white')
        text(68, y + 30, label, 16, 'white', 600)

    def task(y, title, deadline):
        box(16, y + 3, 20, 20, 'white', boundary, 4)
        text(48, y + 20, title, 17, weight=600)
        text(48, y + 44, deadline, 14, muted)
        icon('more', 344, y + 9, 22, muted)

    def nav(selected):
        line(0, 748, 390, 748)
        for index, name in enumerate(['Today', 'Tasks', 'Week']):
            x = 16 + index * 124
            if name == selected:
                box(x, 758, 110, 55, wash)
            color = wine if name == selected else muted
            icon(name.lower(), x + 43, 762, 22, color)
            text(x + (31 if name == 'Today' else 33), 802, name, 14, color,
                 600 if name == selected else 400)

    def start_phone(x, title, date):
        parts.append(f'<g transform="translate({x} 202)">')
        box(0, 0, 390, 824, 'white', '#CCC9CE', 14)
        text(16, 35, 'Cadence', 24, wine, serif=True)
        icon('settings', 342, 17, color=muted)
        line(16, 51, 374, 51)
        text(16, 88, title, 30, weight=600)
        text(16, 115, date, 15, muted)
        icon('phone', 16, 134, 18, muted)
        text(43, 148, 'On this device', 13, muted)
        text(240, 148, 'Asia/Tokyo', 13, muted)

    box(0, 0, 1360, 1440, '#F6F5F1', radius=0)
    text(64, 52, 'CADENCE / ANDROID DAILY USE / DESIGN STUDY 01', 13, wine, 600)
    text(64, 108, 'A clear next step. Room to adjust.', 43, serif=True)
    text(64, 143, 'Proposed screens with fictional data. No running app, measured speed or released feature is shown.', 17, muted)
    text(64, 174, 'Thursday 12 November 2026, 09:30 / After a work plan was saved / English reference at ordinary text size', 14, muted)

    start_phone(64, 'Today', 'Thursday, 12 November 2026')
    box(16, 177, 358, 132, '#FAFAFA', rule)
    text(32, 204, 'NEXT', 12, wine, 600)
    text(32, 235, 'Design review', 23, weight=600)
    icon('clock', 32, 251, 18, muted)
    text(58, 265, '10:00–11:00', 16)
    icon('location', 32, 279, 18, muted)
    text(58, 293, 'Meeting room B', 14, muted)
    text(16, 347, 'TODAY’S PLANS', 12, muted, 600)
    text(16, 382, '10:00', 16, weight=600)
    text(16, 405, '11:00', 13, muted)
    line(79, 365, 79, 419)
    text(95, 383, 'Design review', 17, weight=600)
    text(95, 407, 'Meeting room B', 14, muted)
    line(16, 430, 374, 430)
    text(16, 462, '13:00', 16, weight=600)
    text(16, 485, '14:00', 13, muted)
    line(79, 446, 79, 499)
    text(95, 463, 'Send the report', 17, weight=600)
    text(95, 487, 'Planned time · 1 hour', 14, muted)
    text(16, 538, 'DUE TODAY · 1', 12, wine, 600)
    task(551, 'Submit expense claim', 'Deadline · Today, 18:00')
    line(16, 614, 374, 614)
    text(16, 642, 'No date · 1', 15, muted)
    text(269, 642, 'View tasks', 14, wine, 600)
    button(682, 'New task')
    nav('Today')
    parts.append('</g>')

    start_phone(485, 'Tasks', '3 open tasks')
    box(16, 177, 119, 48, wash)
    text(34, 208, 'Open · 3', 16, wine, 600)
    text(158, 208, 'Completed · 0', 16, muted)
    text(16, 264, 'DUE TODAY · 1', 12, wine, 600)
    task(278, 'Submit expense claim', 'Deadline · Thu 12 Nov, 18:00')
    line(16, 341, 374, 341)
    text(16, 379, 'LATER · 1', 12, muted, 600)
    task(393, 'Send the report', 'Deadline · Fri 13 Nov, 17:00')
    line(16, 456, 374, 456)
    text(16, 494, 'NO DATE · 1', 12, muted, 600)
    task(508, 'Choose a weekend book', 'No deadline')
    line(16, 571, 374, 571)
    text(16, 626, 'A title is enough to start.', 15, muted)
    text(16, 649, 'Add a deadline when it is useful.', 14, muted)
    button(682, 'New task')
    nav('Tasks')
    parts.append('</g>')

    start_phone(906, 'Week', '9–15 November 2026')
    icon('chevron-left', 276, 68, 22, muted)
    icon('chevron-right', 342, 68, 22, muted)
    for index, (day, date) in enumerate(zip(['M', 'T', 'W', 'T', 'F', 'S', 'S'], range(9, 16))):
        x = 16 + index * 51
        selected = date == 12
        box(x, 177, 48, 66, wash if selected else 'white', wine if selected else 'none')
        text(x + 18, 200, day, 12, wine if selected else muted)
        text(x + 14, 224, str(date), 17, wine if selected else ink, 600)
    text(16, 276, 'Thu 12 Nov · Today', 18, weight=600)
    text(291, 276, 'This week', 14, wine, 600)
    text(16, 310, '10:00–11:00', 14, muted)
    text(16, 336, 'Design review', 18, weight=600)
    text(16, 359, 'Meeting room B', 14, muted)
    line(16, 378, 374, 378)
    box(16, 393, 358, 86, '#FAFAFA', rule)
    text(32, 419, '11:00–13:00 · 2 hours', 15, weight=600)
    text(32, 444, 'No plan recorded', 14, muted)
    text(266, 462, 'Add plan', 14, wine, 600)
    text(16, 512, '13:00–14:00', 14, muted)
    text(16, 538, 'Send the report', 18, weight=600)
    text(16, 561, 'Planned time · 1 hour', 14, muted)
    line(16, 580, 374, 580)
    text(16, 611, 'TASKS · 3 OPEN', 12, muted, 600)
    text(16, 637, 'Send the report', 16, weight=600)
    text(16, 659, 'Deadline · Fri 13 Nov, 17:00', 14, muted)
    icon('chevron-down', 344, 604, 22, muted)
    button(682, 'New plan')
    nav('Week')
    parts.append('</g>')

    for x, title, body in [
        (64, '01 / Read the next commitment', 'Time and place before secondary detail.'),
        (485, '02 / Capture with one field', 'Dates stay optional. Completion stays explicit.'),
        (906, '03 / Reserve a separate interval', 'The Friday deadline stays unchanged.'),
    ]:
        text(x, 1068, title, 19, wine, 600)
        text(x, 1097, body, 15, muted)
    line(64, 1125, 1296, 1125, '#DDDCD5')
    text(64, 1157, 'SMALL STATES / DISTINCT MEANINGS / LOCALIZED COPY LIVES OUTSIDE THE ARTWORK', 12, wine, 600)
    for x, name, title, lines in [
        (64, 'no-deadlines-compact', 'Nothing due today', ['Other tasks may remain.', 'Keep the agenda visible.']),
        (485, 'unplanned-time-compact', 'No plan recorded', ['A gap in these records.', 'Not verified availability.']),
        (906, 'unsaved-draft-compact', 'Changes not saved', ['A draft is still open.', 'Offer explicit choices.']),
    ]:
        box(x, 1182, 390, 160, 'white', rule)
        tree = ET.fromstring((art / 'illustrations' / f'{name}.svg').read_text(encoding='utf-8'))
        body = ''.join(ET.tostring(child, encoding='unicode') for child in tree
                       if child.tag.split('}')[-1] != 'title')
        parts.append(f'<g transform="translate({x + 12} 1210)">{body}</g>')
        text(x + 126, 1221, title, 18, weight=600)
        text(x + 126, 1249, lines[0], 14, muted)
        text(x + 126, 1273, lines[1], 14, muted)
        text(x + 16, 1321, name, 12, wine)
    text(64, 1380, 'Static design reference. Scroll, keyboard, Back, saving, large text and TalkBack still need native implementation and checks.', 15, muted)
    text(64, 1408, 'Specification: docs/ANDROID_EXPERIENCE.md / Editable source: tools/android_design_art.py / Existing Cadence vector family', 13, muted)
    write(art / 'ui/android-daily-flow.svg',
          '<svg xmlns="http://www.w3.org/2000/svg" width="1360" height="1440" viewBox="0 0 1360 1440" '
          'role="img" aria-label="Cadence proposed Android daily planning screens">'
          '<title>Cadence Android daily use: static design study</title>' + ''.join(parts) + '</svg>')
