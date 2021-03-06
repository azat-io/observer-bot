# Телеграм ЦИК

[![Build Status](https://travis-ci.org/azat-io/observer-bot.svg?branch=master)](https://travis-ci.org/azat-io/observer-bot)
[![Coverage Status](https://coveralls.io/repos/github/azat-io/observer-bot/badge.svg?branch=master)](https://coveralls.io/github/azat-io/observer-bot?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/azat-io/observer-bot.svg)](https://gemnasium.com/github.com/azat-io/observer-bot)
[![gitHub issues](https://img.shields.io/github/issues-raw/azat-io/observer-bot.svg)](https://github.com/azat-io/observer-bot)
[![github pull requests](https://img.shields.io/github/issues-pr-raw/azat-io/observer-bot.svg)](https://github.com/azat-io/observer-bot)

<img src="https://user-images.githubusercontent.com/5698350/29092357-bda5b6ce-7c8e-11e7-8a58-4e9525f0654a.png" alt="Бот Наблюдатель" align="right"/>

Исходный код проекта "Телеграм ЦИК"

Идея проекта заключается в разработке Telegram бота, который будет коммуницировать с наблюдателями на избирательных участках в день выборов. Посредством бота волонтёры будут отправлять информацию о характере нарушений в в ходе голосования, явку избирателей, а также итоги. Одновременно эта информация будет шариться в социальные сети

Основной целью проекта является сбор, анализ и распространение информации о ходе и результатах голосования на выборах 2018 г.

## Установка

Для успешного запуска проекта настоятельно рекомендуется иметь предустановленные на локальной машине [Node.js](https://nodejs.org) версии 7 и выше и пакетный менеджер [Yarn](https://yarnpkg.com)

Перед началом установки для дальнейшего начала работы над проектом необходимо сделать форк данного репозитория и клонировать его, после чего перейти в директорию проекта:

```
$ git clone git@github.com:YOUR_GITHUB_USERNAME/observer-bot.git
$ cd ./observer-bot
```

Установку рекомендуется осуществлять с помощью утилиты [make](https://ru.wikipedia.org/wiki/Make):

`$ make install`

## Механизм аутентификации наблюдателя

Для того, чтобы наблюдатель мог быть уникально идентифицирован, предлагается использовать авторизационные токены. У нас есть **N** штук уникальных ссылок вида `https://t.me/ObserverBot?start=9d547607fc`. При email-рассылке на наблюдателей можно каждому из них отдать такую ссылку — при переходе в бота их телеграм аккаунт привяжется к этому токену. Это также значит, что другой пользователь авторизоваться по этой же ссылке уже не сможет. **Авторизованные** наблюдатели получают доступ к полной функциональности ботика.

## Пользовательский сценарий

<img height="400" src="http://i.imgur.com/qyzeZ9N.jpg" />

## Лицензия

MIT
