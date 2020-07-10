import styled from 'styled-components'

const IMAGE_URL =
  // 'https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80'
  'https://images.unsplash.com/photo-1535083252457-6080fe29be45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'
// 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'
// 'https://images.unsplash.com/photo-1572851899307-3c130a64e831?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'

export const AppBackground = styled.div`
  background: var(--secondary-color);
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
    /* opacity: 0.075; */
    /* background: url(${IMAGE_URL});
    background-size: cover;
    background-position-y: bottom; */
  }
`
