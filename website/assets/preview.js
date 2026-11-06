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
})();
