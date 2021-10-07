import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import CenteredContainer from '../components/centeredContainer';
import theme from '../themes/theme';

describe('Centered container', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <CenteredContainer>{testText}</CenteredContainer>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <CenteredContainer>{testText}</CenteredContainer>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <CenteredContainer>
                    <div>1</div>
                    <div>2</div>
                </CenteredContainer>
            </ThemeProvider>,
        );
        const divs = container.children[0].getElementsByTagName('div');
        expect(divs.length).toBe(2);
    });
});
