'use strict';

// Review controls only. This is a visual reference, not a second task app.
const copies = {
  zh: {
    lang: 'zh-Hans', session: '临时会话', workspace: '工作区', tasks: '任务',
    intro: '把眼前的事，一件件安排好。', title: '任务标题', placeholder: '写下下一件事',
    error: '请输入任务标题', add: '添加任务', first: '提交课程报告', second: '复习线性代数',
    pending: '未完成', complete: '已完成', delete: '删除任务', undo: '撤销删除',
    deleted: '已删除“提交课程报告”', empty: '暂无任务，添加一条吧', emptyHint: '从上方的任务标题开始。',
    notice: '任务仅保留在本次会话，关闭后不会保存。', count: '练习次数：0', reset: '归零', increment: '加1',
  },
  en: {
    lang: 'en', session: 'Temporary session', workspace: 'Workspace', tasks: 'Tasks',
    intro: 'A little space for what comes next.', title: 'Task title', placeholder: 'Write down the next thing',
    error: 'Enter a task title', add: 'Add task', first: 'Submit the course report', second: 'Review linear algebra',
    pending: 'Not completed', complete: 'Completed', delete: 'Delete task', undo: 'Undo delete',
    deleted: 'Deleted “Submit the course report”', empty: 'No tasks yet. Add your first one.', emptyHint: 'Start with the task title above.',
    notice: 'Tasks last only for this session. Closing the app does not save them.', count: 'Practice count: 0', reset: 'Reset', increment: 'Add 1',
  },
  ja: {
    lang: 'ja', session: '一時セッション', workspace: 'ワークスペース', tasks: 'タスク',
    intro: '目の前のことを、ひとつずつ。', title: 'タスクのタイトル', placeholder: '次にすることを書く',
    error: 'タスクのタイトルを入力してください', add: 'タスクを追加', first: '授業のレポートを提出する', second: '線形代数を復習する',
    pending: '未完了', complete: '完了', delete: 'タスクを削除', undo: '削除を元に戻す',
    deleted: '「授業のレポートを提出する」を削除しました', empty: 'タスクはまだありません', emptyHint: '上のタイトル欄から追加しましょう。',
    notice: 'タスクはこのセッションだけに保持され、終了すると保存されません。', count: '練習回数：0', reset: 'リセット', increment: '1増やす',
  },
};
const frame = document.querySelector('.screen-frame');
const screen = document.querySelector('.sample-screen');
const controls = Object.fromEntries(['size', 'state', 'language', 'scale'].map(id => [id, document.getElementById(id)]));

function render() {
  const copy = copies[controls.language.value];
  const state = controls.state.value;
  frame.dataset.size = controls.size.value;
  frame.dataset.state = state;
  screen.lang = copy.lang;
  screen.style.setProperty('--text-scale', controls.scale.value);
  screen.querySelectorAll('[data-copy]').forEach(element => { element.textContent = copy[element.dataset.copy]; });
  screen.querySelectorAll('.delete-target').forEach(element => { element.title = copy.delete; });
  screen.querySelector('[data-row="first"]').hidden = state === 'empty' || state === 'undo';
  screen.querySelector('[data-row="second"]').hidden = state === 'empty';
  screen.querySelector('.empty-state').hidden = state !== 'empty';
  screen.querySelector('.error-message').hidden = state !== 'error';
  screen.querySelector('.deletion-message').hidden = state !== 'undo';
  screen.querySelector('.undo').classList.toggle('muted', state !== 'undo');
  document.getElementById('preview-status').textContent =
    `Design only · ${controls.state.selectedOptions[0].text} · ${controls.language.selectedOptions[0].text} · ${controls.scale.value === '2' ? '200%' : '100%'} sample text. Drawn controls do not change tasks.`;
}

Object.values(controls).forEach(control => control.addEventListener('change', render));
document.querySelector('.review-tools').hidden = false;
render();
