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

## О проекте

Ранняя версия. Пороги выводов ещё уточняются на реальных матчах, точный счётчик FPS помечен в программе как экспериментальный.

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

## About

An early version. The thresholds behind the verdicts are still being tuned on real matches, and the exact FPS counter is marked as experimental in the app.

A fan-made tool, not affiliated with Valve. Deadlock is a trademark of Valve Corporation. This repository holds ready builds.
