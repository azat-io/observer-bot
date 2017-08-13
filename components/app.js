'use strict'

import bot, { keyboard, mainMenu } from './telegram-bot'
import request from 'request'
import twitIt from './twit-it'
import readMD from './read-markdown'
// import api from './api'

import signup from './signup'
import deepLinkHandler from './deep-link'

const fakeTwitterUsername = 'fletcherist'

bot.onText(/^(\/start)$/, msg => {
    bot.sendMessage(msg.chat.id, readMD('start'), keyboard(mainMenu))
})

bot.onText(/^\/start [a-zA-Z0-9]{4,32}$/ig, deepLinkHandler)

bot.onText(/^(Назад)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Главное меню', keyboard(mainMenu))
})

const reportOffense = [['Карусель', 'Вброс'], ['Порча бюллетеней'],
    ['Другое нарушение', 'Назад']]

bot.onText(/^(Сообщить о нарушении)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выбери нарушение из списка',
        keyboard(reportOffense))
})

bot.onText(/^(Другое нарушение)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выбери нарушение из списка',
        keyboard(reportOffense))
})

const carouselOffense = [['Шаблон заявления', 'Отправить фото/видео'],
    ['Получить фото/видео ближайших УИКов'], ['Другое нарушение', 'Назад']]

bot.onText(/^(Карусель)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите действие', keyboard(carouselOffense))
})

const throwInOffense = [['Шаблон заявления', 'Отправить фото/видео'],
    ['За какого кандидата?'], ['Другое нарушение', 'Назад']]

bot.onText(/^(Вброс)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите действие', keyboard(throwInOffense))
})

const candidates = [['Навальный', 'Путин'],
    ['Зюганов', 'Жириновский']]

bot.onText(/^(За какого кандидата\?)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите кандидата', keyboard(candidates))
})

bot.onText(/^(Навальный|Путин|Зюганов|Жириновский)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите действие', keyboard(throwInOffense))
})

const damageBulletinOffense = [['Шаблон заявления', 'Отправить фото/видео'],
    ['Другое нарушение', 'Назад']]

bot.onText(/^(Порча бюллетеней)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите действие',
        keyboard(damageBulletinOffense))
})

bot.on('message', async msg => {
    const { status, message } = signup(msg.from.id, msg.text)
    const sendMessageArguments = [
        msg.from.id,
        message,
        status ? keyboard(mainMenu) : null,
    ].filter(Boolean)
    bot.sendMessage(...sendMessageArguments)
})

const regions = [['Россия'], ['Мой регион']]

bot.onText(/^(Узнать текущие данные)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите регион', keyboard(regions))
})

bot.onText(/^(Россия|Мой регион)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Путин - 0%, Навальный - 100%',
        keyboard(mainMenu))
})

/*
 * Обработка сообщений о нарушениях на выборах
 */
bot.onText(/^(Карусель)$/, msg => {
    twitIt('Обнарушена карусель', fakeTwitterUsername)
    bot.sendMessage(msg.chat.id, 'Текст жалобы на карусель',
        keyboard([['Назад']]))
})

bot.onText(/^(Вброс)$/, msg => {
    twitIt('Зафиксирован вброс', fakeTwitterUsername)
    bot.sendMessage(msg.chat.id, readMD('violations/vbros'),
        keyboard([['Назад']]))
})

bot.onText(/^(Порча бюллетеней)$/, msg => {
    twitIt('Кто-то портит блюллетени', fakeTwitterUsername)
    bot.sendMessage(msg.chat.id, 'Текст жалобы на порчу бюллетеней',
        keyboard([['Назад']]))
})

bot.on('photo', async msg => {
    bot.getFileLink(msg.photo[0].file_id).then(response => {
        request({
            method: 'GET',
            uri: response,
            encoding: 'base64',
        }, (error, response, body) => {
            twitIt('Неизвестное нарушение', fakeTwitterUsername, 168, body)
        })
    })
})
