export default () => ([
    [{
        text: 'Сообщить о нарушении в день голосования',
        callback_data: 'reportOffense',
    }], [{
        text: 'Сообщить о нарушении до дня голосования',
        callback_data: 'reportPressure',
    }], [{
        text: 'Начать тестирование знаний',
        callback_data: 'knowledgeTest',
    }], [{
        text: 'Узнать результаты в регионе',
        callback_data: 'sendResults',
    }],
])
