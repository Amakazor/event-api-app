import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/theme';
import Success from '../components/success';

describe('Success', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Success>{testText}</Success>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <Success>{testText}</Success>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Success>
                    <div>1</div>
                    <div>2</div>
                </Success>
            </ThemeProvider>,
        );
        const divs = container.children[0].getElementsByTagName('div');
        expect(divs.length).toBe(2);
    });
});
