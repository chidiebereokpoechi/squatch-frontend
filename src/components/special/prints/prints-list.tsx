import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Print } from '../../../types'
import { BreakPoints } from '../../misc'
import { PrintBox } from './print-box'

const StyledDiv = styled(motion.div)`
  width: 35rem;

  @media screen and (max-width: ${BreakPoints.SM}) {
    width: 100%;
  }
`

interface PrintsListProps {
  prints: Print[]
}

export const PrintsList: React.FC<PrintsListProps> = ({ prints }) => {
  return (
    <StyledDiv
      initial={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '1rem',
        marginTop: '1rem',
      }}
    >
      <AnimatePresence>
        {prints.map((print) => (
          <PrintBox print={print} key={print.id} />
        ))}
      </AnimatePresence>
    </StyledDiv>
  )
}
