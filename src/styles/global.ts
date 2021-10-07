import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', serif, sans-serif;
    }

    body {
        min-height: 100vh;
    }

    #root {
        min-height: 100vh;
        display: flex;
    }
`;
