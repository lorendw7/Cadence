/* Fictional illustration only. Nothing here is persisted or sent anywhere. */
(function () {
  "use strict";
  var tabs = document.querySelector(".preview-tabs");
  if (!tabs) return;
  var buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
  var tasks = Array.from(document.querySelectorAll("[data-demo-task]"));
  var status = document.getElementById("demo-status");
  var reset = document.getElementById("reset-preview");
  var lastStatusKey = null;

  function selectTab(button, focus) {
    buttons.forEach(function (item) {
      var selected = item === button;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
    });
    if (focus) button.focus();
  }

  function renderTasks() {
    var remaining = tasks.filter(function (task) { return !task.checked; }).length;
    var copy = window.CadenceCopy[window.CadenceLanguage || "ja"];
    document.querySelectorAll("[data-count]").forEach(function (node) {
      node.dataset.count = String(remaining);
      var key = remaining === 0 ? "preview.allDone" : remaining === 1 ? "preview.remainingOne" : "preview.remaining";
      node.textContent = copy[key].replace("{count}", String(remaining));
    });
    if (lastStatusKey) status.textContent = copy[lastStatusKey];
  }

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () { selectTab(button, false); });
    button.addEventListener("keydown", function (event) {
      var next;
      if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
      if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(buttons[next], true);
      }
    });
  });
  tasks.forEach(function (task) {
    task.addEventListener("change", function () {
      lastStatusKey = task.checked ? "preview.statusDone" : "preview.statusOpen";
      renderTasks();
    });
  });
  reset.addEventListener("click", function () {
    tasks.forEach(function (task) { task.checked = task.defaultChecked; });
    lastStatusKey = "preview.statusReset";
    renderTasks();
  });
  document.addEventListener("cadence:language", renderTasks);
  tabs.hidden = false;
  reset.hidden = false;
  document.querySelector(".preview-instruction").hidden = false;
  renderTasks();
})();
