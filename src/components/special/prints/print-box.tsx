import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  MotionProps,
} from 'framer-motion'
import { observer } from 'mobx-react'
import moment from 'moment'
import React from 'react'
import { Heart } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { printsStore } from '../../../stores/prints.store'
import { Print } from '../../../types'
import { history } from '../../../util'
import { generateMotionButtonAttributes } from '../../buttons/common'
import { FormattedText } from '../../misc'

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
  display: grid;
  grid-template-columns: 5rem 1fr;
  cursor: pointer;
  width: 100%;

  aside {
    background-color: #fffffff0;
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
    cursor: initial;
  }

  header {
    display: flex;
    justify-content: space-between;
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
    color: #e91e63;
  }

  .time-ago {
    font-size: 80%;
    color: #737373;
  }

  .content {
    width: 100%;
    font-size: 0.95rem;
    white-space: pre-wrap;
    word-break: break-word;
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
      ...generateMotionButtonAttributes(children, false, {
        backgroundColor: liked ? '#ececec' : '#ffdbdb',
      }),
    }
  }
)`
  background: transparent;
  height: 2rem;
  width: 2rem;
  display: flex;
  color: ${(props) => (props.liked ? '#ff0a0a' : '#000000')};
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
  ({ print: { id, content, createdAt, creator, likeCount, userHasLiked } }) => {
    const [timeAgo, setTimeAgo] = React.useState(moment(createdAt).fromNow())

    React.useEffect(() => {
      const REFRESH_INTERVAL = 2 * 60 * 100 // 2 minutes

      const interval = setInterval(() => {
        setTimeAgo(moment(createdAt).fromNow())
      }, REFRESH_INTERVAL)

      return () => {
        clearInterval(interval)
      }
    }, [setTimeAgo, createdAt])

    return (
      <StyledDiv
        onClick={() => {
          history.push(`/prints/${id}`)
        }}
      >
        <motion.aside
          initial={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
          whileHover={{
            backgroundColor: 'rgba(115, 60, 255, 0.9)',
            borderRightColor: '#2a2a2a',
          }}
        >
          <UserImage
            whileHover={{ scale: 1.25 }}
            onClick={(e) => {
              e.stopPropagation()
              history.push(`/users/${creator.username}`)
            }}
          />
        </motion.aside>
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
            <span className="time-ago">{timeAgo}</span>
          </header>
          <main>
            <span className="content">
              <FormattedText text={content} />
            </span>
          </main>
          <footer>
            <LikeButton
              liked={!!userHasLiked}
              onClick={() => {
                printsStore[userHasLiked ? 'unlikePrint' : 'likePrint'](id)
              }}
            >
              <Heart className="icon" />
            </LikeButton>
            <span className="ml-3">{likeCount}</span>
          </footer>
        </section>
      </StyledDiv>
    )
  }
)
