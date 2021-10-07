import { ThemeProvider } from 'styled-components';
import EndpointContextProvider from './context/endpointContext';
import Index from './pages';
import theme from './themes/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <EndpointContextProvider>
                <Index />
            </EndpointContextProvider>
        </ThemeProvider>
    );
}

export default App;
