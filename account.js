const helpers = require('./lib/helpers');

const Account = {};

/**
 * Vartotojo saskaitos sukurimas
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} user_id Saskaitos vartotojo ID.
 * @param {string} currency Saskaitos valiuta.
 * @returns {Promise<string>} Pranesimas apie saskaitos sukurima vartotojui su nurodytu ID.
 */
Account.create = async (connection, user_id, currency) => {
    const userAccountNumber = helpers.createAccountNumber();
    const sql = 'INSERT INTO `account`\
                (`id`, `user_id`, `account_number`, `balance`, `currency`)\
               VALUES (NULL, "'+ user_id + '", "' + userAccountNumber + '", 0 , "' + currency + '")'
    const [rows] = await connection.execute(sql);
    return `Nauja saskaita nr: ${userAccountNumber} sukurta vartotojui su ID ${user_id}, saskaitos likutis 0 ${currency}.`
}

/**
 * Pinigu inesimas i nurodyta saskaita
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} account_id Vartotojo saskaitos ID
 * @param {number} amount Pinigu suma.
 * @returns {Promise<string>} Pranesimas apie inesta pinigu suma.
 */
Account.deposit = async (connection, account_id, amount) => {
    const sql = 'UPDATE `account` \
                    SET `balance` =`balance` + ' + amount + '\
                    WHERE `id` = ' + account_id;
    const [rows] = await connection.execute(sql);
    return `Pinigu suma: ${amount} sekmingai inesta i saskaita.`
}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} account_id Vartotojo saskaitos ID.
 * @param {number} amount Pinigu suma.
 * @returns {Promise<string>} Pranesimas apie isimta pinigu suma.
 */
Account.withdraw = async (connection, account_id, amount) => {
    let balance = await Account.balance(connection, account_id);
    if (amount > balance) {
        return `Nepakanka lesu`
    }
    const sql = 'UPDATE `account` \
                    SET `balance` = `balance` - ' + amount + '\
                    WHERE id = ' + account_id;
    const [rows] = await connection.execute(sql);
    return `Is saskaitos isimta suma: ${amount}.`
}

/**
 * Supazindina su saskaitos balansu.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} account_id Vartotojo saskaitos ID.
 * @returns {Promise<number>} Informacija apie saskaitos likuti/balansa.
 */
Account.balance = async (connection, account_id) => {
    const sql = 'SELECT * FROM `account` \
                    WHERE id = ' + account_id;
    const [rows] = await connection.execute(sql);
    return rows[0].balance;
}

module.exports = Account;
