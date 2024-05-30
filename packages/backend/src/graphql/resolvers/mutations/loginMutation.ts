import { User } from '../../../models/User'
import bcrypt from 'bcrypt'

export const login = async (_, args, _context, _info) => {
  console.log(args)

  const { email, password } = args.login
  const user = await User.findOne({ email })
  const comparation = await bcrypt.compare(password, user.password)

  if (user && comparation) {
    return user
  }

  throw new Error('Invalid credentials')
}
