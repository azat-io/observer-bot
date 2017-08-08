'use strict'

import Twit from 'twit'
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
 */
export default function twitIt (message, user) {
    /**
     * Удалить из названия города символы, недопустимые для использования в
     * хештегах Твиттера. Например, слово "Санкт-Петербург" заменить на
     * "СанктПетербург"
     */
    const formattedCity = city.replace(/[^а-яё]/gi, '')

    /**
     * Отправить сообщение в Твиттер, с указанием источника информации в том
     * случае, если имеется персональный аккаунт в Твиттере, и добавить нужные
     * хештеги
     *
     * Описание метода post:
     *
     * @link https://github.com/ttezel/twit#tpostpath-params-callback
     */
    return twitter.post('statuses/update', {
        status: message +
        `${ typeof user !== 'undefined' ? ', сообщает @' + user : '' }` +
        ` #${ formattedCity }ЗаНавального #Навальный2018 #Выборы2018`,
    }).catch(error => {
        console.error(`Ошибка отправки твита: ${ error }`)
    })
}
