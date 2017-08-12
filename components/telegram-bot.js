'use strict'

import Tgfancy from 'tgfancy'
import { telegramKey } from '../etc/secret.json'

const bot = new Tgfancy(telegramKey, {
    polling: true,
})

export const mainMenu = [['Сообщить о нарушении', 'Узнать текущие данные'],
    ['Тестировать знания'], ['Сообщить о нарушениях до дня выборов']]

export function keyboard (array, withOneTimeKeyboardFlag) {
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

export default bot
