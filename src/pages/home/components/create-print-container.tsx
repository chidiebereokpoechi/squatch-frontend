import styled from 'styled-components'

export const CreatePrintContainer = styled.form`
  background: #fffffff0;
  backdrop-filter: blur(1rem);
  border: 1px solid #e2e2e2;
  border: 1px solid #2a2a2a;
  border-bottom-width: 2px;
  border-radius: 0.5rem;
  width: 40rem;

  textarea {
    border: none;
    border-radius: 0.5rem;
    padding: 1.5rem;
    resize: none;
    background: white;
  }

  footer {
    padding: 1.5rem;
    display: flex;
    justify-content: flex-end;
  }
`
