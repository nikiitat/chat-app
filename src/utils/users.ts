import { User } from './user.types'

const users: User[] = []

export const addUser = ({ id, username, room }: User) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  if (!username || !room) {
    return { error: 'Username and room are required!' }
  }

  const existingUser = users.find((user) => {
    return user.room === room && user.username === username
  })

  if (existingUser) {
    return { error: 'Username is in use!' }
  }

  const user: User = { id, username, room }
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

// addUser({ id: 1, username: 'ss', room: 'assd' })
// addUser({ id: 2, username: 'adsadads', room: 'assd' })
// addUser({ id: 3, username: 'ss', room: 'adsa' })
// console.log(users)

// console.log(getUsersInTheRoom('assd'))
// console.log(getUser(2))
