import styled from 'styled-components';

const GradientButton = styled.button`
    background: ${props => props.theme.colors.accent};
    background-image: linear-gradient(30deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    padding: 0.5rem;
    position: relative;
    z-index: 1;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    font-weight: 700;
    font-size: calc(0.5rem + 0.75vw);
    margin-bottom: calc(0.5rem + 0.5vw);
    border: none;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        &::before {
            opacity: 1;
        }
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        content: '';
        background-image: linear-gradient(30deg, ${props => props.theme.colors.accentSecondary}, ${props => props.theme.colors.accent});
        opacity: 0;
        z-index: -1;

        transition: opacity ${props => props.theme.transition} ease-in-out;
    }
`;

export default GradientButton;
