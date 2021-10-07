import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/theme';
import Error from '../components/error';

describe('Error', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Error>{testText}</Error>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <Error>{testText}</Error>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Error>
                    <div>1</div>
                    <div>2</div>
                </Error>
            </ThemeProvider>,
        );
        const divs = container.children[0].getElementsByTagName('div');
        expect(divs.length).toBe(2);
    });
});
