export default () => ([
    {
        messageData: 'knowledgeTest',
        messageText: 'Проверим ваши знания! Вы знаете как проводятся выборы?',
        inlineKeyboard: [
            [{
                text: 'Да, я знаю все о выборах!',
                callback_data: 'hasKnowledge',
            }, {
                text: 'Нет, я не в курсе.',
                callback_data: 'noKnowledge',
            }],
        ],
    }, {
        messageData: 'hasKnowledge',
        messageText: 'Молодец! Теперь можно быть наблюдателем на выборах!',
        inlineKeyboard: [
            [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    }, {
        messageData: 'noKnowledge',
        messageText: 'Пройди курс подготовки!',
        inlineKeyboard: [
            [{
                text: 'Главное меню',
                callback_data: 'mainMenu',
            }],
        ],
    },
])
