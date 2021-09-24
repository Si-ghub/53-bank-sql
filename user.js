const Account = require('./account');
const User = {};

/**
 * Vartotojo irasymas i duomenu baze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {string} userFirstName Vartotojo vardas.
 * @param {string} userLastName Vartotojo pavarde.
 * @returns {Promise<string>} Pranesimas apie vartotojo sukurima.
 */
User.create = async (connection, user_first_name, user_last_name) => {
    const sql = 'INSERT INTO `user`\
                    (`id`, `first_name`, `last_name`)\
                VALUES (NULL, "'+ user_first_name + '", "' + user_last_name + '")';
    const [user] = await connection.execute(sql); // irasome

    const createAccount = await Account.create(connection, user.insertId, 'EUR');
    return `"Medziu" banko vartotojas ${user_first_name} ${user_last_name} buvo sekmingai sukurtas`
}

module.exports = User;