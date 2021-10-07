import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import App from '../App';
import theme from '../themes/theme';

describe('App', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>,
        );
    });
});
