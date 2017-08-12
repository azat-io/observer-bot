import { saveUser } from './api/users'

const STEPS = {
    1: {
        question: 'Как тебя зовут?',
        dataModel: 'firstName',
    },
    2: {
        question: 'Из какого ты города?',
        dataModel: 'city',
    },
    3: {
        question: 'Введи свой юзернейм в Твиттере',
        dataModel: 'twiiter',
    },
}

const dataStorage = {}

const getCurrentStep = telegramId => dataStorage[telegramId].step
const getCurrentQuestion = telegramId => STEPS[getCurrentStep(telegramId)].question

function updateData (telegramId, data) {
    const newUserData = Object.assign(dataStorage[telegramId].data, {
        [STEPS[getCurrentStep(telegramId)].dataModel]: data,
    })
    dataStorage[telegramId] = Object.assign(
        dataStorage[telegramId], {
            data: newUserData,
        }
    )
    dataStorage[telegramId].step = getCurrentStep(telegramId) + 1

    console.log(dataStorage)
    return dataStorage.telegramId
}

function initializeSignup (telegramId) {
    dataStorage[telegramId] = {
        step: 1,
        data: {
            id: telegramId,
        },
    }
}

function sendMessageToBot (_telegramId) {
    const telegramId = _telegramId
    return (message) => {
        if (!message || !telegramId) {
            return false
        }

        const status = getCurrentStep(telegramId) > 3

        return {
            status,
            message,
        }
    }
}

// const validateData = _telegramId => {
//     const telegramId = _telegramId
//     return (data) => {

//     }
// }

export default function signup (telegramId, message) {
    const sendMessage = sendMessageToBot(telegramId)
    if (message.trim() === 'Зарегистрироваться') {
        initializeSignup(telegramId)
        return sendMessage(STEPS[dataStorage[telegramId].step].question)
    }
    updateData(telegramId, message.trim())

    if (getCurrentStep(telegramId) === 4) {
        try {
            saveUser(dataStorage[telegramId].data)
            return sendMessage('Регистрация успешно завершена!')
        } catch (e) {
            return sendMessage('Ошибка при регистрации')
        }
    }

    return sendMessage(getCurrentQuestion(telegramId))
}
