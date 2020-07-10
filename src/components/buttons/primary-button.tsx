import styled from 'styled-components'
import { generateMotionButtonAttributes } from './common'
import { DarkButton } from './dark-button'

export const PrimaryButton = styled(DarkButton).attrs(
  ({ children, disabled }) =>
    generateMotionButtonAttributes(children, disabled, {
      color: '#000000',
      backgroundColor: '#fde500',
    })
)`
  background: var(--primary-color);
  color: white;
`
