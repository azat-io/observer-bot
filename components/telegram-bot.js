'use strict'

import Tgfancy from 'tgfancy'
import token from '../etc/token.js'

const bot = new Tgfancy(token, {
    polling: true,
})

export default bot
