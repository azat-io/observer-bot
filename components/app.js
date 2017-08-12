'use strict'

import bot from './telegram-bot'
import readMD from './read-markdown'
import api from './api'

import signup from './signup'

bot.onText(/^(\/start)$/, msg => {
    bot.sendMessage(msg.chat.id, readMD('start'), {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            keyboard: [
                ['Зарегистрироваться'],
            ],
            resize_keyboard: true,
        }),
    })
})

bot.on('message', async msg => {
    bot.sendMessage(msg.from.id, signup(msg.from.id, msg.text))
})
