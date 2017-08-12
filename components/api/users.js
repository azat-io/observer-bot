import { db } from '../db'
import log from '../log'

export const getUserById = async id => {
    try {
        const userSnapshot = await db.ref(`/users/${ id }`).once('value')
        const user = userSnapshot.val()
        console.log(user)
        return user
    } catch (e) {
        log.error(e)
    }
}

export const saveUser = async user => {
    if (!user) return 'Empty user object'
    try {
        const { id } = user
        return await db.ref(`/users/${ id }`).update(user)
    } catch (e) {
        log.error(e)
    }
}
