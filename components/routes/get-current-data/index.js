const anotherRegion = [[{
    text: 'Другой регион',
    callback_data: 'getResults',
}, {
    text: 'Главное меню',
    callback_data: 'mainMenu',
}]]

export default () => ([
    {
        messageData: 'getResults',
        messageText: 'Выберите регион',
        inlineKeyboard: [
            [{
                text: 'Москва',
                callback_data: 'msk',
            }, {
                text: 'Санкт-Петербург',
                callback_data: 'spb',
            }], [{
                text: 'Татарстан',
                callback_data: 'kzn',
            }, {
                text: 'Новосибирская область',
                callback_data: 'nsb',
            }], [{
                text: 'Вся Россия',
                callback_data: 'russia',
            }],
        ],
    }, {
        messageData: 'russia',
        messageText: 'Данные по России: Навальный - 33,4%, Путин - 30,4%, Зюганов - 24,3%, Жириновский - 11,8%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'msk',
        messageText: 'Данные по Москве: Навальный - 34,1%, Путин - 24,2%, Зюганов - 25,1%, Жириновский - 15,9%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'spb',
        messageText: 'Данные по Санкт-Петербургу: Навальный - 29,8%, Путин - 29,0%, Зюганов - 24,3%, Жириновский - 16,8%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'kzn',
        messageText: 'Данные по Татарстану: Навальный - 38,4%, Путин - 33,4%, Зюганов - 19,3%, Жириновский - 8,8%.',
        inlineKeyboard: anotherRegion,
    }, {
        messageData: 'nsb',
        messageText: 'Данные по Новосибирской Области: Навальный - 35,8%, Путин - 28,0%, Зюганов - 22,3%, Жириновский - 13,8%.',
        inlineKeyboard: anotherRegion,
    },
])
