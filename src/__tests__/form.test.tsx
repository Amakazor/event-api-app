import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Form from '../components/form';
import theme from '../themes/theme';

describe('Form', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Form>{testText}</Form>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <Form>{testText}</Form>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Form>
                    <div>1</div>
                    <div>2</div>
                </Form>
            </ThemeProvider>,
        );
        const divs = container.children[0].getElementsByTagName('div');
        expect(divs.length).toBe(2);
    });
});
