'use strict'

/**
 * Обработка результатов голосования для дальнейшей публикации в Твиттер.
 * Преобразование количества голосов за каждого канидидата в проценты от общего
 * числа голосов
 *
 * @param   { Array } results - Результаты голосования
 *
 * @returns { string }        - Сообщение для Твиттера, содержащее информацию о
 *                              процентных результатах голосования трёх лучших
 *                              кандидатов
 */
export default function electionResults (results) {
    /**
     * @example Пример объекта results
     *
     * [{
     *     candidate: 'Владимир Путин',
     *     result: 1340,
     * }, {
     *     candidate: 'Алексей Навальный',
     *     result: 865,
     * }]
     */

    results.sort((a, b) => {
        return b.result - a.result
    })

    /**
     * Получаем общее количество голосов за всех кандидатов
     */
    const totalVotes = results.reduce((sum, item) => {
        return sum + item.result
    }, 0)

    return results.slice(0, 3).map(item => {
        return `${ item.candidate }: ` +
            `${ (item.result * 100 / totalVotes).toFixed(2) }%`
    }).join(', ')
}
