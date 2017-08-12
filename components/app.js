'use strict'

import bot from './telegram-bot'
import twitIt from './twit-it'
import readMD from './read-markdown'
// import api from './api'

import signup from './signup'

const fakeTwitterUsername = 'fletcherist'
const fakeStationNum = 666

function keyboard (array, withOneTimeKeyboardFlag) {
    return {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            keyboard: array,
            resize_keyboard: true,
            one_time_keyboard: withOneTimeKeyboardFlag === true,
        }),
    }
}

const mainMenu = [['Сообщить о нарушении', 'Узнать текущие данные'],
    ['Тестировать знания'], ['Сообщить о нарушениях до дня выборов']]

bot.onText(/^(\/start)$/, msg => {
    bot.sendMessage(msg.chat.id, readMD('start'),
        keyboard([['Зарегистрироваться']], true))
})

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
    bot.sendMessage(msg.from.id, signup(msg.from.id, msg.text),
        keyboard(mainMenu))
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
    twitIt('Обнарушена карусель', fakeTwitterUsername, fakeStationNum)
    bot.sendMessage(msg.chat.id, 'Текст жалобы на карусель',
        keyboard([['Назад']]))
})

bot.onText(/^(Вброс)$/, msg => {
    twitIt('Зафиксирован вброс', fakeTwitterUsername, fakeStationNum)
    bot.sendMessage(msg.chat.id, readMD('violations/vbros'),
        keyboard([['Назад']]))
})

bot.onText(/^(Порча бюллетеней)$/, msg => {
    twitIt('Кто-то портит блюллетени', fakeTwitterUsername, fakeStationNum)
    bot.sendMessage(msg.chat.id, 'Текст жалобы на порчу бюллетеней',
        keyboard([['Назад']]))
    bot.sendMessage(msg.chat.id, 'Путин - 0%, Навальный - 100%', keyboard(mainMenu))
})
