const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\Users\Laura\Desktop\Facultate\Web\Database\person.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the person database.');   
});




db.close((err) => { 
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
}
);