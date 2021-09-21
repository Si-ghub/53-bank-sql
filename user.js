const User = {};

User.create = async (connection, userFirstName, userLastName) => {
    const sql = 'INSERT INTO `user`\
                    (`id`, `first_name`, `last_name`)\
                VALUES (NULL, "'+ userFirstName + '", "' + userLastName + '")';
    const [rows] = await connection.execute(sql);
    return `"Medziu" banko vartotojas ${userFirstName} ${userLastName} buvo sekmingai sukurtas`
}



module.exports = User;