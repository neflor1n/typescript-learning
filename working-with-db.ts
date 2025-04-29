import Database from "better-sqlite3";

console.log("Program starts");

const db = new Database('mydb.sqlite')

interface Car {
    Id: number;
    Type: string;
    Model: string;
    Year: number;
}

interface CarCount {
    count: number;
}

db.exec(`CREATE TABLE IF NOT EXISTS cars (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Type TEXT,
    Model TEXT,
    Year INTEGER
  )`);


const insert = db.prepare(`Insert into cars (Type, Model, Year) values (?,?,?)`);

const existingCars = db.prepare('Select Count(*) as count from cars').get() as CarCount;

if (existingCars.count == 0) {
    insert.run('Audi', 'r8', 2001);
    insert.run('BMW', 'm3', 2018);
    insert.run('Tesla', 'Model S', 2021);
    console.log("Добавлены стартовые машины 🚀");
};

const carsSorted = db.prepare('Select * from cars Order by Year ASC').all() as Car[];

console.log("✅ Машины по году выпуска:");
for (const car of carsSorted) {
    console.log(`- ${car.Type} ${car.Model} (${car.Year})`);
}

const modelToSearch = 'r8';
const foundCars = db.prepare('Select * from cars where Model = ?').all(modelToSearch) as Car[];

console.log(`\n🔎 Машины с моделью "${modelToSearch}":`);

for (const car of foundCars) {
    console.log(`- ${car.Type} ${car.Model} (${car.Year})`);
}