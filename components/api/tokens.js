import generate from 'nanoid/generate'
import { db } from '../db'

// eslint-disable-next-line
async function generateRandomTokens () {
    for (let i = 0; i < 20; i++) {
        const randomToken = generate('1234567890abcdef', 10)
        await db.ref(`/tokens/${ randomToken }`).transaction(val => 0)
    }
}

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
    (await getToken(token)).toString() === telegramId.toString()
