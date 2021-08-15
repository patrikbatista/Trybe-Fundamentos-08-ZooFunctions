const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((specie, index) => specie.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const animalFind = data.species.find((specie) => specie.name === animal);
  return animalFind.residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return data.employees.find((employee) =>
    (employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const returnEmployee = data.employees.some((employee) => employee.managers.includes(id));
  return returnEmployee;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(speciesName) {
  // seu código aqui
  const allAnimals = data.species.reduce((acc, crr) => {
    acc[crr.name] = crr.residents.length;
    return acc;
  }, {});

  if (speciesName === undefined) return allAnimals;
  return allAnimals[speciesName];
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return Adult * data.prices.Adult + Senior * data.prices.Senior + Child * data.prices.Child;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  const dias = Object.keys(data.hours).reduce((acc, crr, index) => {
    const valores = Object.values(data.hours)[index];
    acc[crr] = `Open from ${valores.open}am until ${valores.close - 12}pm`;
    return acc;
  }, {});
  dias.Monday = 'CLOSED';
  // console.log(dias);
  if (dayName === undefined) return dias;
  return { [dayName]: dias[dayName] };
}
getSchedule();

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const findEmployee = data.employees.find((employee) => employee.id === id);
  const firstAnimal = data.species.find((specie) => specie.id === findEmployee.responsibleFor[0]);
  const oldAnimal = firstAnimal.residents.sort((a, b) => b.age - a.age);
  return Object.values(oldAnimal[0]);
}

function increasePrices(percentage) {
  // seu código aqui
  const newPriceArray = Object.values(data.prices).reduce((acc, preco) => {
    let newPrice = preco;
    newPrice *= (1 + percentage / 100);
    newPrice += 0.001;
    newPrice = Number(newPrice.toFixed(2));
    acc.push(newPrice);
    return acc;
  }, []);
  const newObjPrice = {};
  Object.keys(data.prices).forEach((key, index) => {
    newObjPrice[key] = newPriceArray[index];
  });
  return Object.assign(data.prices, newObjPrice);
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
