'use strict'

import Twit from 'twit'
// import fs from 'fs'
import { twitterKey } from '../etc/secret.json'
import { city } from '../etc/config.json'

/**
 * Создать экземпляр класса Twit для осуществления запросов к API Твиттера
 *
 * Для успешной работы данного модуля требуется подключить необходимые ключи. Их
 * можно получить, создав приложение на сайте:
 *
 * @link https://apps.twitter.com/
 */
const twitter = new Twit({
    consumer_key: twitterKey.consumerKey,
    consumer_secret: twitterKey.consumerSecret,
    access_token: twitterKey.accessToken,
    access_token_secret: twitterKey.accessTokenSecret,
})
/**
 * Отправить сообщение в Твиттер
 *
 * @param { string } message  - Текст сообщения, которое будет отправленно в
 *                              Твиттер аккаунт
 *
 * @param { string } user     - Необязательный аргумент, юзернейм пользователя,
 *                              являющегося источником информации, которая будет
 *                              отправлена в Твиттер
 *
 * @param { number } station  - Номер избирательного участка
 *
 * @param { string } photo    - Массив ссылок на фотографии, которые необходимо
 *                              отправить в Твиттер
 */

/**
  * Удалить из названия города символы, недопустимые для использования в
  * хештегах Твиттера. Например, слово "Санкт-Петербург" заменить на
  * "СанктПетербург"
  */
const formatCity = city => city.replace(/[^а-яё]/gi, '')
const getAuthor = user => user ? `сообщает @${ user }` : ''

const composeMessage = (message, photo) => ({
    status: message,
    media_ids: photo || null,
})

const sendStatusMessage = ({status, media_ids}) => twitter.post('statuses/update', {status, media_ids})
const createImageMetadata = params => twitter.post('media/metadata/create', params)
const uploadPhotos = photos => twitter.post('media/upload', {media_data: photos})

export default async function twitIt (message, user, station, photos) {
    station = station || 666

    const getStatus = () => [
        'УИК 666:',
        `${ message },`,
        getAuthor(user),
        `#${ formatCity(city) }ЗаНавального #Навальный2018 #Выборы2018`,
        (Math.floor(Math.random() * 100)).toString(),
    ].join(' ')

    try {
        if (photos) {
            const { data } = await uploadPhotos(photos)
            console.log(data.media_id_string)
            const params = {
                media_id: data.media_id_string,
                alt_text: {
                    text: message,
                },
            }
            await createImageMetadata(params)
            const response = await sendStatusMessage({
                status: getStatus(),
                media_ids: [data.media_id_string],
            })
            console.log(response.data)
        } else {
            await sendStatusMessage({status: getStatus()})
        }
    } catch (e) {
        console.error(`Ошибка отправки твита: ${ e }`)
    }
}
