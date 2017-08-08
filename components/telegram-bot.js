'use strict'

import Tgfancy from 'tgfancy'
import { telegramKey } from '../etc/secret.json'

const bot = new Tgfancy(telegramKey, {
    polling: true,
})

export default bot
