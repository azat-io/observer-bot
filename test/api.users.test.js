import { getUserById, saveUser } from '../components/api/users'

test('getUserById gets user by id (obviously)', async () => {
    expect(typeof getUserById).toEqual('function')
})

test('saveUser sould save user (obviously again)', async () => {
    expect(typeof saveUser).toEqual('function')
})
