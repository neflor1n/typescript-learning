import * as fs from 'fs';
import * as readlineSync from 'readline-sync';


interface Pass {
    id: number;
    login: string;
    password: string;
}

const DATA_FILE = 'pass_management.json';

function loadPasses(): Pass[] {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
    }
const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
}


function savePasses(passes: Pass[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(passes, null, 2), 'utf-8');
} 


function showPasse(passes: Pass[]) {
    console.log('\n List of logins and passwords: ')
    if (passes.length === 0) {
        console.log("- Clear -");
        return;
    }
    for (const pass of passes) {
        console.log(`${pass.id}) Login & pass: ${pass.login} - ${pass.password}`);

    }
    console.log()
}

function addPass(passes: Pass[]) {
    const login = readlineSync.question("Entry ur login: ");
    const pass = readlineSync.question("Enter ur password: ");
    const maxId = passes.length > 0 ? Math.max(...passes.map(p => p.id)) : 0;

    const newPass: Pass = {
        id: maxId + 1,
        login: login,
        password: pass
    };
    passes.push(newPass);
    savePasses(passes);
    console.log("Data was added!");
}


function deletePass(passes: Pass[]) {
    showPasse(passes);
    const id = readlineSync.questionInt('Enter Id which u wanna delete: ');
    const updated = passes.filter(p => p.id !== id);

    if (updated.length < passes.length) {
        savePasses(updated);
        console.log("Data deleted");
    } else {
        console.log("Data not found!");
    }
    return updated;
}

let passes = loadPasses();

while (true) {
    console.log(`
        =================== DATA ===================
        1) Show all datas
        2) Add new data
        3) Delete data
        4) Exit
        =============================================
        `);

    const choice = readlineSync.question("Choose option (1-4): ");
    switch (choice) {
        case '1':
            showPasse(passes);
            break;
        case '2':
            addPass(passes);
            break;
        case '3':
            passes = deletePass(passes);
            break;
        case '4':
            console.log('Goodbye!');
            process.exit(0);
        default:
            console.log("Error! Wrong choice!");
    }
}


