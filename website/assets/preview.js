/* A non-persistent design illustration, not the Cadence application. */
(function () {
  document.querySelectorAll('.preview-tabs').forEach(function (tabs) {
    var buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));

    function select(button, focus) {
      buttons.forEach(function (item) {
        var active = item === button;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
      });
      tabs.closest('.app-toolbar').querySelector('[data-view-heading]').textContent = button.textContent;
      if (focus) button.focus();
    }

    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () { select(button, false); });
      button.addEventListener('keydown', function (event) {
        var next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          select(buttons[next], true);
        }
      });
    });
  });

  // One fictional state drives both views and all translations. It is never saved.
  var previews = Array.from(document.querySelectorAll('.product-preview'));
  var originals = previews.map(function (preview) {
    return preview.querySelector('[data-demo-course] span').textContent;
  });

  function renderSchedule(state) {
    previews.forEach(function (preview, index) {
      var course = preview.querySelector('[data-demo-course]');
      var moved = state === 'moved';
      course.hidden = state === 'cancelled';
      course.style.setProperty('--day', moved ? '2' : '1');
      course.style.setProperty('--row', moved ? '4' : '1');
      course.querySelector('span').textContent = moved
        ? originals[index].replace('09:00', '15:00')
        : originals[index];
      preview.querySelector('[data-demo-today]').hidden = !moved;
      preview.querySelectorAll('[data-schedule-state]').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.scheduleState === state));
      });
      var status = preview.querySelector('.demo-status');
      status.textContent = status.getAttribute('data-' + state);
    });
  }

  previews.forEach(function (preview) {
    preview.querySelectorAll('[data-schedule-state]').forEach(function (button) {
      button.addEventListener('click', function () {
        renderSchedule(button.dataset.scheduleState);
      });
    });
    // With JavaScript disabled the static concept stays readable, without dead controls.
    preview.querySelector('.demo-controls').hidden = false;
  });
})();
