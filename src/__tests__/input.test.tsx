import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import { ThemeProvider } from 'styled-components';
import Input from '../components/input';
import theme from '../themes/theme';

describe('Input', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Input value={testText} onChange={() => {}} type="text" valid label="" />
            </ThemeProvider>,
        );
    });

    it('renders correctly ', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Input value={testText} onChange={() => {}} type="text" valid label="" />
            </ThemeProvider>,
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(container.getElementsByTagName('label').length).toBe(1);
    });

    it('has valid value', () => {
        render(
            <ThemeProvider theme={theme}>
                <Input value={testText} onChange={() => {}} type="text" valid label="" />
            </ThemeProvider>,
        );

        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(testText);
    });

    it('changes', () => {
        const changes: string[] = [];

        const change = (event: ChangeEvent) => {
            changes.push((event.target as HTMLInputElement).value);
        };

        render(
            <ThemeProvider theme={theme}>
                <Input onChange={change} value="" valid label="" type="text" />
            </ThemeProvider>,
        );

        const input = screen.getByRole('textbox') as HTMLInputElement;
        userEvent.type(input, 'abcd');

        expect(changes).toStrictEqual(['a', 'b', 'c', 'd']);
    });

    it('has correct placeholder', () => {
        render(
            <ThemeProvider theme={theme}>
                <Input onChange={() => {}} value="" valid label={testText} type="text" />
            </ThemeProvider>,
        );

        expect((screen.getByRole('textbox') as HTMLInputElement).placeholder).toBe(testText);
    });

    it('renders asterisk when required', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Input onChange={() => {}} value="" valid label={testText} type="text" required />
            </ThemeProvider>,
        );

        expect(container.getElementsByTagName('span').length).toBe(2);
    });

    it("doesn't render asterisk when not required", () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Input onChange={() => {}} value="" valid label={testText} type="text" />
            </ThemeProvider>,
        );

        expect(container.getElementsByTagName('span').length).toBe(1);
    });

    it('renders without crashing when values are invalid', () => {
        render(
            <ThemeProvider theme={theme}>
                <Input onChange={() => {}} value="" valid={false} label={testText} type="text" />
            </ThemeProvider>,
        );
    });

    it('renders correctly when invalid', () => {
        const { container: invalidContainer } = render(
            <ThemeProvider theme={theme}>
                <Input onChange={() => {}} value="" valid={false} label={testText} type="text" />
            </ThemeProvider>,
        );

        const { container: validContainer } = render(
            <ThemeProvider theme={theme}>
                <Input onChange={() => {}} value="" valid label={testText} type="text" />
            </ThemeProvider>,
        );

        expect(window.getComputedStyle(invalidContainer.getElementsByTagName('input')[0]).borderColor).not.toBe(
            window.getComputedStyle(validContainer.getElementsByTagName('input')[0]).borderColor,
        );

        expect(window.getComputedStyle(invalidContainer.getElementsByTagName('span')[0]).color).not.toBe(
            window.getComputedStyle(validContainer.getElementsByTagName('span')[0]).color,
        );
    });
});
