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
export default function twitIt (message, user, station, photos) {
    station = station || 666

    /**
     * Удалить из названия города символы, недопустимые для использования в
     * хештегах Твиттера. Например, слово "Санкт-Петербург" заменить на
     * "СанктПетербург"
     */
    const formattedCity = city.replace(/[^а-яё]/gi, '')

    function twitterPost (image) {
        return twitter.post('statuses/update', {
            status: 'УИК 666: ' + message +
            `${ typeof user !== 'undefined' ? ', сообщает @' + user : '' }` +
            ` #${ formattedCity }ЗаНавального #Навальный2018 #Выборы2018`,
            media_ids: image || null,
        }).catch(error => {
            console.error(`Ошибка отправки твита: ${ error }`)
        })
    }

    if (photos) {
        twitter.post('media/upload', {
            media_data: photos,
        }, (error, data, response) => {
            const mediaIdStr = data.media_id_string
            const params = {
                media_id: mediaIdStr,
                alt_text: {
                    text: message,
                },
            }

            return twitter.post('media/metadata/create', params,
                (error, data, response) => {
                    if (!error) {
                        twitterPost([mediaIdStr])
                    }
                })
        })
    } else {
        twitterPost()
    }
}
