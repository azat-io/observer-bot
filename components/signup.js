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

const dataStorage = {

}

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

export default function signup (telegramId, message) {
    if (message.trim() === 'Зарегистрироваться') {
        initializeSignup(telegramId)

        return STEPS[dataStorage[telegramId].step].question
    }
    updateData(telegramId, message.trim())

    if (dataStorage[telegramId].step === 4) {
        try {
            saveUser(dataStorage[telegramId].data)
            return 'Регистрация завершена!'
        } catch (e) {
            return 'Ошибка при регистрации'
        }
    }

    return STEPS[dataStorage[telegramId].step].question
}
