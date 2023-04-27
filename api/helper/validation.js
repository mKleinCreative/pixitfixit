const isUndefined = (val) => {
    if ((val === undefined && typeof val == 'undefined')) {
        return true;
    }

    return false;
}

const isEmpty = (val) => {
    if (val.length === 0) {
        return true;
    }

    return false;
}

const isValidNumber = (val) => {
    if (typeof val !== 'number') {
        return false;
    }

    if (isNaN(val)) {
        return false;
    }

    return true;
}

const isValidString = (val) => {
    if (typeof val !== 'string') {
        return false;
    }

    if (val === null) {
        return false;
    }

    if (isEmpty(val)) {
        return false;
    }

    if (val.trim().length === 0) {
        return false;
    }

    return true;
}

const isValidObject = (val) => {
    if (typeof val !== 'object') {
        return false;
    }

    if (val === null) {
        return false;
    }

    return true;
}

const isValidArray = (val) => {
    if (!isValidObject(val)) {
        return false;
    }

    if (isEmpty(val)) {
        return false;
    }

    return true;
}

const isValidURL = (val) => {
    if (val.match(/(http:\/\/www){1}.[\w.]{5,}(\.com){1}/) === null) {
        return false;
    }

    return true;
}

module.exports = {
    isUndefined,
    isValidNumber,
    isValidString,
    isValidObject,
    isValidArray,
    isValidURL
};
