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
 * Pinigu inesimas i nurodyta saskaita.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} account_id Vartotojo saskaitos ID.
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
        return `Nepakanka lesu, pinigu isemimas negalimas.`
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

/**
 * Pinigu pervedimas tarp skirtingu vartotoju ir skirtingu saskaitu.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} sender_account_id Siuntejo saskaitos ID.
 * @param {number} receiver_account_id Gavejo saskaitos ID.
 * @param {number} amount Pervedimo suma.
 * @returns {Promise<string>} Pranesimas apie sekmingai/nesekmingai atlikta pavedima.
 */
Account.moneyTransfer = async (connection, sender_account_id, receiver_account_id, amount) => {
    let balance = await Account.balance(connection, sender_account_id);
    if (amount > balance) {
        return `Nepakanka lesu, pavedimas negalimas.`
    }
    let transferedAmount = await Account.withdraw(connection, sender_account_id, amount);
    let receivedAmount = await Account.deposit(connection, receiver_account_id, amount);
    return `Pinigai pervesti i nurodyta saskaita.`
}

/**
 * Saskaitos istrynimas, jei saskaitos likutis = 0.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} account_id Saskaitos ID.
 * @returns {Promise<string>} Pranesimas apie sekminga/nesekminga saskaitos istrynima.
 */
Account.delete = async (connection, account_id) => {
    let accountStatus = await Account.isActive(connection, account_id);
    if (!accountStatus) {
        return `Pavedimas negalimas, nes saskaita neegzistuoja.`
    }
    let balance = await Account.balance(connection, account_id);
    if (balance !== 0) {
        return `Saskaitoje yra lesu, todel istrinti negalima.`
    }
    const sql = 'UPDATE`account`\
                    SET `active` = "FALSE"\
                    WHERE`account`.`id`=' + account_id;

    const [rows] = await connection.execute(sql);
    return `Saskaita sekmingai istrinta.`
}

/**
 * Ar aktyvi saskaita?
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} account_id Saskaitos ID.
 * @returns  {Promise<string>} Pranesimas apie aktyvia/neaktyvia saskaita (TRUE/FALSE).
 */
Account.isActive = async (connection, account_id) => {
    const sql = 'SELECT `active`\
                    FROM `account`\
                    WHERE `account`.`id` =' + account_id;
    const [rows] = await connection.execute(sql);
    return rows[0].active === "TRUE";
}

module.exports = Account;
