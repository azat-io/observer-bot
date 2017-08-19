'use strict'

import FB from 'fb'
import { facebookKey } from '../etc/secret.json'

/**
 * Отправить сообщение в Фейсбук
 *
 * @param { string } message - Текст сообщения, которое будет отправлено на
 *                             страницу в Фейсбуке
 */
export default function facebookIt (message) {
    FB.setAccessToken(facebookKey)

    FB.api('me/feed', 'post', { message: message }, response => {
        if (!response || response.error) {
            console.log(!response ? 'Ошибка отправки сообщения в FaceBook'
                : response.error)
        }

        console.log('ID опубликованного сообщения: ' + response.id)
    })
}
