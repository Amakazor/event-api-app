import { createContext, ReactChild } from 'react';

export const EndpointContext = createContext<{ endpoints: { event: { post: string } } }>({ endpoints: { event: { post: '' } } });

const EndpointContextProvider = (props: { children?: ReactChild | ReactChild[] }) => {
    const { children } = props;
    return <EndpointContext.Provider value={{ endpoints: { event: { post: '/api/v1/event' } } }}>{children}</EndpointContext.Provider>;
};

EndpointContextProvider.defaultProps = {
    children: [],
};

export default EndpointContextProvider;
