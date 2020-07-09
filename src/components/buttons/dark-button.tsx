import { motion, MotionProps } from 'framer-motion'
import styled from 'styled-components'

export const DarkButton = styled(motion.button).attrs(
  () =>
    ({
      whileHover: {
        scale: 1.125,
        color: '#000000',
        backgroundColor: '#fde500',
      },
      whileTap: {
        scale: 0.9,
        color: '#ffffff',
        backgroundColor: '#0064fd',
      },
    } as MotionProps)
)`
  background: #000000;
  height: 2rem;
  border-radius: 1rem;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0 1rem;
`
