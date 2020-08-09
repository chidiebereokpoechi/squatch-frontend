import styled from 'styled-components'
import { Theme } from '../misc'
import { generateMotionButtonAttributes } from './common'
import { DarkButton } from './dark-button'

export const PrimaryButton = styled(DarkButton).attrs(
  ({ children, isLoading, disabled, ...props }) =>
    generateMotionButtonAttributes({
      children,
      disabled,
      isLoading,
      whileHover: {
        color: '#000000',
        backgroundColor: Theme.SECONDARY_COLOR,
      },
      props,
    }),
)`
  background: var(--primary-color);
  color: white;
`
