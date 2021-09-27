const db = require('./db');
const User = require('./user');
const Account = require('./account');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'bank1',
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

    // // ACCOUNT
    // // create
    // console.log('');
    // const createAccount1 = await Account.create(conn, 1, 'EUR');
    const createAccount2 = await Account.create(conn, 2, 'EUR');
    // const createAccount3 = await Account.create(conn, 3, 'EUR');
    // const createAccount4 = await Account.create(conn, 4, 'EUR');
    // const createAccount5 = await Account.create(conn, 5, 'EUR');
    // const createAccount6 = await Account.create(conn, 5, 'EUR');

    // console.log(createAccount1);
    console.log(createAccount2);
    // console.log(createAccount3);
    // console.log(createAccount4);
    // console.log(createAccount5);
    // console.log(createAccount6);


    // // deposit
    console.log('');
    const accountDeposit1 = await Account.deposit(conn, 1, 50);
    const accountDeposit2 = await Account.deposit(conn, 3, 84);
    const accountDeposit3 = await Account.deposit(conn, 3, 16.25);

    console.log(accountDeposit1);
    console.log(accountDeposit2);
    console.log(accountDeposit3);

    // // withdraw
    console.log('');
    const accountWithdraw1 = await Account.withdraw(conn, 3, 16.25);
    const accountWithdraw2 = await Account.withdraw(conn, 3, 110);

    console.log(accountWithdraw1);
    console.log(accountWithdraw2);

    // // balance
    console.log('')
    const accountBalance1 = await Account.balance(conn, 3);
    const accountBalance2 = await Account.balance(conn, 4);

    console.log(accountBalance1);
    console.log(accountBalance2);

    // // money transfer
    console.log('')
    const moneyTransfer1 = await Account.moneyTransfer(conn, 3, 4, 25);
    const moneyTransfer2 = await Account.moneyTransfer(conn, 4, 2, 100);

    console.log(moneyTransfer1);
    console.log(moneyTransfer2);

    // // delete account
    console.log('')
    const deleteAccount1 = await Account.delete(conn, 1);
    const deleteAccount2 = await Account.delete(conn, 2);

    console.log(deleteAccount1);
    console.log(deleteAccount2);

    // delete user
    const deleteUser1 = await User.delete(conn, 3);

    console.log(deleteUser1);

    // // is active account?
    // let accountIsactive = await Account.isActive(conn, 1);

    // console.log(accountIsactive);
}

app.init();

module.exports = app;