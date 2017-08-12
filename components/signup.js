import { saveUser } from './api/users'


const validateUsername = username => username.match(/^[a-zа-я ]{1,80}$/ig)
const validateCity = city => city.match(/^[a-zа-я]{1,60}$/ig)
const validateTwitter = twitter => twitter.match(/^[a-z]{1,60}$/ig)

const STEPS = {
    1: {
        question: 'Как тебя зовут?',
        dataModel: 'firstName',
        validateFunction: validateUsername
    },
    2: {
        question: 'Из какого ты города?',
        dataModel: 'city',
        validateFunction: validateCity
    },
    3: {
        question: 'Введи свой юзернейм в Твиттере',
        dataModel: 'twiiter',
        validateFunction: validateTwitter
    },
}

const dataStorage = {}

const getCurrentStep = telegramId => dataStorage[telegramId].step
const getCurrentQuestion = telegramId => STEPS[getCurrentStep(telegramId)].question
const getValidateFunction = telegramId => STEPS[getCurrentStep(telegramId)].validateFunction

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

/**
 * Use this to get to know,
 * if data sent by user is valid
 * @param _telegram {String}
 * @return true/false {Boolean}
*/
const dataValidator = _telegramId => {
    const telegramId = _telegramId
    return data => getValidateFunction(telegramId)(data)
}

export default function signup (telegramId, message) {
    const sendMessage = sendMessageToBot(telegramId)
    const isValidData = dataValidator(telegramId)
    message = message.trim()

    if (message === 'Зарегистрироваться') {
        initializeSignup(telegramId)
        return sendMessage(getCurrentQuestion(telegramId))
    }

    if (!isValidData(message)) {
        return sendMessage('Кажется, введены неправильные данные. Попробуй ещё раз')
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
