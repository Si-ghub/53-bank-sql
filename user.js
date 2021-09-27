const Account = require('./account');
const User = {};

/**
 * Vartotojo irasymas i duomenu baze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {string} userFirstName Vartotojo vardas.
 * @param {string} userLastName Vartotojo pavarde.
 * @returns {Promise<object>} Sukuriam vartotojo objekta.
 */
User.create = async (connection, user_first_name, user_last_name) => {
    const sql = 'INSERT INTO `users`\
                    (`id`, `first_name`, `last_name`)\
                VALUES (NULL, "'+ user_first_name + '", "' + user_last_name + '")';
    const [user] = await connection.execute(sql); // irasome

    const createAccount = await Account.create(connection, user.insertId, 'EUR');
    return `"Medziu" banko vartotojas ${user_first_name} ${user_last_name} buvo sekmingai sukurtas`
}

// deaktyvuojame vartotoja (deaktyvavus vartotoja vel jo aktyvuoti negalime)
User.delete = async (connection, user_id) => {
    // vartotojas turi egzistuoti 
    let userStatus = await User.isActive(connection, user_id);
    if (!userStatus) {
        return `Vartotojas neegzistuoja, veiksmas negalimas.`
    }

    const sql = 'SELECT `id` \
                    FROM`accounts`\
                        WHERE `user_id` = ' + user_id;

    const [rows] = await connection.execute(sql);
    console.log(rows);

    // deaktyvuojame visas to vartotojo saskaitas
    for (const { id } of rows) {
        await Account.delete(connection, id);
    }
}

User.isActive = async (connection, user_id) => {
    const sql = 'SELECT `active`\
                    FROM `users`\
                    WHERE `users`.`id` =' + user_id;
    const [rows] = await connection.execute(sql);
    return rows[0].active === "TRUE";
}

module.exports = User;