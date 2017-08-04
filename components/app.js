'use strict'

import bot from './telegram-bot'
import readMD from './read-markdown'

bot.onText(/^(\/start)$/, msg => {
    bot.sendMessage(msg.chat.id, readMD('start'))
})
