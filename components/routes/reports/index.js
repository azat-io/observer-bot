export default () => ([
    {
        messageData: 'reportOffense',
        messageText: 'Какое нарушение?',
        inlineKeyboard: [
            [{
                text: 'Вброс',
                callback_data: 'throwIn',
            }, {
                text: 'Карусель',
                callback_data: 'carousel',
            }], [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    }, {
        messageData: 'reportPressure',
        messageText: 'Какое нарушение происходит до дня выборов?',
        inlineKeyboard: [
            [{
                text: 'Административное давление',
                callback_data: 'pressure',
            }], [{
                text: 'Подкуп избирателей',
                callback_data: 'bribe',
            }], [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    }, {
        messageData: 'throwIn',
        messageText: 'Вы зафиксировали вброс. Подтвердить действие?',
        twit_it: true,
        tweetMessage: 'Зафиксирован вброс',
        inlineKeyboard: [
            [{
                text: 'Прикрепить фото-доказательство',
                callback_data: 'attachPhoto',
            }], [{
                text: 'Потвердить',
                callback_data: 'bribe',
            }, {
                text: 'Отменить',
                callback_data: 'mainMenu',
            }]
        ],
    }, {
        messageData: 'carousel',
        messageText: 'Зафиксирована карусель',
        twit_it: true,
        inlineKeyboard: [
            [{
                text: 'Отправить фото-доказательства',
                callback_data: 'attachPhoto',
            }, {
                text: 'Подкуп избирателей',
                callback_data: 'bribe',
            }],
        ],
    }, {
        messageData: 'attachPhoto',
        messageText: 'Пожалуйста, прикрепите фотографию нарушения',
        inlineKeyboard: [
            [{
                text: 'Отправить',
                callback_data: 'sendPhoto'
            }, {
                text: 'Отменить',
                callback_data: 'mainMenu'
            }],
        ]
    }
])