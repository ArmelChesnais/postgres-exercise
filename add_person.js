const input = process.argv.slice(2);


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

// console.log(input[0], input[1], new Date(input[2]));

pg('famous_people').insert( { first_name: input[0], last_name: input[1], birthdate: new Date(input[2]) } ).asCallback( () => {
  console.log ( input[0], input[1], new Date(input[2]), "has been added!" );
  pg.destroy();
});