# Deadlock Optimizer

Программа для игроков и стримеров Deadlock: измеряет компьютер во время матча, показывает, во что упирается FPS, и говорит, что исправить.

**[Скачать последнюю версию](https://github.com/aliveenjoyer/deadlock-optimizer/releases/latest/download/DeadlockOptimizer.exe)**

*English is below.*

## Что это

- Раз в секунду, пока идёт матч, записывает, чем заняты процессор и видеокарта, самый занятый поток игры, частоту процессора, температуру видеокарты, память, пинг и потери сети.
- После матча говорит, что ограничивало FPS: один поток процессора, все ядра, видеокарта или ничего из этого, и даёт список исправлений по убыванию пользы.
- Проверяет настройки Windows для игр, режим ноутбука, автозагрузку и фоновые программы, конфиг Deadlock, кодировщик и потери кадров в OBS, сеть.
- Часть исправлений делается одной кнопкой и так же возвращается: это только настройки Windows для твоей учётной записи.
- «Настройка конфига»: про каждую настройку игры сказано, на что она влияет. Консольные переменные программа сама записывает в `autoexec.cfg` и умеет вернуть как было; настройки видео она не трогает, а даёт список для меню игры.
- Если советы не помогли, из программы можно отправить отчёт в поддержку и получить ответ там же. Отчёт показывается целиком до отправки; имени пользователя, ключа трансляции, названий сетей и адресов в нём нет.
- В игру программа не вмешивается: читает счётчики Windows и файлы настроек.
- Интерфейс на русском и английском.

Программа не обещает поднять FPS сама по себе. Она показывает, что его ограничивает, и что с этим можно сделать.

## Как поставить

1. Скачай `DeadlockOptimizer.exe` по ссылке выше и положи в любую папку. Установщика нет.
2. Запусти. Если Windows покажет синее окно, нажми «Подробнее», потом «Выполнить в любом случае»: так бывает со всеми программами без платной подписи.
3. Нажми «Начать анализ», потом сыграй матч: запись начнётся и закончится сама.

Нужны Windows 10 или 11. Данные программы лежат в `%LOCALAPPDATA%\DeadlockOptimizer`.

## Обновления

Программа обновляется сама: находит здесь новый выпуск, скачивает его и ставит при следующем запуске (или сразу, по кнопке). Обновление ставится, только если оно подписано ключом автора и совпало с контрольной суммой. Выключается в окне «Обновления»: нажми на номер версии внизу слева.

Файлы `DeadlockOptimizer.exe.sha256` и `DeadlockOptimizer.exe.sig` в выпусках нужны для этой проверки, руками их качать не надо.

## Обезличенные отчёты

Если разрешить (галочка на первом экране, выключатель на вкладке «Помощь»), программа сама отправляет отчёт на наш сервер после каждого замеренного матча и раз в неделю после проверки. По ним уточняются пороги и советы.

В отчёте: железо, настройки Windows, Deadlock и OBS, названия программ из автозагрузки и запущенных во время проверки и матча с их нагрузкой, находки программы, сводка и показания замера, случайный номер установки. В отчёт не попадают: имя пользователя и пути с ним, ключ трансляции, токены, названия сетей Wi-Fi, IP-адреса, серийные номера. Содержимое можно посмотреть кнопкой «Посмотреть, что уходит». Без этого разрешения программа работает так же.

Пока отчёты разрешены, программа раз в 15 минут (кроме времени матча) спрашивает у сервера, не написал ли автор. Сообщение появляется на вкладке «Помощь». Автор пишет на номер установки и не знает, кто ты; отвечать не обязательно.

## Что ещё не проверено

- Вывод сверен на одном настоящем матче и одном ноутбуке. На другом железе пороги могут промахиваться: для их уточнения и нужны отчёты.
- Настольные ПК, видеокарты AMD и Intel, Windows 10 и английская Windows учтены в коде, но вживую не проверялись.
- Без экспериментального счётчика программа не показывает сам FPS: вывод идёт по загрузке процессора и видеокарты. Счётчику нужны права администратора. На настоящем матче он работал пока на одном компьютере.
- На процессорах Intel с двумя типами ядер показанная частота завышена: на i5-12450H программа показала 5,2 ГГц при потолке 4,4.
- Настройка конфига проверена на тестовой папке игры. В самой игре её блок в `autoexec.cfg` ещё не запускался.
- Режим ноутбука программа определяет сама только у ASUS. Для других марок она даёт инструкцию и судит по измеренной частоте процессора.
- Температуру процессора программа не читает: без прав администратора Windows её не отдаёт. Перегрев виден косвенно, по падению частоты.
- Цена замера в настоящей игре снята пока на одном компьютере: в среднем 0,5% одного ядра за четыре часа.
- Потери до интернета меряются пингом до одного адреса (1.1.1.1). Такой сервер может отбрасывать пинг сам, поэтому находка «пакеты теряются у провайдера» может срабатывать зря: это ещё проверяется.

## О проекте

Ранняя версия.

Фанатская программа, к Valve отношения не имеет. Deadlock является товарным знаком Valve Corporation. В этом репозитории лежат готовые сборки.

---

# Deadlock Optimizer (English)

A tool for Deadlock players and streamers: it measures the computer during a match, shows what limits FPS, and tells you what to fix.

**[Download the latest version](https://github.com/aliveenjoyer/deadlock-optimizer/releases/latest/download/DeadlockOptimizer.exe)**

## What it does

- Once a second while a match is on, it notes what the CPU and GPU are busy with, the busiest game thread, CPU frequency, GPU temperature, memory, ping and packet loss.
- After the match it says what limited FPS: one CPU thread, all cores, the GPU, or none of these, and lists the fixes, most useful first.
- It checks Windows gaming settings, laptop performance mode, startup and background apps, the Deadlock config, the OBS encoder and dropped frames, and the network.
- Some fixes are one click and can be undone the same way: they are settings of your own Windows account only.
- Config tuner: every game setting comes with a note on what it affects. The app writes console variables into `autoexec.cfg` itself and can undo that; it does not touch video settings and gives a list for the game menu instead.
- If the advice does not help, you can send a report to support from inside the app and get the answer there. The report is shown in full before it is sent; it has no user name, stream key, network names or addresses.
- The app does not touch the game: it reads Windows counters and settings files.
- Interface in English and Russian.

The app does not promise more FPS by itself. It shows what limits FPS and what can be done about it.

## Install

1. Download `DeadlockOptimizer.exe` with the link above and put it in any folder. There is no installer.
2. Run it. If Windows shows a blue window, press "More info", then "Run anyway": this happens with every program that has no paid signature.
3. Press "Start analysis", then play a match: measuring starts and stops by itself.

Windows 10 or 11 is required. The app keeps its data in `%LOCALAPPDATA%\DeadlockOptimizer`.

## Updates

The app updates itself: it finds a new release here, downloads it and installs it at the next start (or at once, with a button). An update is installed only if it is signed with the author's key and matches its checksum. You can turn this off in the Updates window: click the version number at the bottom left.

The files `DeadlockOptimizer.exe.sha256` and `DeadlockOptimizer.exe.sig` in the releases are there for that check; there is no need to download them by hand.

## Anonymous reports

If you allow it (a box on the first screen, a switch on the Help tab), the app sends a report to our server by itself after every measured match and once a week after a check. The thresholds and the advice are refined by them.

In a report: hardware, Windows, Deadlock and OBS settings, the names of startup apps and of apps running during a check or a match with their load, the app's findings, the session summary and readings, a random number of this installation. Not in a report: the user name and paths with it, the stream key, tokens, Wi-Fi network names, IP addresses, serial numbers. You can view the contents with the "See what goes out" button. Without this permission the app works just the same.

While reports are allowed, the app asks the server every 15 minutes (except during a match) whether the author has written. A message appears on the Help tab. The author writes to the installation number and does not know who you are; you do not have to answer.

## Not checked yet

- The verdict has been checked on one real match and one laptop. On other hardware the thresholds may miss: that is what the reports are for.
- Desktop PCs, AMD and Intel GPUs, Windows 10 and English-language Windows are handled in the code but not checked live.
- Without the experimental counter the app shows no FPS figure: the verdict comes from CPU and GPU load. The counter needs administrator rights. It has worked in a real match on one computer so far.
- On Intel CPUs with two kinds of cores the frequency shown is too high: on an i5-12450H the app showed 5.2 GHz against a ceiling of 4.4.
- The config tuner has been tested on a test copy of the game folder. Its block in `autoexec.cfg` has not been run in the game itself.
- The app detects the laptop performance mode by itself only on ASUS. For other brands it gives instructions and judges by the measured CPU frequency.
- The app does not read the CPU temperature: Windows does not give it out without administrator rights. Overheating shows indirectly, through frequency drops.
- The cost of measuring in a real game has been taken on one computer so far: 0.5% of one core on average over four hours.
- Loss to the internet is measured by pinging one address (1.1.1.1). Such a server may drop pings by itself, so the "packets are lost at the provider" finding may fire for nothing: this is still being checked.

## About

An early version.

A fan-made tool, not affiliated with Valve. Deadlock is a trademark of Valve Corporation. This repository holds ready builds.
