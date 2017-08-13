'use strict'

import bot, { keyboard } from './telegram-bot'
import request from 'request'
import twitIt from './twit-it'
import readMD from './read-markdown'
import deepLinkHandler from './deep-link'
import getCurrentDataHandler from './get-current-data'

const fakeTwitterUsername = 'fletcherist'

const mainMenuButtons = [
    [{
        text: 'Сообщить о нарушении в день голосования',
        callback_data: 'reportOffense',
    }], [{
        text: 'Сообщить о нарушении до дня голосования',
        callback_data: 'reportPressure',
    }], [{
        text: 'Начать тестирование знаний',
        callback_data: 'knowledgeTest',
    }], [{
        text: 'Узнать результаты в регионе',
        callback_data: 'sendResults',
    }],
]

const anotherRegion = [[{
    text: 'Другой регион',
    callback_data: 'sendResults',
}, {
    text: 'Главное меню',
    callback_data: 'mainMenu',
}]]

bot.onText(/^\/start$/, msg => {
    bot.sendMessage(msg.chat.id, 'Выберите действие', {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            inline_keyboard: mainMenuButtons,
            resize_keyboard: true,
        }),
    })
})

const options = [
    {
        messageData: 'mainMenu',
        messageText: 'Выберите действие',
        inlineKeyboard: mainMenuButtons,
    }, {
        messageData: 'reportOffense',
        messageText: 'Какое нарушение?',
        inlineKeyboard: [
            [{
                text: 'Вброс',
                callback_data: 'throwIn',
            }, {
                text: 'Карусель',
                callback_data: 'carousel',
            }], [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    }, {
        messageData: 'reportPressure',
        messageText: 'Какое нарушение происходит до дня выборов?',
        inlineKeyboard: [
            [{
                text: 'Административное давление',
                callback_data: 'pressure',
            }], [{
                text: 'Подкуп избирателей',
                callback_data: 'bribe',
            }], [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    }, {
        messageData: 'throwIn',
        messageText: 'Зафиксирован вброс',
        twit_it: true,
        inlineKeyboard: [
            [{
                text: 'Отправить фото-доказательства',
                callback_data: 'throwInPhoto',
            }, {
                text: 'Подкуп избирателей',
                callback_data: 'bribe',
            }],
        ],
    }, {
        messageData: 'carousel',
        messageText: 'Зафиксирована карусель',
        twit_it: true,
        inlineKeyboard: [
            [{
                text: 'Отправить фото-доказательства',
                callback_data: 'throwInPhoto',
            }, {
                text: 'Подкуп избирателей',
                callback_data: 'bribe',
            }],
        ],
    }, {
        messageData: 'knowledgeTest',
        messageText: 'Проверим ваши знания! Вы знаете как проводятся выборы?',
        inlineKeyboard: [
            [{
                text: 'Да, я знаю все о выборах!',
                callback_data: 'hasKnowledge',
            }, {
                text: 'Нет, я не в курсе.',
                callback_data: 'noKnowledge',
            }],
        ],
    }, {
        messageData: 'hasKnowledge',
        messageText: 'Молодец! Теперь можно быть наблюдателем на выборах!',
        inlineKeyboard: [
            [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    }, {
        messageData: 'noKnowledge',
        messageText: 'Пройди курс подготовки!',
        inlineKeyboard: [
            [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    }, {
        messageData: 'sendResults',
        messageText: 'Выберите регион',
        inlineKeyboard: [
            [{
                text: 'Москва',
                callback_data: 'msk',
            }, {
                text: 'Санкт-Петербург',
                callback_data: 'spb',
            }], [{
                text: 'Татарстан',
                callback_data: 'kzn',
            }, {
                text: 'Новосибирская область',
                callback_data: 'nsb',
            }], [{
                text: 'Вся Россия',
                callback_data: 'russia',
            }],
        ],
    }, {
        messageData: 'russia',
        messageText: 'Данные по России: Навальный - 33,4%, Путин - 30,4%, Зюганов - 24,3%, Жириновский - 11,8%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'msk',
        messageText: 'Данные по Москве: Навальный - 34,1%, Путин - 24,2%, Зюганов - 25,1%, Жириновский - 15,9%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'spb',
        messageText: 'Данные по Санкт-Петербургу: Навальный - 29,8%, Путин - 29,0%, Зюганов - 24,3%, Жириновский - 16,8%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'kzn',
        messageText: 'Данные по Татарстану: Навальный - 38,4%, Путин - 33,4%, Зюганов - 19,3%, Жириновский - 8,8%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'nsb',
        messageText: 'Данные по Новосибирской Области: Навальный - 35,8%, Путин - 28,0%, Зюганов - 22,3%, Жириновский - 13,8%.',
        inlineKeyboard: anotherRegion,
    }]

function sendInlineMessage (data, chatId, dataFromMessage) {
    const messageData = options

    let messageIndex

    for (let i = 0, max = messageData.length; i < max; i++) {
        if (messageData[i].messageData === data) {
            messageIndex = i
        }
    }

    bot.sendMessage(chatId, messageData[messageIndex].messageText, {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            inline_keyboard: messageData[messageIndex].inlineKeyboard,
            resize_keyboard: true,
        }),
    })
    if (messageData[messageIndex] &&
        messageData[messageIndex].twit_it === true) {
        twitIt(messageData[messageIndex].messageData, fakeTwitterUsername)
    }
}

bot.on('callback_query', callbackQuery => {
    const msg = callbackQuery.message
    const data = callbackQuery.data
    bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {
            sendInlineMessage(data, msg.chat.id)
        })
})

bot.onText(/^\/start [a-zA-Z0-9]{4,32}$/ig, deepLinkHandler)
bot.onText(/^(Узнать текущие данные)$/, getCurrentDataHandler)

function twitOffense (type) {
    if (type === 'throwIn') {
        twitIt('Зафиксирован вброс', fakeTwitterUsername)
        bot.sendMessage(msg.chat.id, readMD('violations/vbros'),
            keyboard([['Назад']]))
    } else if (type === 'carousel') {
        twitIt('Обнаружена карусель', fakeTwitterUsername)
        bot.sendMessage(msg.chat.id, 'Текст жалобы на карусель',
            keyboard([['Назад']]))
    } else if (type === 'damage') {
        twitIt('Кто-то портит блюллетени', fakeTwitterUsername)
        bot.sendMessage(msg.chat.id, 'Текст жалобы на порчу бюллетеней',
            keyboard([['Назад']]))
    }
}

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
