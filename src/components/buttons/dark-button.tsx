import { motion } from 'framer-motion'
import styled from 'styled-components'
import { generateMotionButtonAttributes } from './common'

export const DarkButton = styled(motion.button).attrs(
  ({ children, disabled }) =>
    generateMotionButtonAttributes(children, disabled, {
      color: '#000000',
      backgroundColor: '#fde500',
    })
)`
  background: #000000;
  height: 2rem;
  border-radius: 1rem;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0 1rem;
  display: flex;
  align-items: center;

  :disabled {
    background: #e2e2e2dd;
    backdrop-filter: blur(0.25rem);
    color: #616161;
  }

  .icon {
    height: 1rem;
    width: 1rem;
    stroke-width: 3px;
    stroke-linecap: square;
  }

  .icon + * {
    margin-left: 0.25rem;
  }
`
