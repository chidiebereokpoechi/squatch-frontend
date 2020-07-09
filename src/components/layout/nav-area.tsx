import { motion } from 'framer-motion'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { authStore } from '../../stores/auth.store'
import { NavAreaLink } from '../../types'
import { DarkButton } from '../buttons'
import { BreakPoints } from '../misc'

const StyleWrapper = styled.div`
  width: 100vw;
  display: flex;
  grid-gap: 1rem;
  padding: 1rem 1.5rem;
  flex-shrink: 0;
  background: #f9f9f9aa;
  backdrop-filter: blur(0.5rem);
  justify-content: center;
  border-bottom: 1px solid #efefef;

  .nav-area-link {
    color: #000;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }

  .active {
    color: var(--secondary-color);
  }

  .nav-item + .nav-item {
    margin-left: 1.5rem;
  }

  @media screen and (max-width: ${BreakPoints.MD}) {
    background: #f7f7f7;
    padding: 1rem;

    .nav-area-link {
      flex: 1;
      font-size: 1rem;
    }
  }
`

const links: NavAreaLink[] = [
  {
    name: 'Home',
    path: '/',
    exact: true,
  },
  {
    name: 'Explore',
    path: '/explore',
    exact: true,
  },
  {
    name: 'Profile',
    path: '/profile',
    exact: true,
  },
  {
    name: 'Messages',
    path: '/messages',
  },
]

export const NavArea = () => {
  const { logOut } = authStore

  return (
    <StyleWrapper>
      {links.map(({ name, path, exact }, i) => (
        <NavLink
          className="nav-area-link nav-item"
          exact={exact}
          to={path}
          key={i}
        >
          <motion.section
            {...{
              initial: { y: '-100%' },
              animate: { y: 0 },
              exit: { y: '100%' },
            }}
          >
            <span>{name}</span>
          </motion.section>
        </NavLink>
      ))}
      <DarkButton className="nav-item" onClick={logOut}>
        <span>Sign out</span>
      </DarkButton>
    </StyleWrapper>
  )
}
