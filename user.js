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

User.delete = async (connection, user_id) => {
    // vartotojas turi egzistuoti 
    let userStatus = await User.isActive(connection, user_id);
    if (!userStatus) {
        return `Vartotojas neegzistuoja, veiksmas negalimas.`
    }

    const sql = 'SELECT `id` \
                    FROM`account`\
                        WHERE `user_id` = ' + user_id;

    const [rows] = await connection.execute(sql);
    console.log(rows);

    for (const { id } of rows) {
        await Account.delete(connection, id);
    }


    // vartotojo saskaitoje/saskaitose negali buti jokio pinigu likucio
    // let balance = await Account.balance(connection, user_id, account_id);
    // if (balance !== 0) {
    //     return `Saskaitoje yra pinigu likutis, todel istrinti negalima.`
    // }
    // deaktyvuojame visas to vartotojo saskaitas


    // deaktyvuojame vartotoja (deaktyvavus vartotoja vel jo aktyvuoti negalime)
}

User.isActive = async (connection, user_id) => {
    const sql = 'SELECT `active`\
                    FROM `user`\
                    WHERE `user`.`id` =' + user_id;
    const [rows] = await connection.execute(sql);
    return rows[0].active === "TRUE";
}

module.exports = User;