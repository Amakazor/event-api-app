const validateTimestamp = (timestamp: string | number) => timestamp.toString().match(/^\d+$/);

export default validateTimestamp;
