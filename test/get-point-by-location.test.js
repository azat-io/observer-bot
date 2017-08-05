'use strict'

import getPointByLocation from '../components/get-point-by-location'

test('Возвращает два значения в массиве', () => {
    expect.assertions(1)
    return expect(getPointByLocation('Москва, Красная пл., 1'))
        .resolves.toHaveLength(2)
})

test('Определяем геопозицию по объекту адреса', () => {
    expect.assertions(1)
    return expect(getPointByLocation({
        address: 'Красная пл., 1',
        city: 'Москва',
        country: 'Россия',
    })).resolves.toEqual([55.7537523, 37.6225168])
})

test('Определяем геопозицию по строке адреса', () => {
    expect.assertions(1)
    return expect(getPointByLocation('Самара, ул. Некрасовская, 94'))
        .resolves.toEqual([53.1868944, 50.1051285])
})
