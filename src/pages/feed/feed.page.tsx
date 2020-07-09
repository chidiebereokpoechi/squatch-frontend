import { observer } from 'mobx-react'
import React from 'react'
import { PageWrapper } from '../../components'
import { usersStore } from '../../stores/users.store'

const PrintList: React.FC = observer(() => {
  const { users } = usersStore

  return (
    <ul>
      {users.map(({ name, username, id }) => (
        <li key={id}>
          <span>
            <b>{name}</b> (<em>{username}</em>)
          </span>
        </li>
      ))}
    </ul>
  )
})

export const FeedPage: React.FC = () => {
  React.useEffect(() => {
    usersStore.listUsers()
  })

  return (
    <PageWrapper>
      <h1>
        <b>Here is a list of users</b>
      </h1>
      <PrintList />
    </PageWrapper>
  )
}
