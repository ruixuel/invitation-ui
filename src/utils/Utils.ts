export const isNil = (obj: unknown) => {
    return obj === null || obj === undefined;
};

export const isEmptyString = (str: string) => {
    return isNil(str) || str === "";
};

export const validateStringLength = (str: string, len = 3) => {
    return !isEmptyString(str) && str.length >= len;
};

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
};
