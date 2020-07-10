import { MotionProps, TargetAndTransition } from 'framer-motion'
import React from 'react'

export const generateMotionButtonAttributes = (
  _children: React.ReactNode,
  disabled: boolean | undefined,
  whileHover: TargetAndTransition = {},
  whileTap: TargetAndTransition = {}
): MotionProps => {
  const children = (
    <React.Fragment>
      {disabled ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        _children
      )}
    </React.Fragment>
  )

  return {
    whileHover: {
      scale: 1.125,
      ...whileHover,
    },
    whileTap: {
      scale: 0.9,
      ...whileTap,
    },
    children,
  } as MotionProps
}
