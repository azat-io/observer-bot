import bot, { keyboard, mainMenu } from './telegram-bot'
import {
    isValidToken,
    isTokenFreezed,
    freezeTokenWithTelegram,
    isYourToken,
} from './api/tokens'

const MESSAGES = {
    initializeAuthentication: 'Привет! Подожди секунду, мы тебя авторизуем.',
    successAuthentication: 'Всё, готово! Теперь ты можешь всё.',
    unsuccessAuthentication: 'К сожалению, нам не удалось авторизовать тебя. ' +
        'Прости. Нам очень жаль :(',
    tokenFreezed: `Кажется, вы уже использовали эту ссылку для авторизации.
        Если это были не вы, срочно напишите нам address@email.com`,
}

export default async message => {
    try {
        const telegramId = message.chat.id
        const sendMessage = bot.sendMessage.bind(this, telegramId)
        sendMessage(MESSAGES.initializeAuthentication)

        const recievedToken = message.text.split(' ')[1]

        if (!await isValidToken(recievedToken)) {
            return sendMessage(MESSAGES.unsuccessAuthentication)
        }

        if (!await isTokenFreezed(recievedToken)) {
            if (!await isYourToken(recievedToken, telegramId)) {
                return sendMessage(MESSAGES.tokenFreezed)
            }
        }

        await freezeTokenWithTelegram(recievedToken, telegramId)
        sendMessage(MESSAGES.successAuthentication, keyboard(mainMenu))
    } catch (e) {
        console.log(e)
    }
}
