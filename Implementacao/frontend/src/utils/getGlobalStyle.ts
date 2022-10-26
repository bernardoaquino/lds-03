import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    border: none;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  body,
  button { 
    font-family: 'Open Sans', Helvetica, Sans-Serif;
  }

  p {
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
`;
 
export default GlobalStyle;