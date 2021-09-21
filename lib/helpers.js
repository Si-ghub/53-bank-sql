const helpers = {};

helpers.createAccountNumber = (length = 18) => {
    let str = '';
    const strCharactersNumber = '0123456789';
    const strCharactersLenght = strCharactersNumber.length;
    for (let i = 0; i < length; i++) {
        str += strCharactersNumber[Math.floor(Math.random() * strCharactersLenght)];
    }
    return 'LT' + str;
}

module.exports = helpers;