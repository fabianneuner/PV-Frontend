var faker = require('faker');

var database = { powers: []};

for (var i = 1; i<= 300; i++) {
  database.powers.push(faker.random.number());
}

console.log(JSON.stringify(database));
