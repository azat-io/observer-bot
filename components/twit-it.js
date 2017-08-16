'use strict'

import Twit from 'twit'
import { twitterKey } from '../etc/secret.json'
import { city } from '../etc/config.json'

const TWITTER_ACCOUNT_NAME = 'kazan_observer'

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

const getTwitLink = twitId => `twitter.com/${ TWITTER_ACCOUNT_NAME }/status/${ twitId }`

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
 * @param { string } photo    - Линк на фотографию, которую необходимо отправить
 *                              в Твиттер
 */
export default async function twitIt (message, user, station, photos) {
    station = station || 666

    const composeStatus = () => [
        `УИК ${ station }:`,
        `${ message },`,
        getAuthor(user),
        `#${ formatCity(city) }ЗаНавального #Навальный2018 #Выборы2018`,
        (Math.floor(Math.random() * 100)).toString(),
    ].join(' ')

    const composeImage = async () => {
        if (!photos) return null
        const { data } = await uploadPhotos(photos)

        await createImageMetadata({
            media_id: data.media_id_string,
            alt_text: {
                text: message,
            },
        })

        return data.media_id_string
    }

    try {
        const response = await sendStatusMessage({
            status: composeStatus(),
            media_ids: await composeImage(),
        })
        console.log(response)

        const twitId = response.data.id_str
        return {
            twitLink: getTwitLink(twitId),
        }
    } catch (error) {
        console.error(`Ошибка отправки твита: ${ error }`)
    }
}
