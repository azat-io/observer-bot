import generate from 'nanoid/generate'
import { db } from '../db'

const TELEGRAM_BOT_NAME = 'KazanObserverBot'
const TELEGRAM_BOT_URL = `https://t.me/${ TELEGRAM_BOT_NAME }`

// eslint-disable-next-line
async function generateRandomTokens () {
    for (let i = 0; i < 20; i++) {
        const randomToken = generate('1234567890abcdef', 20)
        await db.ref(`/tokens/${ randomToken }`).transaction(val => 0)
    }
}

const generateAuthenticationLink = token => `${ TELEGRAM_BOT_URL }?start=${ token }`

async function generateAuthorizationLinks (count = 10) {
    const authTokens = (await db.ref(`/tokens`).once('value')).val()
    const availableTokens = Object.keys(authTokens).filter(
        (token, index) => authTokens[token] === 0
    )

    const authenticationLinks = availableTokens.map(generateAuthenticationLink)
    return authenticationLinks
}
generateAuthorizationLinks().then(console.log)

export const freezeTokenWithTelegram = async (token, telegramId) => {
    console.log(token, telegramId)
    await db.ref(`/tokens/${ token }`).transaction(curr => telegramId)
}

export const getToken = async token => {
    (await db.ref(`/tokens/${ token }`).once('value')).val()
}

export const isValidToken = async token => (await getToken(token)) !== null

export const isTokenFreezed = async token => {
    !((await getToken(token) !== 0) && (await isValidToken(token)))
}

export const isYourToken = async (token, telegramId) =>
    (await getToken(token)) === telegramId.toString()
