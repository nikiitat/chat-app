import { User } from './user.types'

const users: User[] = []

export const addUser = ({ id, username, room, locale }: User) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  if (!username || !room) {
    return { error: 'Username and room are required!' }
  }

  const existingUser = users.find((user) => {
    return user.room === room && user.username === username
  })

  const existingLocale = users.find((user) => {
    return user.room === room && user.locale !== locale
  })

  if (existingUser) {
    return { error: 'Username is in use!' }
  }

  if (existingLocale) {
    return { error: 'Locale is in use!' }
  }

  const user: User = { id, username, room, locale }
  users.push(user)
  return { user }
}

export const removeUser = (id: User['id']) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

export const getUser = (id: User['id']) => {
  return users.find((user) => user.id === id)
}

export const getUsersInTheRoom = (room: User['room']) => {
  return users.filter((user) => user.room === room)
}

// console.log(addUser({ id: '1', username: 'ss', room: 'assd', locale: 'EN' }))
// console.log(addUser({ id: '2', username: 'aaa', room: 'assd', locale: 'DE' }))

// addUser({ id: 3, username: 'ss', room: 'adsa', locale: 'SP' })
// console.log(users)

// console.log(getUsersInTheRoom('assd'))
// console.log(getUser(2))
