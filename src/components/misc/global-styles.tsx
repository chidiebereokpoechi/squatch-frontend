import { createGlobalStyle } from 'styled-components'
import './styles.css'

export enum BreakPoints {
  SM = '576px',
  MD = '768px',
  LG = '992px',
  XL = '1200px',
}

export const GlobalStyles = createGlobalStyle`
  @media screen and (max-width: ${BreakPoints.MD}) {
    #root {
      height: 100vh;
    }
  }
`
