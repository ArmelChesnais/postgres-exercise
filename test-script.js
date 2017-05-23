const input = process.argv[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printAllPersons(result.rows)

    client.end();
  });
});