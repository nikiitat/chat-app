import { User } from './user.types'

export const generateMessage = (username: User['username'], text: string) => {
  return {
    username,
    text,
    createdAt: new Date().getTime()
  }
}
