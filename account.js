const helpers = require('./lib/helpers');

const Account = {};

Account.create = async (connection, userID, currency) => {
    const userAccountNumber = helpers.createAccountNumber();
    const sql = 'INSERT INTO `account`\
                (`id`, `user_id`, `account_number`, `amount`, `currency`)\
               VALUES (NULL, "'+ userID + '", "' + userAccountNumber + '", 0 , "' + currency + '")'
    const [rows] = await connection.execute(sql);
    return `Nauja saskaita nr: ${userAccountNumber} sukurta vartotojui su ID ${userID}, saskaitos likutis 0 ${currency}.`
}

module.exports = Account;