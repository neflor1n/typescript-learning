import Database from "better-sqlite3";
import readlineSync from "readline-sync";

const db = new Database('mydb.sqlite');


interface Car {
    Id: number;
    Type: string;
    Model: string;
    Year: number;
};


interface CarCount {
    count: number;
}

interface RunResult {
    changes: number;
    lastInsertRowid: number;
}

// Table creating 
db.exec(`CREATE TABLE IF NOT EXISTS cars(
    Id integer primary key autoincrement,
    Type text,
    Model text,
    Year integer,
    Description text
)`);


function showMenu() {
    console.log(`
  ================== CAR MENU ==================
  1) Show all cars
  2) Add a new car
  3) Delete a car by ID
  4) Exit
  ==============================================
  `);
  }

function showAllCars() {
    const cars = db.prepare('SELECT * FROM cars ORDER BY Year').all() as Car[];
    console.log("\n📋 Список машин:");
    for (const car of cars) {
      console.log(`- ID: ${car.Id}, ${car.Type} ${car.Model} (${car.Year})`);
    }
    console.log();
  }

function addNewCar() {
    const type = readlineSync.question('Введите тип (марку): ');
    const model = readlineSync.question('Введите модель: ');
    const year = readlineSync.questionInt('Введите год: ');
    db.prepare('INSERT INTO cars (Type, Model, Year) VALUES (?, ?, ?)').run(type, model, year);
    console.log("✅ Машина добавлена!\n");
}

function deleteCar() {

    showAllCars();
    const id = readlineSync.questionInt('Введите ID машины для удаления: ');
    const result = db.prepare('delete from cars where Id = ?').run(id) as RunResult;
    if (result.changes > 0) {
        console.log("🗑️ Машина удалена!\n")
    } else {
        console.log("⚠️ Машина с таким ID не найдена.\n");
    }
}




while (true) {
    showMenu();
    const choice = readlineSync.question('Выберите опцию (1-4): ');
    switch(choice) {
        case '1':
            showAllCars();
            break;
        case '2':
            addNewCar();
            break;
        case '3':
            deleteCar();
            break;
        case '4':
            console.log("👋 Пока!");
            process.exit(0);
        default:
            console.log("❌ Неверный выбор. Попробуйте снова.\n");
    }
}