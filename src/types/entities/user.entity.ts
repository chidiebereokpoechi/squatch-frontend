import { BaseEntity } from './base.entity'

export interface User extends BaseEntity {
  name: string
  username: string
  bio: string
  followersCount: number
  followingCount: number
}
