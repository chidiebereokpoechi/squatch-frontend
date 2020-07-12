import { BaseEntity } from './base.entity'
import { User } from './user.entity'

export interface Print extends BaseEntity {
  content: string
  creator: User
  rendered: string
  likeCount: number
  likers?: User[]
  userHasLiked?: boolean
  actedOn?: boolean
}
