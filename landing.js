// Deadlock Optimizer, landing page.
// Every text of the page lives in TEXT below (key -> ru / en); the markup carries only the keys.
// The owner's switches are right here at the top. The page loads nothing outside its own folder; the only
// outside address on it is the author's link, and that is a plain link.
(function () {
  'use strict';

  // ---------- switches ----------

  // THE DOWNLOAD LINK. While it is empty the build is not public: both download buttons stay placeholders
  // (href="#"), carry the "soon" mark and show the "coming soon" note. Put the link here to turn them on.
  var DOWNLOAD_URL = 'https://github.com/aliveenjoyer/deadlock-optimizer/releases/latest/download/DeadlockOptimizer.exe';

  // The name is a working one. It is shown in the header and in the browser tab ({name} in the texts below).
  // The <title> written in index.html is only what the tab shows before this script has run: change it there too.
  var APP_NAME = 'Deadlock Optimizer';
  var APP_VERSION = '0.2.2';             // shown in the "early version" block and beside a live download button

  // THE AUTHOR. Shown in two modest places: a line in the help section and a line in the footer, both linking to
  // the channel in a new tab. Empty AUTHOR_URL removes both lines.
  var AUTHOR_NAME = 'AliveEnjoyer';
  var AUTHOR_URL = 'https://www.twitch.tv/aliveenjoyer';

  // CHECKING THE FILE. tools\publish-landing.ps1 writes the checksum and the version of the latest release here each
  // time it publishes, so they cannot go stale. The VirusTotal link needs the file uploaded there first: a link to an
  // unknown checksum opens an empty page, so it stays hidden until VIRUSTOTAL_READY is true (-VirusTotal in the script).
  // SOURCE_URL: empty hides the "source code" link. The repository holds ready builds only until the source is pushed.
  var GITHUB_URL = 'https://github.com/aliveenjoyer/deadlock-optimizer';
  var EXE_SHA256 = '44243707ac106cb4a9ffcd9c2eb93ce77aec8f3410da24417e29de62c7bb533a';
  var VIRUSTOTAL_READY = false;
  var SOURCE_URL = '';

  // SCREENS OF THE APP, per language: real screenshots of version 0.2.0. The start screen is a fresh copy; the check and
  // the verdict come from the sample computer (tools\demo.ps1), which is what the captions say.
  var SCREENS = {
    ru: { start: 'assets/screens/ru/start.webp', scan: 'assets/screens/ru/scan.webp', result: 'assets/screens/ru/result.webp' },
    en: { start: 'assets/screens/en/start.webp', scan: 'assets/screens/en/scan.webp', result: 'assets/screens/en/result.webp' }
  };

  // The example limit bars: how wide each part is drawn. Proportions for the drawing only, never shown as numbers.
  var CASES = {
    cpuThread: { cpuThread: 84, cpuLikely: 10, cpuAll: 0, gpu: 0, free: 6 },
    cpuAll: { cpuThread: 12, cpuLikely: 0, cpuAll: 72, gpu: 0, free: 16 },
    gpu: { cpuThread: 6, cpuLikely: 0, cpuAll: 0, gpu: 86, free: 8 },
    free: { cpuThread: 4, cpuLikely: 0, cpuAll: 0, gpu: 8, free: 88 }
  };

  // ---------- texts ----------
  // Wording follows the app (src\ui\locale.*.js, kbtext.*.js, tunertext.*.js); the four example verdicts are the
  // app's own verdict texts. English: a measured match is a "session", one once-a-second sample is a "reading" and
  // the act is "measuring"; CPU and GPU; sentence case. Russian speaks to the reader as «ты».
  // {name} is replaced with APP_NAME, {version} with APP_VERSION, {author} with AUTHOR_NAME.
  var TEXT = {
    'meta.title': { ru: '{name}: во что упирается FPS в Deadlock', en: '{name}: what limits your FPS in Deadlock' },
    'a11y.skip': { ru: 'Перейти к содержанию', en: 'Skip to content' },
    'nav.label': { ru: 'Разделы страницы', en: 'Page sections' },
    'nav.how': { ru: 'Как работает', en: 'How it works' },
    'nav.checks': { ru: 'Что проверяет', en: 'What it checks' },
    'nav.safety': { ru: 'Безопасность', en: 'Safety' },
    'nav.faq': { ru: 'Вопросы', en: 'Questions' },
    'lang.label': { ru: 'Язык', en: 'Language' },

    // hero
    'hero.early': { ru: 'Ранняя версия {version}', en: 'Early version {version}' },
    'screen.hero.caption': { ru: 'Настоящий экран программы, данные компьютера-примера.', en: 'A real screen of the app, with data from a sample computer.' },
    'proof.smartscreen': { ru: 'Windows может показать синее окно SmartScreen: у файла пока нет платной подписи издателя. Нажми «Подробнее», затем «Выполнить в любом случае».', en: 'Windows may show a blue SmartScreen window: the file has no paid publisher signature yet. Press “More info”, then “Run anyway”.' },
    'proof.label': { ru: 'Проверить файл:', en: 'Check the file:' },
    'proof.vt': { ru: 'VirusTotal', en: 'VirusTotal' },
    'proof.github': { ru: 'выпуск на GitHub', en: 'the release on GitHub' },
    'proof.source': { ru: 'исходный код', en: 'source code' },
    'hero.eyebrow': { ru: 'Диагностика производительности для Deadlock', en: 'Performance diagnostics for Deadlock' },
    'hero.title': { ru: 'У твоего FPS есть причина. Один матч, чтобы её назвать.', en: 'Your FPS has a cause. One match to name it.' },
    'hero.sub': { ru: 'Измеряет компьютер раз в секунду во время матча и по данным определяет, что ограничивает кадры: процессор, видеокарта или фон. Затем — порядок действий.', en: 'Measures your computer once a second during a match and tells, from data, what limits your frames: the CPU, the GPU or the background. Then, the order of actions.' },
    'cta.label': { ru: 'Скачать для Windows', en: 'Download for Windows' },
    'cta.soon': { ru: 'скоро', en: 'soon' },
    'cta.note.soon': { ru: 'Скоро. Сборка ещё не опубликована.', en: 'Coming soon. The build is not public yet.' },
    'cta.note.ready': { ru: 'Бесплатно. Версия {version}, меньше мегабайта, без установки.', en: 'Free. Version {version}, under a megabyte, no install.' },
    'trust.1': { ru: 'Не внедряется в игру', en: 'Never injects into the game' },
    'trust.2': { ru: 'Любое изменение обратимо', en: 'Every change is reversible' },
    'trust.3': { ru: 'Отчёты обезличены и отключаются', en: 'Reports are anonymous and can be switched off' },
    'trust.4': { ru: 'Сделано стримером Deadlock', en: 'Made by a Deadlock streamer' },

    // three verdicts a session gives, and what each changes
    'why.title': { ru: 'Что показывает замер', en: 'What a session shows' },
    'why.lead': { ru: 'Три типичных вывода и что меняет каждый.', en: 'Three typical verdicts and what each one changes.' },
    'why.1.title': { ru: 'Графика ни при чём: предел в процессоре', en: 'Graphics are not the issue: the limit is the CPU' },
    'why.1.text': { ru: 'Когда кадры сдерживает один поток процессора, настройки графики почти ничего не дают. Список действий начинается с того, что разгружает процессор.', en: 'When one CPU thread holds the frames back, graphics settings give almost nothing. The list of actions starts with what unloads the CPU.' },
    'why.2.title': { ru: '144 Гц у монитора, 60 в Windows', en: '144 Hz on the monitor, 60 in Windows' },
    'why.2.text': { ru: 'Игра выдаёт кадры, экран их не показывает. Программа сверяет частоту в Windows с возможностями монитора и указывает, где переключить.', en: 'The game delivers frames; the screen does not show them. The app compares the Windows refresh rate with the monitor’s and points to where to switch it.' },
    'why.3.title': { ru: 'Кадры терял кодировщик, а не интернет', en: 'The encoder dropped the frames, not the internet' },
    'why.3.text': { ru: 'По журналам трансляций различаются три причины потерянных кадров: сеть, отрисовка, кодирование. Если сжимает процессор, вывод назовёт это первым.', en: 'From stream logs three causes of dropped frames are told apart: network, rendering, encoding. If the CPU compresses, the verdict names it first.' },

    // what it measures and what it tells you
    'verdict.title': { ru: 'Замер и вывод', en: 'The session and the verdict' },
    'verdict.lead': { ru: 'Раз в секунду: загрузка процессора и видеокарты, частоты, температура, память, сеть. По замеру — вывод, во что упирался FPS, и кто мешал игре.', en: 'Once a second: CPU and GPU load, clocks, temperature, memory, network. From the session: what limited FPS and what got in the game’s way.' },
    'measure.title': { ru: 'Что попадает в замер', en: 'What goes into a session' },
    'measure.1': { ru: 'Загрузка процессора и видеокарты', en: 'CPU and GPU load' },
    'measure.1.note': { ru: 'игрой и другими программами', en: 'from the game and from other apps' },
    'measure.2': { ru: 'Самый занятый поток игры', en: 'Busiest game thread' },
    'measure.2.note': { ru: 'по нему видно, упирается ли игра в одно ядро', en: 'shows whether the game is held back by one core' },
    'measure.3': { ru: 'Частота процессора', en: 'CPU frequency' },
    'measure.3.note': { ru: 'и насколько её ограничивают перегрев или питание', en: 'and how far heat or power limits hold it down' },
    'measure.4': { ru: 'Температура видеокарты', en: 'GPU temperature' },
    'measure.4.note': { ru: 'у NVIDIA ещё мощность и причины сброса частоты', en: 'on NVIDIA also power and the reasons for throttling' },
    'measure.5': { ru: 'Память и видеопамять', en: 'Memory and VRAM' },
    'measure.5.note': { ru: 'сколько остаётся свободно', en: 'how much stays free' },
    'measure.6': { ru: 'Задержка и потери в сети', en: 'Ping and packet loss' },
    'measure.6.note': { ru: 'до роутера и до интернета', en: 'to the router and to the internet' },

    'example.label': { ru: 'Пример вывода', en: 'Example verdict' },
    'example.pick': { ru: 'Каким может быть вывод', en: 'Possible verdicts' },
    'limit.title': { ru: 'Что ограничивало FPS', en: 'What limited FPS' },
    'limit.unit': { ru: 'доля времени матча', en: 'share of match time' },
    'limit.cpuThread': { ru: 'процессор, один поток', en: 'CPU, one thread' },
    'limit.cpuLikely': { ru: 'вероятно, процессор', en: 'probably CPU' },
    'limit.cpuAll': { ru: 'процессор, все ядра', en: 'CPU, all cores' },
    'limit.gpu': { ru: 'видеокарта', en: 'GPU' },
    'limit.free': { ru: 'запас у обоих', en: 'both had headroom' },
    'case.cpuThread.title': { ru: 'FPS упирается в процессор', en: 'FPS is limited by the CPU' },
    'case.cpuThread.text': { ru: 'У видеокарты в матче оставался запас, а игру сдерживал процессор. Пока так, снижение настроек графики FPS почти не поднимет.', en: 'The GPU had headroom in the match, and the CPU was holding the game back. While that is the case, lowering graphics settings will barely raise FPS.' },
    'case.cpuThread.bar': { ru: 'Пример: почти весь матч FPS упирался в один поток процессора.', en: 'Example: for almost the whole match FPS was limited by one CPU thread.' },
    'case.cpuAll.title': { ru: 'Процессор занят целиком', en: 'The whole CPU is busy' },
    'case.cpuAll.text': { ru: 'В матче процессор был загружен почти целиком. Здесь больше всего помогает освободить процессор от других программ.', en: 'The CPU was almost fully loaded in the match. What helps most here is freeing the CPU from other apps.' },
    'case.cpuAll.bar': { ru: 'Пример: большую часть матча были заняты все ядра процессора.', en: 'Example: for most of the match all CPU cores were busy.' },
    'case.gpu.title': { ru: 'FPS упирается в видеокарту', en: 'FPS is limited by the GPU' },
    'case.gpu.text': { ru: 'Игра загружала видеокарту почти целиком. Здесь помогают настройки графики: больше всего дают масштаб рендера и апскейлер.', en: 'The game kept the GPU almost fully loaded. Graphics settings help here: render scale and the upscaler give the most.' },
    'case.gpu.bar': { ru: 'Пример: почти весь матч FPS упирался в видеокарту.', en: 'Example: for almost the whole match FPS was limited by the GPU.' },
    'case.free.title': { ru: 'Запас есть и у процессора, и у видеокарты', en: 'Both the CPU and the GPU have headroom' },
    'case.free.text': { ru: 'Большую часть матча ни видеокарта, ни самый занятый поток игры не работали на пределе. Обычно так бывает, когда FPS держится на ограничении: лимит кадров в игре или вертикальная синхронизация.', en: 'For most of the match neither the GPU nor the busiest game thread was working at its limit. This usually happens when FPS sits at a cap: the in-game frame limit or vertical sync.' },
    'case.free.bar': { ru: 'Пример: почти весь матч запас был и у процессора, и у видеокарты.', en: 'Example: for almost the whole match both the CPU and the GPU had headroom.' },

    'fix.title': { ru: 'Что сделать, по убыванию пользы', en: 'What to do, most useful first' },
    'fix.1.title': { ru: 'Самое полезное сверху', en: 'The most useful comes first' },
    'fix.1.text': { ru: 'Список действий начинается с того, что даст больше всего именно на твоём компьютере.', en: 'The list starts with what gives the most on your computer in particular.' },
    'fix.2.title': { ru: 'С цифрами и уровнем уверенности', en: 'Numbers and a confidence level' },
    'fix.2.text': { ru: 'У каждой находки — цифры, на которых она основана, и пометка: измерено, найдено в настройках или предположение.', en: 'Every finding shows its numbers and a label: measured, found in settings, or assumption.' },
    'fix.3.title': { ru: 'Часть исправлений в один клик', en: 'Some fixes take one click' },
    'fix.3.text': { ru: 'Безопасные настройки Windows программа меняет и возвращает одной кнопкой. Для остального даёт шаги.', en: 'Safe Windows settings the app changes and brings back with one button. For the rest it gives steps.' },
    'promise.1': { ru: 'Без обещаний в процентах.', en: 'No promises in percent.' },
    'promise.2': { ru: 'Только измеренное на твоём компьютере и то, что это меняет.', en: 'Only what was measured on your computer, and what changes it.' },

    // how it works
    'how.title': { ru: 'Как это работает', en: 'How it works' },
    'how.1.title': { ru: 'Запусти', en: 'Run it' },
    'how.1.text': { ru: 'Один exe-файл, без установщика. Выбери «Я стримлю» или «Просто играю» и нажми «Начать анализ».', en: 'One exe file, no installer. Choose “I stream” or “I just play” and press “Start analysis”.' },
    'how.2.title': { ru: 'Сыграй матч', en: 'Play a match' },
    'how.2.text': { ru: 'Оставь программу в трее. Замер начнётся сам с запуском Deadlock и закончится, когда игра закроется.', en: 'Leave the app in the tray. Measuring starts with Deadlock and stops when the game closes.' },
    'how.3.title': { ru: 'Прочитай вывод', en: 'Read the verdict' },
    'how.3.text': { ru: 'Что ограничивало FPS и список действий по убыванию пользы. Измени что-нибудь, сыграй ещё и сравни.', en: 'What limited FPS and the actions, most useful first. Change something, play again and compare.' },
    'screens.label': { ru: 'Экраны программы', en: 'Screens of the app' },
    'screen.start': { ru: 'Старт', en: 'Start' },
    'screen.scan': { ru: 'Проверка', en: 'Check' },
    'screen.result': { ru: 'Вывод', en: 'Verdict' },
    'screen.start.alt': { ru: 'Стартовый экран программы: название и кнопка «Начать анализ», которая разрывает линию света.', en: 'The start screen of the app: its name and a start button that breaks a line of light.' },
    'screen.scan.alt': { ru: 'Проверка компьютера: линия проходит через области проверки, от железа и питания до замера матча.', en: 'The computer check: the line runs through the areas being checked, from hardware and power to the match session.' },
    'screen.result.alt': { ru: 'Экран с выводом «FPS упирается в видеокарту»: полоса «Что ограничивало FPS», показания замера и три карточки «Что теперь», среди них «Сделать за меня: 3 настройки Windows».', en: 'The verdict screen, saying that FPS is limited by the GPU: the “What limited FPS” bar, session readings and three “What now” cards, among them “Do it for me: 3 Windows settings”.' },
    'screen.caption': { ru: 'Экраны настоящей программы. Данные на них от компьютера-примера.', en: 'Screens of the real app. The data on them comes from a sample computer.' },

    // what it checks
    'checks.title': { ru: 'Что проверяет', en: 'What it checks' },
    'checks.lead': { ru: 'Каждый совет привязан к замеру или к настройке, найденной на этом компьютере. Общих твиков нет.', en: 'Every piece of advice is tied to a session or a setting found on this computer. No generic tweaks.' },
    'checks.who': { ru: 'Выберешь «Просто играю» — OBS и стрим не проверяются вообще.', en: 'Choose “I just play” and OBS and streaming are not checked at all.' },
    'check.1.title': { ru: 'Замер матча', en: 'Match session' },
    'check.1.text': { ru: 'Раз в секунду, пока идёт игра: что ограничивало FPS и кто мешал игре.', en: 'Once a second while you play: what limited FPS and what got in the game’s way.' },
    'check.2.title': { ru: 'Настройки Windows для игр', en: 'Windows settings for games' },
    'check.2.text': { ru: 'Игровой режим, фоновая запись игр, оптимизация оконных игр, видеокарта для Deadlock, план питания, частота монитора.', en: 'Game Mode, background game recording, optimizations for windowed games, the GPU for Deadlock, the power plan, the monitor refresh rate.' },
    'check.3.title': { ru: 'Режим ноутбука', en: 'Laptop performance mode' },
    'check.3.text': { ru: 'Работает ли ноутбук в полную силу: режим производительности, питание от сети, реальная частота процессора.', en: 'Whether the laptop runs at full power: its performance mode, mains power, the real CPU frequency.' },
    'check.4.title': { ru: 'Автозагрузка и фон', en: 'Startup and background apps' },
    'check.4.text': { ru: 'Что запускается вместе с Windows, что работает сейчас и кто занимал процессор и видеокарту во время матча.', en: 'What starts with Windows, what is running now, and what used the CPU and GPU during the match.' },
    'check.5.title': { ru: 'Конфиг Deadlock', en: 'Deadlock config' },
    'check.5.text': { ru: 'Настройки видео, лимиты FPS, параметры запуска, моды. Раздел «Настройка конфига» объясняет, на что влияет каждая настройка игры, и даёт готовые наборы.', en: 'Video settings, FPS limits, launch options, mods. The config tuner explains what each game setting affects and offers ready sets.' },
    'check.6.title': { ru: 'OBS, если ты стримишь', en: 'OBS, if you stream' },
    'check.6.text': { ru: 'Кодировщик, битрейт, разрешение. По журналу прошлых трансляций: потерянные кадры и их причина, будь то сеть, отрисовка или кодирование.', en: 'The encoder, bitrate and resolution. From the logs of past streams: dropped frames and their cause, be it the network, rendering or encoding.' },
    'check.7.title': { ru: 'Сеть', en: 'Network' },
    'check.7.text': { ru: 'Задержка и потери до роутера и до интернета. Для Wi-Fi ещё диапазон и уровень сигнала. Если стримишь, ещё связь с сервером трансляции.', en: 'Ping and packet loss to the router and to the internet. For Wi-Fi also the band and signal strength. If you stream, also the connection to the stream server.' },

    // safety and privacy
    'safety.title': { ru: 'Безопасность и приватность', en: 'Safety and privacy' },
    'safety.1.title': { ru: 'Не трогает процесс игры', en: 'It does not touch the game process' },
    'safety.1.text': { ru: 'Программа не внедряется в процесс игры и не изменяет его. Данные она берёт у Windows: счётчики производительности, список процессов, драйвер видеокарты и журналы событий. Настройки Deadlock и OBS читает из их файлов.', en: 'The app does not inject into the game process and does not modify it. It takes its data from Windows: performance counters, the process list, the GPU driver and the event logs. Deadlock and OBS settings it reads from their files.' },
    'safety.2.title': { ru: 'Каждое изменение можно вернуть', en: 'Every change can be undone' },
    'safety.2.text': { ru: 'Кроме своих данных, программа меняет на компьютере только две вещи, и обе по твоей кнопке: настройки Windows твоей учётной записи и свой блок в autoexec.cfg игры. Остальные строки этого файла она не трогает. Сначала видно, что изменится, а вернуть прежнее можно на вкладке «Изменения».', en: 'Besides its own data, the app changes only two things on your computer, both at your click: the Windows settings of your own user account and its own block in the game’s autoexec.cfg. The other lines of that file it leaves alone. You see what will change first, and you can bring the previous values back on the Changes tab.' },
    'safety.3.title': { ru: 'Не ослабляет защиту', en: 'It does not weaken protection' },
    'safety.3.text': { ru: 'Программа никогда не советует выключать антивирус или защиту Windows.', en: 'The app never advises turning off your antivirus or Windows protection.' },
    'safety.4.title': { ru: 'Обезличенные отчёты, по согласию', en: 'Anonymous reports, with your consent' },
    'safety.4.text': { ru: 'Если разрешить (галочка на первом экране, отключается на вкладке «Помощь»), программа после матча сама отправляет нам обезличенный отчёт: железо, настройки, названия программ из автозагрузки и запущенных, находки, сводку замера. Так советы правятся по настоящим компьютерам. Посмотреть содержимое можно в программе; имя пользователя, ключи и адреса в отчёт не попадают. Автор может написать тебе в программу, но не знает, кто ты, и отвечать не обязательно.', en: 'If you allow it (a box on the first screen, switched off on the Help tab), the app sends us an anonymous report by itself after a match: hardware, settings, names of startup and running apps, findings, the session summary. That is how the advice gets corrected on real computers. You can view the contents in the app; the user name, keys and addresses do not go into a report. The author can write to you in the app without knowing who you are, and you do not have to answer.' },

    // help and the report
    'support.title': { ru: 'Если советы не помогли', en: 'If the advice did not help' },
    'support.text': { ru: 'Опиши проблему на вкладке «Помощь» и отправь отчёт из программы. Ответим там же.', en: 'Describe the problem on the Help tab and send a report from the app. We answer right there.' },
    'contrib.title': { ru: 'Советы учатся на настоящих компьютерах', en: 'The advice learns from real computers' },
    'contrib.text': { ru: 'Если разрешить обезличенные отчёты, замеры с твоего компьютера уточняют пороги и советы. Без ников и ключей; выключается одной галочкой.', en: 'If you allow anonymous reports, your sessions refine the thresholds and the advice. No names or keys; switched off with one box.' },
    'support.waiting': { ru: 'ждёт ответа', en: 'waiting for a reply' },
    'support.answered': { ru: 'есть ответ', en: 'answered' },
    'support.live': { ru: 'Задать вопрос можно и на стриме:', en: 'You can also ask on a stream:' },
    'support.live.link': { ru: '{author} на Twitch', en: '{author} on Twitch' },
    'report.title': { ru: 'Отчёт можно посмотреть целиком до отправки', en: 'You can view the whole report before sending it' },
    'report.in.title': { ru: 'В отчёте', en: 'In the report' },
    'report.in.1': { ru: 'железо', en: 'hardware' },
    'report.in.2': { ru: 'настройки Windows, Deadlock и OBS', en: 'Windows, Deadlock and OBS settings' },
    'report.in.3': { ru: 'находки программы', en: 'the app’s findings' },
    'report.in.4': { ru: 'замеры', en: 'sessions' },
    'report.in.5': { ru: 'названия программ из автозагрузки и запущенных', en: 'names of startup and running apps' },
    'report.out.title': { ru: 'Никогда не попадает в отчёт', en: 'Never goes into a report' },
    'report.out.1': { ru: 'имя пользователя', en: 'user name' },
    'report.out.2': { ru: 'имя компьютера', en: 'PC name' },
    'report.out.3': { ru: 'ключ трансляции', en: 'stream key' },
    'report.out.4': { ru: 'токены', en: 'tokens' },
    'report.out.5': { ru: 'названия сетей Wi-Fi', en: 'Wi-Fi network names' },
    'report.out.6': { ru: 'адреса сетей и источников OBS', en: 'network and OBS source addresses' },

    // requirements, and what is not ready
    'req.title': { ru: 'Что нужно', en: 'What you need' },
    'req.os.k': { ru: 'Система', en: 'System' },
    'req.os.v': { ru: 'Windows 10 или 11', en: 'Windows 10 or 11' },
    'req.install.k': { ru: 'Установка', en: 'Installation' },
    'req.install.v': { ru: 'Не нужна. Один exe-файл, ставить ничего не надо.', en: 'None. One exe file, nothing else to install.' },
    'req.game.k': { ru: 'Игра', en: 'Game' },
    'req.game.v': { ru: 'Deadlock в библиотеке Steam', en: 'Deadlock in your Steam library' },
    'req.obs.k': { ru: 'OBS Studio', en: 'OBS Studio' },
    'req.obs.v': { ru: 'Нужен, только если ты стримишь. Выберешь «Просто играю», и OBS со стримом не проверяются вообще.', en: 'Needed only if you stream. Choose “I just play” and OBS and streaming are not checked at all.' },
    'req.admin.k': { ru: 'Права администратора', en: 'Administrator rights' },
    'req.admin.v': { ru: 'Не нужны. Их просит только экспериментальный точный FPS.', en: 'Not needed. Only the experimental exact FPS asks for them.' },
    'req.lang.k': { ru: 'Язык', en: 'Language' },
    'req.lang.v': { ru: 'Русский и английский', en: 'Russian and English' },
    'req.update.k': { ru: 'Обновления', en: 'Updates' },
    'req.update.v': { ru: 'Программа сама находит новую версию на GitHub, проверяет подпись автора и ставит её при следующем запуске. О компьютере при этом ничего не передаёт. Это можно выключить.', en: 'The app finds a new release on GitHub by itself, checks the author’s signature and installs it the next time it starts. It sends nothing about your computer while doing so. You can turn this off.' },
    'req.price.k': { ru: 'Цена', en: 'Price' },
    'req.price.v': { ru: 'Бесплатно', en: 'Free' },
    'status.title': { ru: 'Что пока не проверено', en: 'What is not checked yet' },
    'status.version': { ru: 'версия {version}', en: 'version {version}' },
    'status.1': { ru: 'Вывод сверен на одном настоящем матче и одном ноутбуке: на другом железе он может ошибаться.', en: 'The verdict has been checked on one real match and one laptop: on other hardware it may be wrong.' },
    'status.2': { ru: 'Без экспериментального счётчика программа не показывает сам FPS: вывод идёт по загрузке процессора и видеокарты. Счётчику нужны права администратора.', en: 'Without the experimental counter the app shows no FPS figure: the verdict comes from CPU and GPU load. The counter needs administrator rights.' },
    'status.more': { ru: 'Полный список на GitHub', en: 'Full list on GitHub' },
    'status.more.href': { ru: 'https://github.com/aliveenjoyer/deadlock-optimizer#что-ещё-не-проверено', en: 'https://github.com/aliveenjoyer/deadlock-optimizer#not-checked-yet' },
    'status.3': { ru: 'Режим ноутбука определяется только у ASUS, температура процессора не читается.', en: 'The laptop performance mode is detected only on ASUS, and the CPU temperature is not read.' },

    // questions
    'faq.title': { ru: 'Вопросы', en: 'Questions' },
    'faq.0.q': { ru: 'Почему бесплатно?', en: 'Why is it free?' },
    'faq.0.a': { ru: 'Программу сделал стример Deadlock для себя и своих зрителей. В ней нет рекламы, аккаунтов, подписок и платных функций. Единственное, о чём она просит, — разрешить обезличенные отчёты, чтобы советы становились точнее; без этого разрешения она работает так же.', en: 'A Deadlock streamer made the app for their own stream and viewers. It has no ads, no accounts, no subscriptions and no paid features. The only thing it asks is permission to send anonymous reports so the advice gets more accurate; without that permission it works just the same.' },
    'faq.6.q': { ru: 'Чем это отличается от «оптимизаторов»?', en: 'How is this different from “optimizers”?' },
    'faq.6.a': { ru: 'Общих твиков здесь нет: ни «ускорителей» реестра, ни отключения служб, ни обещаний в процентах. Каждый совет привязан к тому, что измерено на твоём компьютере или найдено в твоих настройках, с цифрами и уровнем уверенности. Если всё в порядке, программа так и скажет.', en: 'There are no generic tweaks here: no registry “boosters”, no disabling of services, no promises in percent. Every piece of advice is tied to what was measured on your computer or found in your settings, with numbers and a confidence level. If everything is fine, the app says so.' },
    'faq.7.q': { ru: 'Windows предупреждает о файле. Это нормально?', en: 'Windows warns about the file. Is that normal?' },
    'faq.7.a': { ru: 'Да. У этой сборки нет платной подписи издателя, а SmartScreen предупреждает о таких файлах, пока их мало кто скачивал. О вирусах это ничего не говорит, ни в плюс, ни в минус, поэтому файл стоит проверить самому. Его контрольная сумма SHA-256: {sha}. Обновления программа ставит, только если они подписаны ключом автора.', en: 'Yes. This build has no paid publisher signature, and SmartScreen warns about such files until many people have downloaded them. That says nothing about viruses, either way, so it is worth checking the file yourself. Its SHA-256 checksum: {sha}. The app installs updates only if they are signed with the author’s key.' },
    'faq.1.q': { ru: 'Она сама поднимет мне FPS?', en: 'Will it raise my FPS by itself?' },
    'faq.1.a': { ru: 'Нет. Программа показывает, что ограничивает FPS, и говорит, что изменить. Часть настроек она переключает по твоей кнопке, остальное ты делаешь сам по шагам. Будет ли прирост и какой, зависит от компьютера, и цифр мы не обещаем.', en: 'No. The app shows what limits your FPS and tells you what to change. Some settings it switches at your click; the rest you do yourself, following the steps. Whether it helps, and by how much, depends on your PC, and we promise no numbers.' },
    'faq.2.q': { ru: 'Я не стримлю. Программа мне подойдёт?', en: 'I do not stream. Is the app for me?' },
    'faq.2.a': { ru: 'Да. На первом экране выбери «Просто играю»: программа проверит компьютер, игру и сеть, а OBS и стрим проверять не будет. Выбор можно поменять позже.', en: 'Yes. Choose “I just play” on the first screen: the app checks the computer, the game and the network, and does not check OBS or streaming. You can change the choice later.' },
    'faq.3.q': { ru: 'Что с античитом?', en: 'What about anti-cheat?' },
    'faq.3.a': { ru: 'Скажем только то, что можно проверить. Программа не внедряется в процесс игры и не изменяет его: она читает счётчики производительности Windows и файлы настроек. Единственный файл игры, в который она пишет, это autoexec.cfg: только свой блок и только по твоей кнопке. Это описание того, как она устроена, а не гарантия: программа не связана с Valve.', en: 'We will say only what can be checked. The app does not inject into the game process and does not modify it: it reads Windows performance counters and settings files. The only game file it writes to is autoexec.cfg: only its own block, and only when you press Apply. That describes how it is built; it is not a guarantee: the app is not affiliated with Valve.' },
    'faq.4.q': { ru: 'Замер сам не отнимет FPS?', en: 'Will measuring itself cost me FPS?' },
    'faq.4.a': { ru: 'Замер лёгкий. На ноутбуке с i5-12450H за четыре часа игры программа заняла в среднем 0,5% одного ядра. Это один компьютер, на других цифра может отличаться. Окно программы во время матча не нужно, она сидит в трее.', en: 'Measuring is light. On a laptop with an i5-12450H, over four hours of play the app took 0.5% of one core on average. That is one computer; on others the figure may differ. You do not need the app window during a match; the app sits in the tray.' },
    'faq.5.q': { ru: 'Что именно меняет кнопка «Применить»?', en: 'What exactly does the Apply button change?' },
    'faq.5.a': { ru: 'В «Обзоре»: настройки Windows твоей учётной записи, например игровой режим, фоновую запись игр, видеокарту для Deadlock, автозагрузку. В «Настройке конфига»: свой блок команд в autoexec.cfg игры, остальные строки файла остаются как были. И то, и другое можно вернуть на вкладке «Изменения». Настройки видео игры программа не меняет: для них она даёт список для меню игры.', en: 'On the Overview tab: Windows settings of your own user account, for example Game Mode, background game recording, the GPU for Deadlock, startup apps. In the config tuner: its own block of commands in the game’s autoexec.cfg; the other lines of the file stay as they were. Both can be undone on the Changes tab. The app does not change the game’s video settings: for those it gives you a list for the game menu.' },

    // the last word and the footer
    'final.title': { ru: 'Один матч до вывода', en: 'One match to the verdict' },
    'final.sub': { ru: 'Запусти перед матчем. К его концу будет вывод.', en: 'Run it before a match. By the end you will have the verdict.' },
    'footer.disclaimer': { ru: 'Программа сделана игроками и не связана с Valve. Deadlock является товарным знаком Valve Corporation.', en: 'This app is made by players and is not affiliated with Valve. Deadlock is a trademark of Valve Corporation.' },
    'footer.author': { ru: 'Сделал {author}, стример Deadlock', en: 'Made by {author}, a Deadlock streamer' },
    'footer.font': { ru: 'Шрифт Sofia Sans, лицензия SIL OFL 1.1', en: 'Typeface: Sofia Sans, SIL OFL 1.1' },
    'footer.contact': { ru: 'Связаться', en: 'Contact' }
  };

  // ---------- plumbing ----------
  var LANGS = ['ru', 'en'];
  var STORE_KEY = 'dlo-landing-lang';
  var root = document.documentElement;
  var lang = 'en';
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var tour = [];                                    // timers of the one walk through the screens
  var markCase = null, markScreen = null;

  root.classList.add('js');                         // from here on the hero waits for its texts (see landing.css)

  function $(id) { return document.getElementById(id); }
  function all(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }

  // Small typography: a number stays with its unit, a short first half stays with its word (Wi-Fi, exe-файл),
  // and no line may end on a one- or two-letter Russian word. The two invisible characters are made from their
  // codes, so that none of them has to be typed into this file.
  var NBSP = String.fromCharCode(160);              // no-break space
  var JOINER = String.fromCharCode(8288);           // word joiner: the line may not break at this place
  var SHORT_WORD = new RegExp('(^|[ ' + NBSP + '(«])([А-Яа-яЁё]{1,2}) (?=\\S)', 'g');
  function tidy(s) {
    s = s.replace(/(\d) (?=(?:мс|МБ|ms|MB)(?![A-Za-zА-Яа-яЁё]))/g, '$1' + NBSP).replace(/Windows (?=\d)/g, 'Windows' + NBSP);
    s = s.replace(/(^|[^A-Za-zА-Яа-яЁё])([A-Za-zА-Яа-яЁё]{1,3})-(?=[A-Za-zА-Яа-яЁё])/g, '$1$2-' + JOINER);
    if (lang === 'ru') s = s.replace(SHORT_WORD, '$1$2' + NBSP).replace(SHORT_WORD, '$1$2' + NBSP);   // twice: two short words can stand in a row
    return s;
  }

  // the text as written, for the tab title, the description and attributes: nothing there wraps
  function plain(key) {
    var entry = TEXT[key];
    if (!entry || entry[lang] == null) { if (window.console) console.warn('No text for "' + key + '" in ' + lang); return key; }
    return entry[lang].replace('{name}', APP_NAME).replace('{version}', APP_VERSION).replace('{author}', AUTHOR_NAME).replace('{sha}', EXE_SHA256);
  }
  // the text for the page, with its small typography
  function t(key) { return tidy(plain(key)); }

  // ru for Russian, Belarusian and Kazakh browsers, en for everyone else; a choice made on the page wins.
  function pickLang() {
    var asked = /[?&]lang=(ru|en)(?:&|$)/.exec(location.search);
    if (asked) return asked[1];
    try {
      var kept = window.localStorage.getItem(STORE_KEY);
      if (LANGS.indexOf(kept) >= 0) return kept;
    } catch (e) { /* storage is closed: fall through to the browser language */ }
    var browser = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return /^(ru|be|kk)(-|$)/i.test(browser) ? 'ru' : 'en';
  }

  function setLang(next, remember) {
    lang = LANGS.indexOf(next) >= 0 ? next : 'en';
    if (remember) { try { window.localStorage.setItem(STORE_KEY, lang); } catch (e) { /* the choice lasts for this visit only */ } }
    root.lang = lang;
    document.title = plain('meta.title');
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', plain('hero.sub'));
    all('[data-app-name]').forEach(function (el) { el.textContent = APP_NAME; });
    all('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')); });
    all('[data-t-attr]').forEach(function (el) {
      el.getAttribute('data-t-attr').split(';').forEach(function (pair) {
        var at = pair.indexOf(':');
        el.setAttribute(pair.slice(0, at), plain(pair.slice(at + 1)));
      });
    });
    all('.lang-btn').forEach(function (btn) { btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    all('[data-screen] img').forEach(function (img) {
      var name = img.parentNode.getAttribute('data-screen');
      var src = (SCREENS[lang] && SCREENS[lang][name]) || SCREENS.ru[name];
      if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
    });
    setDownload();
    setAuthor();
    setProof();
    labelBar();
    fitTitle();
    loadFonts().then(fitTitle, fitTitle);           // the other language may bring its own letters: measure again
  }

  // ---------- how to check the file: each link is shown only when it leads somewhere ----------
  function setProof() {
    var targets = {
      vt: VIRUSTOTAL_READY && EXE_SHA256 ? 'https://www.virustotal.com/gui/file/' + EXE_SHA256 : '',
      github: GITHUB_URL ? GITHUB_URL + '/releases/latest' : '',
      source: SOURCE_URL
    };
    all('[data-proof]').forEach(function (a) {
      var url = targets[a.getAttribute('data-proof')];
      a.hidden = !url;
      if (url) a.setAttribute('href', url);
    });
  }

  // ---------- the author's lines: a plain link that opens in a new tab; without an address they are not shown ----------
  function setAuthor() {
    var shown = !!(AUTHOR_URL && AUTHOR_NAME);
    all('[data-author]').forEach(function (el) { el.hidden = !shown; });
    all('[data-author-link]').forEach(function (a) {
      if (!shown) { a.removeAttribute('href'); return; }
      a.setAttribute('href', AUTHOR_URL);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  // The typeface files this language needs. Resolves when they are in, or at once where there is nothing to ask.
  function loadFonts() {
    var fonts = document.fonts;
    if (!fonts || !fonts.load || !window.Promise) return { then: function (done) { done(); } };
    return Promise.all([fonts.load('200 80px "Sofia Sans"', t('hero.title')), fonts.load('500 16px "Sofia Sans"', t('cta.label'))]);
  }

  // ---------- the download button ----------
  function setDownload() {
    var ready = !!DOWNLOAD_URL;
    all('[data-download]').forEach(function (a) {
      a.setAttribute('href', ready ? DOWNLOAD_URL : '#');
      a.classList.toggle('is-soon', !ready);
      if (ready) a.removeAttribute('aria-disabled'); else a.setAttribute('aria-disabled', 'true');
    });
    all('[data-soon]').forEach(function (el) { el.hidden = ready; });
    all('[data-download-note]').forEach(function (el) { el.textContent = t(ready ? 'cta.note.ready' : 'cta.note.soon'); });
  }

  // a click on the placeholder goes nowhere; the note beside it lights up for a moment to say why
  function onDownloadClick(event) {
    if (DOWNLOAD_URL) return;
    event.preventDefault();
    var note = $(event.currentTarget.getAttribute('aria-describedby'));
    if (!note) return;
    note.classList.add('is-nudged');
    setTimeout(function () { note.classList.remove('is-nudged'); }, 1400);
  }

  // ---------- the headline: its box is fitted to its letters, so the light that writes it runs over them only ----------
  function fitTitle() {
    var box = $('heroTitle'), text = $('heroTitleText');
    if (!box || !text || !document.createRange) return;
    box.style.width = '';
    var range = document.createRange();
    range.selectNodeContents(text);
    var width = range.getBoundingClientRect().width;
    if (width > 0) box.style.width = Math.ceil(width) + 2 + 'px';
  }

  // ---------- tabs: arrows move, the chosen one is the only tab stop ----------
  function tabs(list, select) {
    var items = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function go(index, focus) {
      var tab = items[(index + items.length) % items.length];
      select(tab.getAttribute('data-value'));
      if (focus) tab.focus();
    }
    list.addEventListener('click', function (event) {
      var tab = event.target.closest ? event.target.closest('[role="tab"]') : null;
      if (tab) go(items.indexOf(tab), false);
    });
    list.addEventListener('keydown', function (event) {
      var index = items.indexOf(document.activeElement);
      if (index < 0) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') go(index + 1, true);
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') go(index - 1, true);
      else if (event.key === 'Home') go(0, true);
      else if (event.key === 'End') go(items.length - 1, true);
      else return;
      event.preventDefault();
    });
    return function mark(value) {
      items.forEach(function (tab) {
        var on = tab.getAttribute('data-value') === value;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
      });
    };
  }

  // ---------- the example verdict ----------
  var shownCase = 'cpuThread';
  function labelBar() { var bar = $('limitbar'); if (bar) bar.setAttribute('aria-label', plain('case.' + shownCase + '.bar')); }
  function showCase(name) {
    if (!CASES[name]) return;
    shownCase = name;
    var parts = CASES[name];
    if (markCase) markCase(name);
    all('.verdict').forEach(function (panel) { panel.classList.toggle('is-on', panel.getAttribute('data-case') === name); });
    all('#limitbar .seg').forEach(function (seg) {
      var share = parts[seg.getAttribute('data-seg')] || 0;
      seg.style.setProperty('--g', share);
      seg.classList.toggle('is-zero', !share);
    });
    all('#legend li').forEach(function (item) { item.classList.toggle('is-zero', !parts[item.getAttribute('data-seg')]); });
    labelBar();
  }

  // the scale over the bar: a tick every tenth, numbers at the ends and in the middle
  function buildScale() {
    var scale = $('limitScale');
    if (!scale) return;
    for (var i = 0; i <= 10; i++) {
      var tick = document.createElement('i');
      tick.className = 'tick' + (i % 5 === 0 ? ' is-major' : '');
      tick.style.left = i === 10 ? 'calc(100% - 1px)' : i * 10 + '%';
      scale.appendChild(tick);
      if (i % 5 === 0) {
        var label = document.createElement('span');
        label.className = 'tick-label' + (i === 0 ? ' is-first' : i === 10 ? ' is-last' : '');
        label.textContent = i === 10 ? '100%' : String(i * 10);
        label.style.left = i * 10 + '%';
        scale.appendChild(label);
      }
    }
  }

  // ---------- the screens of the app ----------
  function showScreen(name) {
    if (markScreen) markScreen(name);
    all('.screen').forEach(function (screen) { screen.classList.toggle('is-on', screen.getAttribute('data-screen') === name); });
  }
  function stopTour() { tour.forEach(clearTimeout); tour.length = 0; }
  // The one thing that moves on scroll: when the frame comes into view, the screens are shown once in the
  // order of the app (start, check, verdict). Any touch of the tabs stops it. With reduced motion the verdict
  // is simply shown.
  function armTour() {
    var frame = $('frame');
    if (!frame) return;
    if (reduced || !('IntersectionObserver' in window)) { showScreen('result'); return; }
    var watch = new IntersectionObserver(function (entries) {
      var seen = entries[entries.length - 1];
      // most of the frame is in view, or the frame fills most of a short window
      var enough = seen.intersectionRatio >= 0.6 || (seen.rootBounds && seen.intersectionRect.height >= seen.rootBounds.height * 0.6);
      if (!seen.isIntersecting || !enough) return;
      watch.disconnect();
      tour.push(setTimeout(function () { showScreen('scan'); }, 1100));
      tour.push(setTimeout(function () { showScreen('result'); }, 2900));
    }, { threshold: [0.2, 0.4, 0.6, 0.8] });
    watch.observe(frame);
  }

  // ---------- start ----------
  function open() {
    fitTitle();
    root.classList.add('is-ready');
    if (!reduced) {
      root.classList.add('is-intro');
      setTimeout(function () { root.classList.remove('is-intro'); }, 2400);
    }
    armTour();
  }

  function boot() {
    buildScale();
    markCase = tabs($('picks'), showCase);
    markScreen = tabs($('screenTabs'), function (name) { stopTour(); showScreen(name); });
    all('.lang-btn').forEach(function (btn) { btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang'), true); }); });
    all('[data-download]').forEach(function (a) { a.addEventListener('click', onDownloadClick); });
    setLang(pickLang(), false);
    showCase(shownCase);

    var frameAsked = 0;
    window.addEventListener('resize', function () {
      cancelAnimationFrame(frameAsked);
      frameAsked = requestAnimationFrame(fitTitle);
    });

    // wait for the typeface, so the headline is measured with its real letters; never wait long
    var opened = false;
    function once() { if (!opened) { opened = true; open(); } }
    loadFonts().then(once, once);
    setTimeout(once, 1200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
