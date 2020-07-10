import { motion, MotionProps } from 'framer-motion'
import styled from 'styled-components'
import { BreakPoints } from '../misc'

export const PageWrapper = styled(motion.div).attrs(() => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as MotionProps
})`
  padding: 1.5rem;
  flex: 1;
  overflow: auto;

  @media screen and (max-width: ${BreakPoints.MD}) {
    padding: 0.5rem;
  }
`

export const EntryPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
`
