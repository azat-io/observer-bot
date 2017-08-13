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
        messageText: 'Зафиксирован вброс',
        twit_it: true,
        inlineKeyboard: [
            [{
                text: 'Отправить фото-доказательства',
                callback_data: 'throwInPhoto',
            }, {
                text: 'Подкуп избирателей',
                callback_data: 'bribe',
            }],
        ],
    }, {
        messageData: 'carousel',
        messageText: 'Зафиксирована карусель',
        twit_it: true,
        inlineKeyboard: [
            [{
                text: 'Отправить фото-доказательства',
                callback_data: 'throwInPhoto',
            }, {
                text: 'Подкуп избирателей',
                callback_data: 'bribe',
            }],
        ],
    }
])