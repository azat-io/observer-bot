'use strict'

import bot from './telegram-bot'
import readMD from './read-markdown'

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
