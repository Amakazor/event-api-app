import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HorizontalCenter from '../components/horizontalCenter';
import theme from '../themes/theme';

describe('Horizontal center ', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalCenter>{testText}</HorizontalCenter>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalCenter>{testText}</HorizontalCenter>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <HorizontalCenter>
                    <div>1</div>
                    <div>2</div>
                </HorizontalCenter>
            </ThemeProvider>,
        );
        const divs = container.children[0].getElementsByTagName('div');
        expect(divs.length).toBe(2);
    });
});
