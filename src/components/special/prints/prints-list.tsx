import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Print } from '../../../types'
import { PrintBox } from './print-box'

interface PrintsListProps {
  prints: Print[]
}

export const PrintsList: React.FC<PrintsListProps> = ({ prints }) => {
  return (
    <motion.div
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
    </motion.div>
  )
}
