'use strict'

import electionResults from '../components/election-results'

const results = [{
    candidate: 'Путин',
    result: 1234,
}, {
    candidate: 'Навальный',
    result: 876,
}, {
    candidate: 'Зюганов',
    result: 840,
}, {
    candidate: 'Жириновский',
    result: 999,
}]

const resultsTwit = 'Путин: 31.25%, Жириновский: 25.30%, Навальный: 22.18%'

test('Преобразование результатов голосования в сообщение для Твиттера', () => {
    expect(electionResults(results)).toEqual(resultsTwit)
})
