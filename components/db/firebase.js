import * as admin from 'firebase-admin'
const serviceAccount = require('../../etc/firebase-keys.json')

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://navalny-observer-bot.firebaseio.com/',
})

export const db = app.database()
export default app
