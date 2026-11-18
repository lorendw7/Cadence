'use strict';

const copy = {
  en: {
    title: 'Focus design study',
    intro: 'Compare the same fictional task on Android and Windows. Controls inside the previews are examples.',
    state: 'Session state', room: 'Windows scene', scale: 'Sample text', lang: 'Preview language',
    running: 'Running', paused: 'Paused', recorded: 'Record saved', interrupted: 'Interrupted',
    refined: 'Refined room', original: 'Original room', plain: 'Plain',
    android: 'Android', windows: 'Windows · Expanded', windowsCompact: 'Windows · Compact',
    return: '‹ Return to task', focus: 'Focus', compact: 'Compact view', current: 'Current task',
    task: 'Send the report', due: 'Due Fri, 13 Nov · 17:00', remaining: 'Remaining', duration: 'Recorded time',
    pause: 'Pause', resume: 'Resume', end: 'End session', break: 'Start break',
    review: 'Recent sessions', taskAction: 'Return to task', mute: 'Mute',
    runningNote: 'One session, linked to this task.',
    pausedNote: 'The countdown stays at the same time until you resume.',
    recordedNote: 'Saved on this device. The task is still open.',
    interruptedNote: 'Only confirmed time is shown. Time during the interruption is unknown.',
  },
  ja: {
    title: '集中画面のデザイン案',
    intro: '同じ架空のタスクを Android と Windows で比較できます。画面内の操作は見本です。',
    state: 'セッションの状態', room: 'Windows の背景', scale: '文字サイズ', lang: '表示言語',
    running: '計測中', paused: '一時停止中', recorded: '記録を保存済み', interrupted: '中断',
    refined: '調整後の静かな部屋', original: '元の静かな部屋', plain: '背景なし',
    android: 'Android', windows: 'Windows · 展開表示', windowsCompact: 'Windows · コンパクト表示',
    return: '‹ タスクに戻る', focus: '集中', compact: 'コンパクト表示', current: '現在のタスク',
    task: 'レポートを送る', due: '締切 11月13日（金）17:00', remaining: '残り時間', duration: '記録時間',
    pause: '一時停止', resume: '再開', end: '終了', break: '休憩を開始',
    review: '最近のセッション', taskAction: 'タスクに戻る', mute: '消音',
    runningNote: 'このタスクの集中時間を計測中です。',
    pausedNote: '再開するまで残り時間は変わりません。',
    recordedNote: 'この端末に保存しました。タスクは未完了です。',
    interruptedNote: '確定した時間のみ表示しています。中断中の時間は不明です。',
  },
  'zh-Hans': {
    title: '专注界面设计稿',
    intro: '对照同一条示例任务在 Android 和 Windows 上的样子。预览中的按钮仅供示意。',
    state: '专注状态', room: 'Windows 场景', scale: '示例字号', lang: '预览语言',
    running: '计时中', paused: '已暂停', recorded: '记录已保存', interrupted: '已中断',
    refined: '精修静室', original: '原版静室', plain: '纯色',
    android: 'Android', windows: 'Windows · 展开', windowsCompact: 'Windows · 紧凑',
    return: '‹ 返回任务', focus: '专注', compact: '紧凑视图', current: '当前任务',
    task: '发送报告', due: '截止 11 月 13 日周五 17:00', remaining: '剩余时间', duration: '记录时长',
    pause: '暂停', resume: '继续', end: '结束专注', break: '开始休息',
    review: '最近专注', taskAction: '返回任务', mute: '静音',
    runningNote: '这段专注时间已关联到当前任务。',
    pausedNote: '继续前，剩余时间保持不变。',
    recordedNote: '已保存在此设备，任务仍未完成。',
    interruptedNote: '仅显示已确认时长，中断期间的时间未知。',
  },
};

// The viewer selects fixed examples. It does not run a timer or save records.
const examples = {
  running: {time: '18:42', measure: 'remaining', primary: 'pause', secondary: 'end'},
  paused: {time: '18:42', measure: 'remaining', primary: 'resume', secondary: 'end'},
  recorded: {time: '25:00', measure: 'duration', primary: 'break', secondary: 'review', art: 'recorded'},
  interrupted: {time: '12:00', measure: 'duration', primary: 'review', secondary: 'taskAction', art: 'interrupted'},
};
const rooms = {
  study: 'focus-art/quiet-room-study.png',
  original: '../focus-pack/art/quiet-room.png',
};

const form = document.querySelector('.review');
const state = document.querySelector('#state');
const room = document.querySelector('#room');
const scale = document.querySelector('#scale');
const language = document.querySelector('#language');
const samples = document.querySelector('#samples');
const desktop = document.querySelector('.desktop');
const scene = document.querySelector('#scene');
const template = document.querySelector('#panel');
const panels = document.querySelectorAll('[data-panel]');

for (const panel of panels) {
  panel.append(template.content.cloneNode(true));
}

function render() {
  const strings = copy[language.value];
  const example = examples[state.value];
  document.documentElement.lang = language.value;
  document.title = `Cadence · ${strings.title}`;
  samples.dataset.state = state.value;
  samples.dataset.scale = scale.value;
  desktop.dataset.room = room.value;
  if (rooms[room.value] && scene.getAttribute('src') !== rooms[room.value]) {
    scene.src = rooms[room.value];
  }

  for (const node of document.querySelectorAll('[data-copy]')) {
    node.textContent = strings[node.dataset.copy];
  }
  for (const panel of panels) {
    panel.querySelector('.clock').textContent = example.time;
    panel.querySelector('.measure-label').textContent = strings[example.measure];
    panel.querySelector('[data-field="label"]').textContent = strings[state.value];
    panel.querySelector('[data-field="detail"]').textContent = strings[`${state.value}Note`];
    panel.querySelector('[data-field="primary"]').textContent = strings[example.primary];
    panel.querySelector('[data-field="secondary"]').textContent = strings[example.secondary];
    const art = panel.querySelector('.state-art');
    art.hidden = !example.art;
    if (example.art) {
      art.src = `focus-art/${example.art}.svg`;
    } else {
      art.removeAttribute('src');
    }
  }
}

form.addEventListener('change', render);
render();
