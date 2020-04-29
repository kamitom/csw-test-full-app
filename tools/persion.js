// pratice module exports

const faker = require('faker');

let person_inside = {
  id: 100,
  name: faker.name.findName(),
  dep: faker.commerce.department(),
};

const person = (testme) => {
  if (testme == 100) {
    person_inside.dep = faker.commerce.department();
  } else {
    person_inside.dep = 'not 100, ' + faker.commerce.department();
  }

  return person_inside
};

module.exports = person;
