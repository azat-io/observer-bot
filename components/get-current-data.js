import bot, { keyboard, mainMenu } from './telegram-bot'

const MESSAGES = {
    dataIntroduction: 'На текущий момент наблюдатели зафиксировали: ',
}

const mockData = {
    peopleDifference: 2464,
    offensesCount: 214,

    vbros: 42,
    carousel: 12,
    ballotsSpottage: 9,
    otherCriminalities: 3,
}

export default async message => {
    const sendMessage = bot.sendMessage.bind(this, message.chat.id)

    sendMessage(MESSAGES.dataIntroduction)
    const composedMessages = [
        MESSAGES.dataIntroduction,
        `Различие в явке: ${ mockData.peopleDifference } человека`,
        `Зафиксированных нарушений: ${ mockData.offensesCount }, из них:`,

        `       Вбросы: ${ mockData.vbros }`,
        `       Карусели: ${ mockData.carousel }`,
        `       Порча бюллетеней: ${ mockData.ballotsSpottage }`,
        `       Других нарушений: ${ mockData.otherCriminalities }`,
    ].filter(Boolean).join('\n')
    sendMessage(composedMessages, keyboard(mainMenu))
}
