import Color from 'color'
import { createGlobalStyle } from 'styled-components'
import './styles.css'

export enum BreakPoints {
  SM = '576px',
  MD = '768px',
  LG = '992px',
  XL = '1200px',
}

export const Theme = {
  PRIMARY_COLOR: Color('#0064fd').rgb().string(),
  SECONDARY_COLOR: Color('#fde500').rgb().string(),
  VALID_COLOR: '#4cbf88',
  ERROR_COLOR: '#d82928',
}

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: ${Theme.PRIMARY_COLOR};
    --secondary-color: ${Theme.SECONDARY_COLOR};
    --error-color: ${Theme.ERROR_COLOR};
  }

  @media screen and (max-width: ${BreakPoints.MD}) {
    #root {
      height: 100vh;
    }
  }
`
