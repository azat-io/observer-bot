'use strict'

import NodeGeocoder from 'node-geocoder'

/**
 * Определить географические координаты по адресу, передаваемому в качестве
 * аргумента функции
 *
 * @param   { (Object|string) } loc - Адрес с указанием города, улицы и номера
 *                                    дома. Если в качестве параметра передать
 *                                    объект, он может иметь следующие свойства:
 *                                    address, city, country, zipcode
 *
 * @returns { Promise }             - Переходя в состояние fulfilled, промис в
 *                                    качестве результата получает массив из
 *                                    двух чисел, обозначающих широту и долготу
 *                                    объекта
 *
 * @example
 *
 * getPointByLocation('Казань, ул. Кремлёвская, 1').then(response => {
 *     console.log(response) // => [ 55.796395, 49.110177 ]
 * })
 */
export default function getPointByLocation (location) {
    const geocoder = NodeGeocoder({
        provider: 'google',
        language: 'ru',
    })

    if (typeof location === 'string') {
        location = location.replace(/ *\([^)]*\) */g, '')
    }

    return geocoder.geocode(location)
        .then(response => {
            /**
             * Пример результата вызова данной функции с переданной в качестве
             * аргумента строкой 'Казань, ул. Кремлёвская, 1'
             *
             * @example Результат вызова функции geocoder.geocode()
             *
             * [{
             *     formattedAddress: 'ул. Кремлевская, 1, Казань, Респ. ' +
             *         'Татарстан, Россия, 420111',
             *     latitude: 55.796395,
             *     longitude: 49.110177,
             *     extra: {
             *         googlePlaceId: 'ChIJU89uoz2tXkERuxC954LtMv0',
             *         confidence: 1,
             *         premise: null,
             *         subpremise: null,
             *         neighborhood: 'Казань',
             *         establishment: null
             *     },
             *     administrativeLevels: {
             *         level2long: 'город Казань',
             *         level2short: 'г. Казань',
             *         level1long: 'Республика Татарстан',
             *         level1short: 'Респ. Татарстан'
             *     },
             *     streetNumber: '1',
             *     streetName: 'улица Кремлевская',
             *     city: 'Казань',
             *     country: 'Россия',
             *     countryCode: 'RU',
             *     zipcode: '420111',
             *     provider: 'google'
             * }]
             */
            return [response[0].latitude, response[0].longitude]
        })
}
