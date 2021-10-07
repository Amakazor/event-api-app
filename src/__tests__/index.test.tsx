import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import Index from '../pages';
import theme from '../themes/theme';

describe('Index page', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Index />
            </ThemeProvider>,
        );
    });

    it('contains all required elements', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Index mock />
            </ThemeProvider>,
        );

        expect(screen.getAllByRole('textbox').length).toBe(3);
        expect(screen.getAllByRole('button').length).toBe(1);
        expect(container.querySelectorAll('input[type="date"]').length).toBe(1);
    });

    it('doesnt crash during input', () => {
        render(
            <ThemeProvider theme={theme}>
                <Index mock />
            </ThemeProvider>,
        );

        screen.getAllByRole('textbox').forEach(textBox => userEvent.type(textBox, 'abcd'));
    });

    it('doesnt crash when submiting without data', () => {
        render(
            <ThemeProvider theme={theme}>
                <Index mock />
            </ThemeProvider>,
        );

        fireEvent.click(screen.getByRole('button'));
    });

    it('doesnt crash when submiting with invalid data', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Index mock />
            </ThemeProvider>,
        );

        screen.getAllByRole('textbox').forEach(textBox => userEvent.type(textBox, 'abcd'));
        userEvent.type(container.querySelector('input[type="date"]') as HTMLInputElement, '1900-09-09');
        fireEvent.click(screen.getByRole('button'));
    });

    it('doesnt crash when submiting with data', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Index mock />
            </ThemeProvider>,
        );

        screen.getAllByRole('textbox').forEach(textBox => userEvent.type(textBox, 'abcd'));
        userEvent.type(container.querySelector('input[name="Email"]') as HTMLInputElement, '@test.com');
        userEvent.type(container.querySelector('input[type="date"]') as HTMLInputElement, '2022-09-09');
        fireEvent.click(screen.getByRole('button'));
    });
});
