import { HTMLInputTypeAttribute, ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface InputProps {
    onChange: ChangeEventHandler;
    value: string;

    type: HTMLInputTypeAttribute;
    label: string;
    required?: boolean;
    valid: boolean;
    name?: string;
}

const StyledInput = styled.input<{ valid: boolean }>`
    height: 2rem;
    padding: 0.25rem;
    font-size: 1rem;
    border: 0.0625rem solid ${props => (props.valid ? props.theme.colors.border : props.theme.colors.required)};
`;

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 1rem;
`;

const StyledLabelText = styled.span<{ valid: boolean }>`
    font-size: 0.9rem;
    color: ${props => (props.valid ? 'inherit' : props.theme.colors.required)};
`;

const Required = styled.span`
    color: ${props => props.theme.colors.required};
    position: absolute;
    right: 0;
`;

const Input = (props: InputProps) => {
    const { type, value, onChange, label, required, valid, name } = props;

    return (
        <StyledLabel>
            <StyledLabelText valid={valid}>{label}</StyledLabelText>
            {required && <Required>*</Required>}
            <StyledInput type={type} value={value} onChange={onChange} required={required} placeholder={label} valid={valid} name={name} />
        </StyledLabel>
    );
};

Input.defaultProps = {
    required: false,
    name: '',
};

export default Input;
