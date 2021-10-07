import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import GradientButton from '../components/gradientButton';
import theme from '../themes/theme';

describe('Gradient button', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <GradientButton>{testText}</GradientButton>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <GradientButton>{testText}</GradientButton>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <GradientButton>
                    <div>1</div>
                    <div>2</div>
                </GradientButton>
            </ThemeProvider>,
        );
        const divs = container.children[0].getElementsByTagName('div');
        expect(divs.length).toBe(2);
    });

    it('clicks correctly', () => {
        let clicked = false;
        const onClick = () => {
            clicked = true;
        };

        render(
            <ThemeProvider theme={theme}>
                <GradientButton onClick={onClick}>text</GradientButton>
            </ThemeProvider>,
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(clicked).toBeTruthy();
    });
});
