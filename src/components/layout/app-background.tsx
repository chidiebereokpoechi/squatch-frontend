import styled from 'styled-components'

export const AppBackground = styled.div`
  background: white;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;

  ::after {
    display: block;
    content: '';
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: url('/img/tree-pattern.svg');
    background-size: 400px;
    opacity: 0.075;
  }
`
