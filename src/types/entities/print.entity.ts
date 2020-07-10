import { BaseEntity } from './base.entity'
import { User } from './user.entity'

export interface Print extends BaseEntity {
  content: string
  creator: User
  likeCount: number
  likers?: User[]
}
