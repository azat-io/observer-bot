'use strict'

import isNumberLike from 'is-number-like'

import bot from './telegram-bot'
import request from 'request-promise'
import twitIt from './twit-it'
import deepLinkHandler from './deep-link'
import getCurrentDataHandler from './get-current-data'
import electionResults from './election-results'

import getRoutes from './routes'
import getReportsRoutes from './routes/reports'
import getKnowledgeTestRoutes from './routes/knowledge-test'
import getCurrentDataRoutes from './routes/get-current-data'

import { candidates } from '../etc/config.json'

const fakeTwitterUsername = 'fletcherist'

const mainMenuButtons = getRoutes()

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

    if (data === 'sendResults') {
        return sendResults(msg)
    }

    bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {
            sendInlineMessage(data, msg.chat.id)
        })
})

bot.onText(/^\/start [a-zA-Z0-9]{4,32}$/ig, deepLinkHandler)
bot.onText(/^(Узнать текущие данные)$/, getCurrentDataHandler)

const getFullsizePhoto = msg => msg.photo[msg.photo.length - 1].file_id
bot.on('photo', async msg => {
    try {
        const body = await request({
            method: 'GET',
            uri: await bot.getFileLink(getFullsizePhoto(msg)),
            encoding: 'base64',
        })

        const { twitLink } = await twitIt('Зафиксирована карусель',
            fakeTwitterUsername, 168, body)
        bot.sendMessage(msg.chat.id, twitLink)
    } catch (e) {
        console.log(e)
    }
})

let sendResult
const results = []
const totalSteps = candidates.length - 1
let currentStep = 0

function sendResults (msg) {
    if (currentStep <= totalSteps) {
        sendResult = true
        bot.sendMessage(msg.chat.id,
            'Введите количество голосов за кандидата ' +
            `*${ candidates[currentStep] }*`, {
                parse_mode: 'markdown',
            }
        )
    } else {
        /*
         * @todo Интеграфия results с базой данных
         */
        sendResult = false
        bot.sendMessage(msg.chat.id, 'Сообщение о результатах отправлено')
        twitIt(electionResults(results), 'kimkardashian', 444)
    }
}

bot.on('message', msg => {
    if (sendResult) {
        if (isNumberLike(msg.text)) {
            results.push({
                candidate: candidates[currentStep],
                result: parseInt(msg.text),
            })
            currentStep += 1
            sendResults(msg)
            console.log(results)
        } else {
            bot.sendMessage(msg.chat.id, 'Ошибка. Введите данные ещё раз')
        }
    } else {
        bot.sendMessage(msg.chat.id, 'Не понял')
    }
})
