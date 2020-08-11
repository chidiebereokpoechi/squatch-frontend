import { motion } from 'framer-motion'
import { observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authStore } from '../../stores/auth.store'

const StyleWrapper = styled(motion.div)`
  background: black;
  height: 4rem;
  width: 100%;
  padding: 0.5rem 1.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.25rem solid white;

  .logo {
    height: 2rem;
    margin-right: 1.5rem;
  }

  .name {
    display: inline-block;
    color: var(--secondary-color);
    font-weight: bold;
    padding: 0;
    margin: 0;
    background: transparent;
    border: none;
  }
`

const AnimatedLink = styled(Link)`
  color: var(--secondary-color) !important;
`

export const TopBar: React.FC = observer(() => {
  const { user } = authStore

  return (
    <StyleWrapper>
      <section className="d-flex align-items-center">
        <motion.img
          drag
          dragConstraints={{ top: 0, left: 0, bottom: 0, right: 10 }}
          className="logo"
          src="/img/squatch-logo.svg"
          alt="Squatch logo"
        />
        <span>
          Hey{' '}
          <motion.span className="name" whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }}>
            <AnimatedLink to="/profile">{user?.username}</AnimatedLink>
          </motion.span>
        </span>
      </section>
    </StyleWrapper>
  )
})
