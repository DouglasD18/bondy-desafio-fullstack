import { GraphQLResolveInfo } from 'graphql'
import { login } from './loginMutation'

export default {
  login: (parent: any, args: any, context: any, info: GraphQLResolveInfo) =>
    login(parent, args, context, info),
  loginTest: () => {
    return true
  },
}
