'use strict'

import bot from './telegram-bot'
import readMD from './read-markdown'
import api from './api'

bot.onText(/^(\/start)$/, msg => {
    bot.sendMessage(msg.chat.id, readMD('start'))
})


