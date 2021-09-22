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
    // create
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
    // create
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

    // deposit
    console.log('');
    const accountDeposit1 = await Account.deposit(conn, 1, 50);
    const accountDeposit2 = await Account.deposit(conn, 3, 84);
    const accountDeposit3 = await Account.deposit(conn, 3, 16.25);

    console.log(accountDeposit1);
    console.log(accountDeposit2);
    console.log(accountDeposit3);

    // withdraw
    console.log('');
    const accountWithdraw1 = await Account.withdraw(conn, 3, 16.25);
    const accountWithdraw2 = await Account.withdraw(conn, 3, 110);

    console.log(accountWithdraw1);
    console.log(accountWithdraw2);

    // balance
    console.log('')
    const accountBalance1 = await Account.balance(conn, 3);
    const accountBalance2 = await Account.balance(conn, 4);

    console.log(accountBalance1);
    console.log(accountBalance2);



}
app.init();

module.exports = app;