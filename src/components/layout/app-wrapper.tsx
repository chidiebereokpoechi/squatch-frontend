import styled from 'styled-components'
import { BreakPoints } from '../misc'

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;

    @media screen and (max-width: ${BreakPoints.MD}) {
      flex-direction: column-reverse;
    }
  }
`
