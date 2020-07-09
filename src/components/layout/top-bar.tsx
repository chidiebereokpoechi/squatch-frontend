import { motion } from 'framer-motion'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { authStore } from '../../stores/auth.store'

const StyleWrapper = styled(motion.div)`
  background: black;
  height: 4rem;
  width: 100vw;
  padding: 0.5rem 1.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    height: 2rem;
    margin-right: 1.5rem;
  }

  .name {
    color: var(--primary-color);
    font-weight: bold;
    padding: 0;
    margin: 0;
    background: transparent;
    border: none;
  }
`

export const TopBar: React.FC = observer(() => {
  const { user } = authStore

  return (
    <StyleWrapper>
      <section className="d-flex align-items-center">
        <img className="logo" src="/img/squatch-logo.svg" alt="Squatch logo" />
        <span>
          Hey{' '}
          <motion.button
            className="name"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            {user?.username}
          </motion.button>
        </span>
      </section>
    </StyleWrapper>
  )
})
