import styled from 'styled-components';

const Form = styled.form`
    background: ${props => props.theme.colors.secondary};
    padding: calc(1rem + 1vw);
    border-radius: 0.5rem;
    border: 0.125rem solid ${props => props.theme.colors.border};
`;

export default Form;
