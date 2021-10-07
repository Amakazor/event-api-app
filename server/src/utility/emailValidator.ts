const validateEmail = (email: string) => email.match(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/);

export default validateEmail;
