'use strict'

import FB from 'fb'
import { facebookKey } from '../etc/secret.json'

/**
 * Отправить сообщение в Фейсбук
 *
 * @param { string } message - Текст сообщения, которое будет отправлено на
 *                             страницу в Фейсбуке
 */
export default async function facebookIt (message, callback) {
    FB.setAccessToken(facebookKey)

    await FB.api('me/feed', 'post', { message: message }, response => {
        if (!response || response.error) {
            console.log(!response ? 'Ошибка отправки сообщения в FaceBook'
                : response.error)
        }

        callback(response.id)
    })
}
