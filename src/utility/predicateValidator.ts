const validateWithPredicate = <T>(value: T, predicate: (value: T) => boolean, callbackIfError: Function, callbackIfNoError: Function) => {
    if (predicate(value)) {
        callbackIfNoError();
    } else {
        callbackIfError();
    }
};

export default validateWithPredicate;
