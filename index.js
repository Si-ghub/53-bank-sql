const db = require('./db');
const User = require('./user');
const Account = require('./account');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'bank',
    });


    // LOGIC BELOW

    // USER
    console.log('');
    const createUser1 = await User.create(conn, 'Laukinis', 'Berzas');
    const createUser2 = await User.create(conn, 'Pasiutes', 'Klevas');
    const createUser3 = await User.create(conn, 'Nulauztas', 'Uosis');
    const createUser4 = await User.create(conn, 'Didingas', 'Azuolas');
    const createUser5 = await User.create(conn, 'Zydinti', 'Liepa');


    console.log(createUser1);
    console.log(createUser2);
    console.log(createUser3);
    console.log(createUser4);
    console.log(createUser5);





    // ACCOUNT
    console.log('');
    const createAccount1 = await Account.create(conn, 1, 'EUR');
    const createAccount2 = await Account.create(conn, 2, 'EUR');
    const createAccount3 = await Account.create(conn, 3, 'EUR');
    const createAccount4 = await Account.create(conn, 4, 'EUR');
    const createAccount5 = await Account.create(conn, 5, 'EUR');


    console.log(createAccount1);
    console.log(createAccount2);
    console.log(createAccount3);
    console.log(createAccount4);
    console.log(createAccount5);

}
app.init();

module.exports = app;