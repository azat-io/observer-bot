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

function updateData (telegramId, data) {
    const currentStep = dataStorage[telegramId].step
    const newUserData = Object.assign(dataStorage[telegramId].data, {
        [STEPS[currentStep].dataModel]: data,
    })
    dataStorage[telegramId] = Object.assign(
        dataStorage[telegramId], {
            data: newUserData,
        }
    )
    dataStorage[telegramId].step = dataStorage[telegramId].step + 1

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

function sendMessageToBot(_telegramId) {
    const telegramId = _telegramId
    return (message) => {
        if (!message || !telegramId) {
            return false
        }

        const status = dataStorage[telegramId].step > 3

        return {
            status,
            message 
        }
    }
}

const getCurrentQuestion = telegramId => STEPS[dataStorage[telegramId].step].question

export default function signup (telegramId, message) {
    const sendMessage = sendMessageToBot(telegramId)
    if (message.trim() === 'Зарегистрироваться') {
        initializeSignup(telegramId)
        return sendMessage(STEPS[dataStorage[telegramId].step].question)
    }
    updateData(telegramId, message.trim())

    if (dataStorage[telegramId].step === 4) {
        try {
            saveUser(dataStorage[telegramId].data)
            return sendMessage('Регистрация успешно завершена!')
        } catch (e) {
            return sendMessage('Ошибка при регистрации')
        }
    }

    return sendMessage(getCurrentQuestion(telegramId))
}
