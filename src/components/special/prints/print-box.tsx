import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  MotionProps,
} from 'framer-motion'
import { matches, some } from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'
import { Heart } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authStore } from '../../../stores/auth.store'
import { printsStore } from '../../../stores/prints.store'
import { Print } from '../../../types'
import { history } from '../../../util'
import { generateMotionButtonAttributes } from '../../buttons/common'

export const StyledDiv = styled(motion.div).attrs(
  () =>
    ({
      positionTransition: true,
      initial: { opacity: 0, y: 50, scale: 0.3 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
    } as MotionProps)
)`
  border: 1px solid #e2e2e2;
  border: 1px solid #2a2a2a;
  border-bottom-width: 2px;
  border-radius: 0.5rem;
  width: 40rem;
  display: grid;
  grid-template-columns: 5rem 1fr;
  cursor: pointer;

  aside {
    background: #fffffff0;
    backdrop-filter: blur(1rem);
    padding: 1.5rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-right: 1px solid #efefef;
  }

  .body {
    background: #fffffff0;
    backdrop-filter: blur(0.5rem);
    padding: 1.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  header {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
  }

  main {
    padding: 0;
  }

  footer {
    height: 2rem;
    display: flex;
    align-items: center;
  }

  .username {
    color: #8b8f98;
  }

  .content {
    width: 100%;
    font-size: 0.95rem;
    white-space: pre-wrap;
    word-break: break-all;
    overflow: hidden;
  }
`

const UserImage = styled(motion.div)`
  background: #ececec;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
`

type LikeButtonType = ForwardRefComponent<
  HTMLButtonElement,
  { liked: boolean } & HTMLMotionProps<'button'>
>

const LikeButton = styled<LikeButtonType>(motion.button).attrs(
  ({ children, liked }) => {
    return {
      ...generateMotionButtonAttributes(
        children,
        false,
        {
          color: liked ? '#000000' : '#ff0a0a',
          backgroundColor: liked ? '#ececec' : '#ffdbdb',
        },
        {}
      ),
      initial: { color: liked ? '#ff0a0a' : '#aaaaaa' },
    }
  }
)`
  background: transparent;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100%;
  margin: 0 -0.5rem;

  .icon {
    height: 1rem;
    width: 1rem;
  }
`

interface Props {
  print: Print
}

export const PrintBox: React.FC<Props> = observer(
  ({ print: { id, content, creator, likers } }) => {
    const liked = some(likers, matches({ id: authStore.user?.id as number }))

    return (
      <StyledDiv
        onClick={() => {
          history.push(`/prints/${id}`)
        }}
      >
        <aside>
          <UserImage
            whileHover={{ scale: 1.25 }}
            onClick={(e) => {
              e.stopPropagation()
              history.push(`/users/${creator.username}`)
            }}
          />
        </aside>
        <section
          className="body"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <header>
            <span>
              <b>{creator.name}</b>{' '}
              <Link to={`/users/${creator.username}`} className="username">
                @{creator.username}
              </Link>
            </span>
          </header>
          <main>
            <span className="content">{content}</span>
          </main>
          <footer>
            <LikeButton
              liked={liked}
              onClick={() => {
                printsStore.likePrint(id)
              }}
            >
              <Heart className="icon" />
            </LikeButton>
          </footer>
        </section>
      </StyledDiv>
    )
  }
)
