'use strict'

import bot from './telegram-bot'
import readMD from './read-markdown'

function keyboard (array) {
    return {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            keyboard: array,
            resize_keyboard: true,
        })
    }
}

const mainMenu = [['Сообщить о нарушении', 'Узнать текущие данные'],
                ['Тестировать знания'], ['Сообщить о нарушениях до дня выборов']]

bot.onText(/^(\/start)$/, msg => {
    bot.sendMessage(msg.chat.id, readMD('start'), keyboard(mainMenu))
})

bot.onText(/^(Назад)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Главное меню', keyboard(mainMenu))
})

const reportOffense = [['Карусель', 'Вброс'], ['Порча бюллетеней'],
                ['Другое нарушение', 'Назад']]

bot.onText(/^(Сообщить о нарушении)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выбери нарушение из списка', keyboard(reportOffense))
})

bot.onText(/^(Другое нарушение)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выбери нарушение из списка', keyboard(reportOffense))
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
    bot.sendMessage(msg.chat.id, 'Выберите действие', keyboard(damageBulletinOffense))
})


const regions = [['Россия'], ['Мой регион']]

bot.onText(/^(Узнать текущие данные)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите регион', keyboard(regions))
})

bot.onText(/^(Россия|Мой регион)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Путин - 0%, Навальный - 100%', keyboard(mainMenu))
})