'use strict'

import bot, { keyboard } from './telegram-bot'
import request from 'request-promise'
import twitIt from './twit-it'
import readMD from './read-markdown'
import deepLinkHandler from './deep-link'
import getCurrentDataHandler from './get-current-data'

import getRoutes from './routes'

const fakeTwitterUsername = 'fletcherist'

const mainMenuButtons = getRoutes()

import getReportsRoutes from './routes/reports'
import getKnowledgeTestRoutes from './routes/knowledge-test'
import getCurrentDataRoutes from './routes/get-current-data'

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
    },

    ...getReportsRoutes(),
    ...getKnowledgeTestRoutes(),
    ...getCurrentDataRoutes(),
]

function sendInlineMessage (data, chatId, dataFromMessage) {
    const messageData = options

    let messageIndex

    for (let i = 0, max = messageData.length; i < max; i++) {
        if (messageData[i] && messageData[i].messageData === data) {
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
        twitIt(messageData[messageIndex].tweetMessage, 'fake')
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
    const sendMessage = bot.sendMessage.bind(null, msg.chat.id)
    const keyboardPreviousStep = keyboard([['Назад']])
    if (type === 'throwIn') {
        twitIt('Зафиксирован вброс', fakeTwitterUsername)
        sendMessage(readMD('violations/vbros'), keyboardPreviousStep)
    } else if (type === 'carousel') {
        twitIt('Обнаружена карусель', fakeTwitterUsername)
        sendMessage('Текст жалобы на карусель', keyboardPreviousStep)
    } else if (type === 'damage') {
        twitIt('Кто-то портит блюллетени', fakeTwitterUsername)
        sendMessage('Текст жалобы на порчу бюллетеней', keyboardPreviousStep)
    }
}

const getFullsizePhoto = msg => msg.photo[msg.photo.length - 1].file_id
bot.on('photo', async msg => {
    try {
        const body = await request({
            method: 'GET',
            uri: await bot.getFileLink(getFullsizePhoto(msg)),
            encoding: 'base64',
        })
        await twitIt('Зафиксирована карусель', fakeTwitterUsername, 168, body)
    } catch (e) {
        console.log(e)
    }
})
