'use strict';
// A design viewer with fixed fictional samples. No application data or storage.
const copy = {
  en: {
    previewSettings:'Preview settings', designPreview:'Design preview', settingsIntro:'Adjust the design sample. These controls are not application settings.',
    frameLabel:'Frame', languageLabel:'Sample language', scenarioLabel:'Scenario', textLabel:'Sample text', fitWindow:'Fit window', compactFrame:'Phone · 390 px',
    normalScenario:'A planned Friday', emptyScenario:'Starting empty', conflictScenario:'Overlapping commitments', aboutPreview:'About this preview',
    previewLimits:'Fictional data, fixed at 13 Nov 2026, 09:30 (Asia/Tokyo). No records are saved. Editors are read-only.',
    implementationLimit:'The Flutter learning app still has in-memory tasks only. Task completion and data operations are not implemented in this study.',
    reviewGuide:'Review guide', designReferences:'Design references', productScope:'Product scope',
    today:'Today',
    week:'Week',
    tasks:'Tasks',
    mode:'Temporary use · sample',
    modeNote:'This study saves nothing.',
    date:'Friday, 13 November 2026',
    todayIntro:'See your commitments. Choose what comes next.',
    weekIntro:'Make room before the deadline.',
    tasksIntro:'What needs finishing, separate from when you work.',
    newPlan:'New plan',
    newTask:'New task',
    due:'Due today',
    overdue:'Overdue',
    undated:'No date',
    completed:'Completed',
    dueSummary:'2 due today · 1 overdue',
    quick:'＋ Capture a task',
    report:'Send the project report',
    reportMeta:'Due today · no set time',
    call:'Confirm the repair visit',
    callMeta:'Due today · 17:00',
    receipt:'Submit travel receipts',
    receiptMeta:'Overdue · 12 Nov',
    book:'Choose a book for the weekend',
    bookMeta:'No deadline',
    done:'Send the meeting notes',
    doneMeta:'Completed · due today',
    next:'NEXT · IN 30 MINUTES',
    meeting:'Design review',
    meetingPlace:'Meeting room B',
    details:'View plan',
    agenda:'Day agenda',
    allDay:'All day · Community workshop',
    writing:'Work on the report',
    writingPlace:'Desk · Personal work session',
    walk:'Walk by the river',
    walkPlace:'Personal time',
    class:'Japanese class',
    classPlace:'Room 204 · Weekly',
    free:'No plans recorded',
    freeHint:'Gaps reflect recorded plans only. They do not guarantee availability.',
    reserve:'Add plan',
    taskNote:'A deadline does not reserve time. Create a separate plan for the work.',
    count:'2 due today',
    weekRange:'9–15 November 2026',
    weekScroll:'Scroll the calendar to see all seven days. Times use Asia/Tokyo.',
    weekTask:'Report due Friday',
    weekTaskHint:'Reserve time explicitly; the task deadline stays unchanged.',
    openTasks:'View tasks',
    dayNames:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    dayFull:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    emptyTitle:'A little room to begin.',
    emptyText:'Start with one task or a commitment. You can plan without a school or an account.',
    emptyDay:'No timed plans for this day.',
    conflictTitle:'Two plans overlap',
    conflictText:'Design review and Repair visit overlap from 10:30 to 11:00. Both remain visible.',
    repair:'Repair visit',
    repairPlace:'Home · Overlaps design review',
    editor:'Plan details',
    taskEditor:'Task details',
    preview:'Read-only editor sample. No input or changes are stored.',
    title:'Title',
    deadline:'Deadline',
    deadlineValue:'13 Nov 2026 · No set time',
    exactHint:'Due at the stated time. This does not reserve a work interval.',
    noDateHint:'No deadline. This task remains outside the due-today count.',
    deadlineHint:'Due by the end of this date. This task does not occupy calendar time.',
    time:'Time',
    timeValue:'13 Nov 2026 · 10:00–11:00',
    zone:'Workspace timezone: Asia/Tokyo',
    location:'Location',
    scope:'Edit scope: this occurrence only',
    repeat:'Weekly on Friday · Ends 18 Dec 2026',
    scopeHint:'Changing this occurrence leaves the other Fridays unchanged.',
    close:'Close',
    showError:'Preview save failure',
    errorTitle:'Could not save this change',
    errorText:'Your input stays here. The saved record has not changed. In the app, offer Retry and keep Cancel reachable.',
    retained:'Input retained · not saved',
    dismiss:'Back to sample',
    errorCaption:'Save failure sample',
    newTaskTitle:'A task title is enough',
    newPlanTitle:'Reserve a time interval',
    planHint:'Choose a start and end. Adding this plan does not complete or change a task.',
    editorOpened:'Editor preview opened',
    taskState:'Incomplete',
    now:'Sample time 09:30',
    selectedDay:'Selected day',
    period:'09:00–18:00',
    lesson:'Future planner design',
    dueHeading:'Task deadlines',
    allDayWeek:'All-day items',
    weekAllDay:'Fri 13 · Community workshop'
  },
  zh: {
    previewSettings:'预览设置', designPreview:'界面预览', settingsIntro:'调整界面稿的展示方式。这些选项不是应用功能设置。',
    frameLabel:'预览尺寸', languageLabel:'示例语言', scenarioLabel:'示例状态', textLabel:'示例字号', fitWindow:'适应窗口', compactFrame:'手机 · 390 px',
    normalScenario:'有安排的星期五', emptyScenario:'空白开始', conflictScenario:'日程时间重叠', aboutPreview:'关于此预览',
    previewLimits:'虚构数据，时间固定在 2026年11月13日 09:30（Asia/Tokyo）。不保存任何记录，编辑器为只读示例。',
    implementationLimit:'Flutter 学习应用目前仅有内存中的任务。此界面稿没有实现任务完成或数据操作。',
    reviewGuide:'评审说明', designReferences:'设计参考', productScope:'产品范围',
    today:'今天',
    week:'本周',
    tasks:'任务',
    mode:'临时使用 · 示例',
    modeNote:'此界面稿不保存任何数据。',
    date:'2026年11月13日，星期五',
    todayIntro:'看清今天的安排，再决定下一步。',
    weekIntro:'在截止之前，为要做的事留出时间。',
    tasksIntro:'要完成什么，与何时动手，分开安排。',
    newPlan:'新建日程',
    newTask:'新建任务',
    due:'今天截止',
    overdue:'已逾期',
    undated:'未设日期',
    completed:'已完成',
    dueSummary:'今天截止 2 项 · 已逾期 1 项',
    quick:'＋ 记下一项任务',
    report:'发送项目报告',
    reportMeta:'今天截止 · 未设具体时间',
    call:'确认上门维修时间',
    callMeta:'今天截止 · 17:00',
    receipt:'提交交通费票据',
    receiptMeta:'已逾期 · 11月12日',
    book:'挑一本周末读的书',
    bookMeta:'未设截止日期',
    done:'发送会议记录',
    doneMeta:'已完成 · 今天截止',
    next:'接下来 · 30 分钟后',
    meeting:'设计讨论',
    meetingPlace:'B 会议室',
    details:'查看日程',
    agenda:'今天的日程',
    allDay:'全天 · 社区活动',
    writing:'整理项目报告',
    writingPlace:'书桌 · 个人工作时段',
    walk:'去河边散步',
    walkPlace:'个人时间',
    class:'日语课',
    classPlace:'204 教室 · 每周重复',
    free:'未记录日程',
    freeHint:'空白只表示尚未记录日程，不代表一定有空。',
    reserve:'安排日程',
    taskNote:'截止日期不会占据日历时间。请另建日程安排工作。',
    count:'今天截止 2 项',
    weekRange:'2026年11月9日至15日',
    weekScroll:'横向滚动可查看七天。时间使用 Asia/Tokyo。',
    weekTask:'项目报告周五截止',
    weekTaskHint:'单独安排工作时间，不改变任务的截止日期。',
    openTasks:'查看任务',
    dayNames:['一','二','三','四','五','六','日'],
    dayFull:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
    emptyTitle:'从一件小事开始。',
    emptyText:'记下任务或安排一个日程。无需学校身份，也无需账号。',
    emptyDay:'这一天还没有定时日程。',
    conflictTitle:'两项日程时间重叠',
    conflictText:'设计讨论与上门维修在 10:30–11:00 重叠。两项安排都会保留显示。',
    repair:'上门维修',
    repairPlace:'家中 · 与设计讨论重叠',
    editor:'日程详情',
    taskEditor:'任务详情',
    preview:'只读编辑示例，不存储输入或修改。',
    title:'标题',
    deadline:'截止日期',
    deadlineValue:'2026年11月13日 · 未设具体时间',
    exactHint:'在指定时刻截止，不会自动预留工作时段。',
    noDateHint:'未设截止日期，不计入今天截止的数量。',
    deadlineHint:'在当天结束前完成。此任务不会占据日历时间。',
    time:'时间',
    timeValue:'2026年11月13日 · 10:00–11:00',
    zone:'工作区时区：Asia/Tokyo',
    location:'地点',
    scope:'修改范围：仅本次日程',
    repeat:'每周五 · 2026年12月18日结束',
    scopeHint:'修改这一次，不会改变其他星期五的安排。',
    close:'关闭',
    showError:'预览保存失败',
    errorTitle:'未能保存这次修改',
    errorText:'输入仍保留在这里，已保存的记录没有改变。正式应用应提供重试，并保留取消操作。',
    retained:'输入已保留 · 尚未保存',
    dismiss:'返回示例',
    errorCaption:'保存失败示例',
    newTaskTitle:'有一个标题，就可以开始',
    newPlanTitle:'留出一段时间',
    planHint:'明确开始与结束时间。添加日程不会完成任务，也不会更改其日期。',
    editorOpened:'已打开编辑界面预览',
    taskState:'未完成',
    now:'示例时间 09:30',
    selectedDay:'所选日期',
    period:'09:00–18:00',
    lesson:'未来规划界面',
    dueHeading:'任务截止日期',
    allDayWeek:'全天事项',
    weekAllDay:'周五 13日 · 社区活动'
  },
  ja: {
    previewSettings:'プレビュー設定', designPreview:'デザインプレビュー', settingsIntro:'画面サンプルの表示を調整します。アプリ本体の設定ではありません。',
    frameLabel:'表示サイズ', languageLabel:'サンプル言語', scenarioLabel:'サンプル状態', textLabel:'文字サイズ', fitWindow:'ウィンドウに合わせる', compactFrame:'スマートフォン · 390 px',
    normalScenario:'予定のある金曜日', emptyScenario:'空の状態', conflictScenario:'予定の重複', aboutPreview:'このプレビューについて',
    previewLimits:'架空のデータです。時刻は2026年11月13日09:30（Asia/Tokyo）に固定されています。記録は保存せず、編集画面は読み取り専用です。',
    implementationLimit:'Flutterの学習用アプリにはメモリ内のタスクだけがあります。この画面稿ではタスクの完了やデータ操作は実装していません。',
    reviewGuide:'レビューガイド', designReferences:'デザインの参考', productScope:'製品の範囲',
    today:'今日',
    week:'今週',
    tasks:'タスク',
    mode:'一時利用 · サンプル',
    modeNote:'この画面はデータを保存しません。',
    date:'2026年11月13日 金曜日',
    todayIntro:'今日の予定を見て、次にすることを決める。',
    weekIntro:'締め切りの前に、取り組む時間を。',
    tasksIntro:'終えることと、取り組む時間を分けて考える。',
    newPlan:'予定を追加',
    newTask:'タスクを追加',
    due:'今日が期限',
    overdue:'期限超過',
    undated:'日付なし',
    completed:'完了済み',
    dueSummary:'今日が期限 2件 · 期限超過 1件',
    quick:'＋ タスクをメモ',
    report:'プロジェクト報告書を送る',
    reportMeta:'今日が期限 · 時刻なし',
    call:'修理の訪問時間を確認する',
    callMeta:'今日が期限 · 17:00',
    receipt:'交通費の領収書を提出する',
    receiptMeta:'期限超過 · 11月12日',
    book:'週末に読む本を選ぶ',
    bookMeta:'期限なし',
    done:'議事録を送る',
    doneMeta:'完了 · 今日が期限',
    next:'次の予定 · 30分後',
    meeting:'デザインの打ち合わせ',
    meetingPlace:'会議室 B',
    details:'予定を見る',
    agenda:'今日の予定',
    allDay:'終日 · 地域のワークショップ',
    writing:'報告書をまとめる',
    writingPlace:'デスク · 個人の作業時間',
    walk:'川沿いを散歩する',
    walkPlace:'自分の時間',
    class:'日本語の授業',
    classPlace:'204教室 · 毎週',
    free:'予定の記録なし',
    freeHint:'空白は記録がない時間です。必ず空いているとは限りません。',
    reserve:'予定を入れる',
    taskNote:'期限は予定の時間枠ではありません。作業時間は別の予定として追加します。',
    count:'今日が期限 2件',
    weekRange:'2026年11月9日–15日',
    weekScroll:'横にスクロールして7日間を確認。時刻は Asia/Tokyo。',
    weekTask:'報告書は金曜日が期限',
    weekTaskHint:'作業時間を別に確保しても、タスクの期限は変わりません。',
    openTasks:'タスクを見る',
    dayNames:['月','火','水','木','金','土','日'],
    dayFull:['月曜日','火曜日','水曜日','木曜日','金曜日','土曜日','日曜日'],
    emptyTitle:'まず、一つのことから。',
    emptyText:'タスクか予定を一つ記録しましょう。学校の認証もアカウントも不要です。',
    emptyDay:'この日の時間指定の予定はありません。',
    conflictTitle:'二つの予定が重なっています',
    conflictText:'打ち合わせと修理の訪問が10:30–11:00に重なります。両方の予定を表示します。',
    repair:'修理の訪問',
    repairPlace:'自宅 · 打ち合わせと重複',
    editor:'予定の詳細',
    taskEditor:'タスクの詳細',
    preview:'読み取り専用の編集サンプルです。入力や変更は保存されません。',
    title:'タイトル',
    deadline:'期限',
    deadlineValue:'2026年11月13日 · 時刻なし',
    exactHint:'指定時刻が期限です。作業時間の枠は確保しません。',
    noDateHint:'期限はありません。今日が期限の件数には含めません。',
    deadlineHint:'この日の終わりまでが期限です。予定の時間枠は確保しません。',
    time:'時間',
    timeValue:'2026年11月13日 · 10:00–11:00',
    zone:'ワークスペースのタイムゾーン：Asia/Tokyo',
    location:'場所',
    scope:'変更する範囲：この回のみ',
    repeat:'毎週金曜日 · 2026年12月18日まで',
    scopeHint:'この回の変更は、他の金曜日の予定に影響しません。',
    close:'閉じる',
    showError:'保存失敗をプレビュー',
    errorTitle:'変更を保存できませんでした',
    errorText:'入力はここに残り、保存済みの記録は変わりません。アプリでは再試行とキャンセルを利用できるようにします。',
    retained:'入力を保持 · 未保存',
    dismiss:'サンプルに戻る',
    errorCaption:'保存失敗のサンプル',
    newTaskTitle:'タイトルだけで始められます',
    newPlanTitle:'取り組む時間を確保する',
    planHint:'開始と終了を指定します。予定を追加してもタスクは完了せず、期限も変わりません。',
    editorOpened:'編集サンプルを開きました',
    taskState:'未完了',
    now:'サンプル時刻 09:30',
    selectedDay:'選択した日',
    period:'09:00–18:00',
    lesson:'今後のプランナー画面',
    dueHeading:'タスクの期限',
    allDayWeek:'終日の予定',
    weekAllDay:'金 13日 · 地域のワークショップ'
  }
};

// Reference-inspired presentation refinements. The samples are still read-only.
const additions = {
  en: {
    brief:'Weekly check-in', briefPlace:'Meeting room A', library:'Library reading', libraryPlace:'City library', market:'Saturday market', marketPlace:'Town square',
    workPlan:'New work plan', tray:'Tasks to consider', showTray:'Show tasks', hideTray:'Hide tasks', trayHint:'Deadlines stay with tasks. Create a separate plan for the work.',
    selected:'Selected', currentDay:'Today', optional:'Deadline and notes · optional', notes:'Notes', noNotes:'No notes', starts:'Starts', ends:'Ends',
    nowMarker:'09:30 · Now', minuteUnit:'min', hourUnit:'h', sampleTime:'Fixed sample time', reportDeadline:'Deadline · Fri 13 Nov', callDeadline:'Deadline · Fri 13 Nov, 17:00',
    separatePlan:'Separate work plan. The original task and deadline stay unchanged.', quickHint:'Start with a title. Add details only when needed.',
    dateOnly:'No set time', fullDateHint:'Calendar dates use the workspace timezone.', gapNote:'Time without recorded plans'
  },
  zh: {
    brief:'每周碰头会', briefPlace:'A 会议室', library:'去图书馆阅读', libraryPlace:'市立图书馆', market:'逛周末市集', marketPlace:'城市广场',
    workPlan:'安排工作时段', tray:'待安排的任务', showTray:'展开任务', hideTray:'收起任务', trayHint:'截止日期保留在任务中。工作时间另建日程。',
    selected:'已选择', currentDay:'今天', optional:'截止日期与备注 · 可选', notes:'备注', noNotes:'暂无备注', starts:'开始', ends:'结束',
    nowMarker:'09:30 · 现在', minuteUnit:'分钟', hourUnit:'小时', sampleTime:'固定示例时间', reportDeadline:'截止 · 11月13日 周五', callDeadline:'截止 · 11月13日 周五 17:00',
    separatePlan:'这是独立的工作日程。原任务与截止日期保持不变。', quickHint:'先记标题，需要时再补充细节。',
    dateOnly:'未设具体时间', fullDateHint:'日期使用工作区时区。', gapNote:'未记录安排的时间'
  },
  ja: {
    brief:'週の打ち合わせ', briefPlace:'会議室 A', library:'図書館で読書', libraryPlace:'市立図書館', market:'週末のマーケット', marketPlace:'街の広場',
    workPlan:'作業予定を作る', tray:'予定を考えるタスク', showTray:'タスクを表示', hideTray:'タスクを閉じる', trayHint:'期限はタスクに残ります。作業時間は別の予定として確保します。',
    selected:'選択中', currentDay:'今日', optional:'期限とメモ · 任意', notes:'メモ', noNotes:'メモなし', starts:'開始', ends:'終了',
    nowMarker:'09:30 · 現在', minuteUnit:'分', hourUnit:'時間', sampleTime:'固定のサンプル時刻', reportDeadline:'期限 · 11月13日 金曜日', callDeadline:'期限 · 11月13日 金曜日 17:00',
    separatePlan:'独立した作業予定です。元のタスクと期限は変わりません。', quickHint:'まずタイトルだけ。必要なときに詳細を追加。',
    dateOnly:'時刻なし', fullDateHint:'日付はワークスペースのタイムゾーンに従います。', gapNote:'予定が記録されていない時間'
  }
};
for (const language of Object.keys(additions)) Object.assign(copy[language], additions[language]);

const app = document.querySelector('#app');
const screen = document.querySelector('#screen');
const editor = document.querySelector('#editor');
const settings = document.querySelector('#preview-settings');
let language = 'zh', page = 'today', scenario = 'normal', day = 4;
let activeEditor = null, opener = null, trayOpen = null;
let settingsOpener = null;
const t = key => copy[language][key];
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = name => `<svg class="icon" aria-hidden="true"><use href="../icons/sprite.svg#${name}"></use></svg>`;
const action = (label, kind, cls = '') => `<button class="${cls}" data-editor="${kind}">${esc(t(label))}</button>`;
const minute = time => Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]);
const timeLabel = minutes => `${String(Math.floor(minutes / 60)).padStart(2,'0')}:${String(minutes % 60).padStart(2,'0')}`;
const locale = () => ({en:'en-GB',zh:'zh-CN',ja:'ja-JP'}[language]);
const dateLabel = date => new Intl.DateTimeFormat(locale(), {year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(2026,10,date)));
const fullDate = date => new Intl.DateTimeFormat(locale(), {year:'numeric',month:'long',day:'numeric',weekday:'long',timeZone:'UTC'}).format(new Date(Date.UTC(2026,10,date)));
const duration = minutes => `${minutes >= 60 ? `${Math.floor(minutes / 60)} ${t('hourUnit')}` : ''}${minutes >= 60 && minutes % 60 ? ' ' : ''}${minutes % 60 ? `${minutes % 60} ${t('minuteUnit')}` : ''}`;
const samples = {
  mondayBrief:{title:'brief',place:'briefPlace',start:'09:30',end:'10:30',date:9},
  mondayWork:{title:'writing',place:'writingPlace',start:'13:00',end:'14:30',date:9},
  tuesdayLibrary:{title:'library',place:'libraryPlace',start:'10:00',end:'11:30',date:10},
  wednesdayBrief:{title:'meeting',place:'meetingPlace',start:'11:00',end:'12:00',date:11},
  wednesdayWalk:{title:'walk',place:'walkPlace',start:'16:00',end:'17:00',date:11},
  thursdayWork:{title:'writing',place:'writingPlace',start:'14:00',end:'15:30',date:12},
  meeting:{title:'meeting',place:'meetingPlace',start:'10:00',end:'11:00',date:13},
  writing:{title:'writing',place:'writingPlace',start:'13:00',end:'14:30',date:13},
  class:{title:'class',place:'classPlace',start:'15:00',end:'16:00',date:13},
  walk:{title:'walk',place:'walkPlace',start:'16:30',end:'17:30',date:13},
  repair:{title:'repair',place:'repairPlace',start:'10:30',end:'11:30',date:13},
  saturdayMarket:{title:'market',place:'marketPlace',start:'10:00',end:'11:00',date:14}
};
function eventsFor(index) {
  if (scenario === 'empty') return [];
  return Object.keys(samples).filter(key => samples[key].date === index + 9 && (key !== 'repair' || scenario === 'conflict'))
    .sort((a,b) => minute(samples[a].start) - minute(samples[b].start));
}
function nav() {
  return ['today','week','tasks'].map(name => `<button class="nav-button" data-page="${name}" ${page === name ? 'aria-current="page"' : ''}>${icon(name)}<span>${esc(t(name))}</span></button>`).join('');
}
function taskRow(name, meta, completed = false) {
  return `<div class="task-row ${completed ? 'completed' : ''}"><span class="check" aria-hidden="true">${completed ? '✓' : ''}</span><div class="task-body"><button class="task-title" data-editor="task:${name}">${esc(t(name))}<span class="sr-only"> · ${esc(t(completed ? 'completed' : 'taskState'))}</span></button><p class="task-meta ${name === 'receipt' ? 'overdue' : ''}">${esc(t(meta))}</p></div></div>`;
}
function taskGroups(full = false) {
  return `<div class="task-group"><h4 class="group-label">${esc(t('due'))}<span class="count">2</span></h4>${taskRow('report','reportMeta')}${taskRow('call','callMeta')}</div><div class="task-group"><h4 class="group-label overdue">${esc(t('overdue'))}<span class="count">1</span></h4>${taskRow('receipt','receiptMeta')}</div><details ${full ? 'open' : ''}><summary>${esc(t('undated'))} · 1</summary>${taskRow('book','bookMeta')}</details><details><summary>${esc(t('completed'))} · 1</summary>${taskRow('done','doneMeta',true)}</details>`;
}
function eventButton(key, short = false) {
  const item = samples[key];
  return `<button class="event ${key === 'meeting' ? 'next-event' : ''}" data-editor="${key}" aria-label="${esc(t(item.title))}, ${dateLabel(item.date)}, ${item.start}–${item.end}, ${esc(t(item.place))}"><b>${esc(t(item.title))}</b><small>${item.start}–${item.end}${short ? '' : ` · ${esc(t(item.place))}`}</small></button>`;
}
function empty() {
  return `<div class="empty"><img src="../illustrations/empty-tasks-compact.svg" alt=""><h3>${esc(t('emptyTitle'))}</h3><p>${esc(t('emptyText'))}</p><div class="page-actions">${action('newTask','newTask','primary')}${action('newPlan','newPlan')}</div></div>`;
}
function gap(index, start, end) {
  return `<div class="open-interval"><div><span class="gap-range">${timeLabel(start)}–${timeLabel(end)}</span><span class="gap-duration">${duration(end - start)} · ${esc(t('free'))}</span></div>${action('reserve',`gap:${index+9}:${start}:${end}`,'text-button')}</div>`;
}
function agenda(index) {
  const entries = eventsFor(index);
  if (!entries.length) return `<div class="empty-day"><p class="small">${esc(t('emptyDay'))}</p>${action('newPlan','newPlan','text-button')}</div>`;
  let cursor = index === 4 ? 570 : null;
  let html = index === 4 ? `<div class="now-marker"><span>${esc(t('nowMarker'))}</span><i aria-hidden="true"></i></div>` : '';
  for (const key of entries) {
    const item = samples[key];
    const start = minute(item.start), end = minute(item.end);
    if (cursor !== null && start > cursor) html += gap(index,cursor,start);
    html += `<div class="event-row"><span class="time">${item.start}</span>${eventButton(key)}</div>`;
    cursor = Math.max(cursor || 0,end);
  }
  return `<div class="agenda">${html}</div><p class="timeline-note">${esc(t('freeHint'))}</p>`;
}
function conflict() {
  return scenario === 'conflict' ? `<div class="callout"><strong>${esc(t('conflictTitle'))}</strong><p>${esc(t('conflictText'))}</p></div>` : '';
}
function today() {
  if (scenario === 'empty') return empty();
  return `<div class="today-grid"><section class="agenda-column" aria-label="${esc(t('agenda'))}"><div class="next"><div class="next-label">${esc(t('next'))}</div><div class="next-body"><div><h3>${esc(t('meeting'))}</h3><p>${esc(t('meetingPlace'))}</p></div><div class="next-time">10:00<span>–11:00</span></div></div>${action('details','meeting')}</div><div class="section-head"><h3>${esc(t('agenda'))}</h3></div><p class="all-day">${esc(t('allDay'))}</p>${conflict()}${agenda(4)}</section><section class="task-column" aria-label="${esc(t('tasks'))}"><div class="section-head"><h3>${esc(t('tasks'))}</h3><span class="small">${esc(t('count'))}</span></div>${action('quick','newTask','quick-add')}${taskGroups()}<p class="timeline-note">${esc(t('taskNote'))}</p></section></div>`;
}
function dayPicker() {
  return `<div class="day-picker" aria-label="${esc(t('selectedDay'))}">${t('dayNames').map((label,i) => `<button class="day-button ${i === 4 ? 'is-today' : ''}" data-day="${i}" aria-pressed="${day === i}" aria-label="${esc(fullDate(9+i))}${i === 4 ? `, ${esc(t('currentDay'))}` : ''}"><span>${esc(label)}</span><b>${9+i}</b><small>${i === 4 ? esc(t('currentDay')) : '&nbsp;'}</small></button>`).join('')}</div>`;
}
function weekGrid() {
  const ruler = `<div class="week-time-axis" aria-hidden="true"><div class="ruler-heading">JST</div><div class="week-hours">${Array.from({length:10},(_,hour) => `<span class="hour" style="top:calc(${hour*72}px * var(--scale,1))">${hour+9}:00</span>`).join('')}</div></div>`;
  const days = t('dayNames').map((label,i) => `<div class="week-day ${i === day ? 'selected-day' : ''} ${i === 4 ? 'today-column' : ''}"><button class="day-heading" data-day="${i}" aria-label="${esc(fullDate(i+9))}" aria-pressed="${day === i}"><span>${esc(label)} · ${9+i}</span><small>${i === 4 ? esc(t('currentDay')) : i === day ? esc(t('selected')) : '&nbsp;'}</small></button><div class="week-hours">${i === 4 ? `<div class="calendar-now" style="top:calc(36px * var(--scale,1))" aria-hidden="true"></div>` : ''}${eventsFor(i).map(key => {
    const item = samples[key];
    const top = (minute(item.start)-540)*1.2;
    const height = (minute(item.end)-minute(item.start))*1.2;
    return `<div class="positioned-event ${scenario === 'conflict' && ['meeting','repair'].includes(key) ? 'overlap-'+key : ''}" style="top:calc(${top}px * var(--scale,1));height:calc(${height}px * var(--scale,1))">${eventButton(key,true)}</div>`;
  }).join('')}</div></div>`).join('');
  return `<div class="week-scroll" tabindex="0" role="region" aria-label="${esc(t('week'))}"><div class="week-grid">${ruler}${days}</div></div>`;
}
function taskTray() {
  return `<aside id="week-tasks" class="task-tray" aria-label="${esc(t('tray'))}" ${trayOpen ? '' : 'hidden'}><h3>${esc(t('tray'))}</h3><p>${esc(t('trayHint'))}</p>${['report','call'].map(key => `<div class="tray-task"><button class="task-title" data-editor="task:${key}">${esc(t(key))}</button><span class="deadline-label">${esc(t(key+'Deadline'))}</span>${action('workPlan',`planFor:${key}`,'text-button')}</div>`).join('')}<button class="tray-all" data-page="tasks">${esc(t('openTasks'))}</button></aside>`;
}
function week() {
  if (trayOpen === null) trayOpen = screen.clientWidth > 850;
  return `<div class="week-toolbar">${dayPicker()}${scenario === 'empty' ? '' : `<button class="tray-toggle" data-tray-toggle aria-expanded="${trayOpen}" aria-controls="week-tasks">${icon('tasks')}${esc(t(trayOpen ? 'hideTray' : 'showTray'))}</button>`}</div>${scenario === 'empty' ? empty() : `${conflict()}<p class="all-day">${esc(t('allDayWeek'))} · ${esc(t('weekAllDay'))}</p><div class="week-layout ${trayOpen ? 'with-tray' : ''}"><div class="week-calendar"><p class="week-legend week-scroll-hint">${esc(t('weekScroll'))}</p>${weekGrid()}<section class="day-agenda"><div class="section-head"><h3>${esc(fullDate(9+day))}</h3><span class="small">${esc(t('selectedDay'))}</span></div>${agenda(day)}</section></div>${taskTray()}</div>`}`;
}
function render() {
  const oldCalendar = app.querySelector('.week-scroll');
  const scrollPosition = oldCalendar ? {left:oldCalendar.scrollLeft,top:oldCalendar.scrollTop} : null;
  app.lang = {zh:'zh-Hans',ja:'ja',en:'en'}[language];
  app.innerHTML = `<header class="topbar"><div class="brand"><img src="../brand/cadence-mark-wine.svg" alt=""><span>Cadence</span></div><div class="topbar-tools"><span class="mode">${esc(t('designPreview'))}</span><button class="settings-trigger" data-settings aria-label="${esc(t('previewSettings'))}" title="${esc(t('previewSettings'))}">${icon('settings')}<span>${esc(t('previewSettings'))}</span></button></div></header><nav class="mobile-nav" aria-label="${esc(t('lesson'))}">${nav()}</nav><div class="shell"><nav class="sidebar" aria-label="${esc(t('lesson'))}">${nav()}</nav><main class="content ${page === 'tasks' ? 'tasks-page' : ''}"><header class="page-head"><div><p class="date-line">${esc(t(page === 'week' ? 'weekRange' : 'date'))}</p><h2>${esc(t(page))}</h2><p class="subtitle">${esc(t(page+'Intro'))}</p>${page === 'today' && scenario !== 'empty' ? `<p class="subtitle">${esc(t('dueSummary'))}</p>` : ''}</div><div class="page-actions">${action(page === 'tasks' ? 'newTask' : 'newPlan',page === 'tasks' ? 'newTask' : 'newPlan','primary')}</div></header>${page === 'today' ? today() : page === 'week' ? week() : scenario === 'empty' ? empty() : action('quick','newTask','quick-add')+taskGroups(true)+`<p class="timeline-note">${esc(t('taskNote'))}</p>`}</main></div>`;
  const calendar = app.querySelector('.week-scroll');
  if (calendar && scrollPosition) {calendar.scrollLeft = scrollPosition.left; calendar.scrollTop = scrollPosition.top;}
  settings.lang = app.lang;
  settings.querySelectorAll('[data-settings-copy]').forEach(element => {element.textContent = t(element.dataset.settingsCopy);});
}
function valueField(label,value,hint = '') {
  return `<div class="field"><p class="field-label">${esc(t(label))}</p><div class="field-value">${esc(value)}</div>${hint ? `<p>${esc(hint)}</p>` : ''}</div>`;
}
function showEditor(kind, failed = false) {
  if (!editor.open) opener = document.activeElement;
  activeEditor = kind;
  const isTask = kind.startsWith('task:') || kind === 'newTask';
  const key = kind.includes(':') ? kind.split(':')[1] : kind;
  const gapParts = kind.startsWith('gap:') ? kind.split(':').slice(1).map(Number) : null;
  const fromTask = kind.startsWith('planFor:');
  const item = samples[kind] || {title:fromTask ? (key === 'report' ? 'writing' : key) : 'newPlanTitle',place:'writingPlace',date:gapParts ? gapParts[0] : page === 'week' ? day+9 : 13,start:gapParts ? timeLabel(gapParts[1]) : '13:00',end:gapParts ? timeLabel(gapParts[2]) : '14:30'};
  const title = kind === 'newTask' ? t('newTaskTitle') : isTask ? t(key) : t(item.title);
  const noDeadline = key === 'book' || kind === 'newTask';
  const taskDeadline = noDeadline ? t('bookMeta') : `${dateLabel(key === 'receipt' ? 12 : 13)} · ${key === 'call' ? '17:00' : t('dateOnly')}`;
  const details = valueField('deadline',taskDeadline,t(noDeadline ? 'noDateHint' : key === 'call' ? 'exactHint' : 'deadlineHint')) + valueField('notes',t('noNotes'));
  editor.lang = app.lang;
  editor.dataset.frame = screen.dataset.frame;
  editor.dataset.kind = isTask ? 'task' : 'plan';
  document.querySelector('#editor-content').innerHTML = `<div class="editor-head"><div><p class="editor-eyebrow">${esc(t(kind === 'newTask' ? 'newTask' : isTask ? 'tasks' : 'week'))}</p><h2 id="editor-title">${esc(t(isTask ? 'taskEditor' : 'editor'))}</h2></div><button data-close>${esc(t('close'))}</button></div><p class="editor-note">${esc(t('preview'))}</p>${kind === 'class' ? `<p class="scope">${esc(t('scope'))}<br>${esc(t('repeat'))}<br>${esc(t('scopeHint'))}</p>` : ''}<div class="field title-field"><label for="sample-title">${esc(t('title'))}</label><input id="sample-title" readonly value="${esc(title)}">${kind === 'newTask' ? `<p>${esc(t('quickHint'))}</p>` : ''}</div>${isTask ? `<details class="optional-fields" ${kind === 'newTask' ? '' : 'open'}><summary>${esc(t('optional'))}</summary>${details}</details>` : `${fromTask ? `<p class="scope">${esc(t('separatePlan'))}<br><strong>${esc(t(key))}</strong><br>${esc(t(key+'Deadline'))}</p>` : ''}<div class="time-fields">${valueField('starts',`${dateLabel(item.date)} · ${item.start}`)}${valueField('ends',`${dateLabel(item.date)} · ${item.end}`)}</div><p class="editor-note">${esc(t('zone'))} · ${duration(minute(item.end)-minute(item.start))}</p>${valueField('location',t(item.place))}<p class="editor-note">${esc(t('planHint'))}</p>`}${failed ? `<div class="error" role="status"><strong>${esc(t('errorTitle'))}</strong><p>${esc(t('errorText'))}</p><p>${esc(t('retained'))}</p></div>` : ''}<div class="editor-actions"><button data-close>${esc(t('dismiss'))}</button><button class="primary" data-failure>${esc(t('showError'))}</button></div>`;
  if (!editor.open) editor.showModal();
  document.querySelector('#announcement').textContent = t('editorOpened');
}
app.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-settings')) {
    settingsOpener = button; settings.showModal();
  } else if (button.dataset.page) {
    page = button.dataset.page; render();
    [...app.querySelectorAll(`.nav-button[data-page="${page}"]`)].find(el => el.getClientRects().length)?.focus({preventScroll:true});
  } else if (button.dataset.day !== undefined) {
    const controlClass = button.classList.contains('day-heading') ? 'day-heading' : 'day-button';
    day = Number(button.dataset.day); render();
    app.querySelector(`.${controlClass}[data-day="${day}"]`).focus({preventScroll:true});
  } else if (button.hasAttribute('data-tray-toggle')) {
    trayOpen = !trayOpen; render(); app.querySelector('[data-tray-toggle]').focus({preventScroll:true});
  } else if (button.dataset.editor) showEditor(button.dataset.editor);
});
editor.addEventListener('click', event => {
  if (event.target.closest('[data-close]')) editor.close();
  if (event.target.closest('[data-failure]')) {showEditor(activeEditor,true);editor.querySelector('[data-failure]').focus();}
});
editor.addEventListener('close', () => {
  const target = opener?.isConnected && opener.getClientRects().length ? opener : app.querySelector('[data-settings]');
  target?.focus({preventScroll:true});
});
settings.querySelector('[data-settings-close]').addEventListener('click', () => settings.close());
settings.addEventListener('close', () => {
  if (editor.open) return;
  const target = settingsOpener?.isConnected ? settingsOpener : app.querySelector('[data-settings]');
  target?.focus({preventScroll:true});
});
document.querySelector('#language').addEventListener('change', event => {language = event.target.value; render();});
document.querySelector('#scenario').addEventListener('change', event => {
  scenario = event.target.value; render();
  if (scenario === 'error') {
    settings.close();
    showEditor('class',true);
    opener = app.querySelector('[data-settings]');
  }
});
document.querySelector('#frame').addEventListener('change', event => {screen.dataset.frame = event.target.value;});
document.querySelector('#scale').addEventListener('change', event => {document.documentElement.style.setProperty('--scale',event.target.value);});
render();
