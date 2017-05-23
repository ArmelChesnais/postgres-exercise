const input = process.argv[2];


const settings = require("./settings"); // settings.json
const pg = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

function formatDate( date ) {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function printPerson( person ) {
  console.log("- " + person.id + ": " + person.first_name + " " + person.last_name + ", born '" + formatDate(person.birthdate) + "'");
}

function printAllPersons( rows ) {
  rows.forEach(printPerson);
}

pg.select().from('famous_people').asCallback( (err, rows) => {
  printAllPersons(rows);
  pg.destroy();
});
// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [input], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     printAllPersons(result.rows)

//     client.end();
//   });
// });