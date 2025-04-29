import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import { json } from 'stream/consumers';

interface Todo {
    id: number;
    text: string;
    done: boolean;
};

const DATA_FILE = 'ToDo.json';

function loadTodos(): Todo[] {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  }


function saveTodos(todos: Todo[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
}

function showTodos(todos: Todo[]) {
    console.log('\n List of ToDo:');
    if (todos.length === 0){
        console.log("- Clear -");
        return;
    }
    for (const todo of todos) {
        const status = todo.done ? '✅' : '❌';
        console.log(`${todo.id}) ${status} ${todo.text}`);
    }
    console.log()
}



function addTodo(todos: Todo[]) {
    const text = readlineSync.question('Enter a new task: ');
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;

    const newTodo: Todo = {
        id: maxId + 1,
        text,
        done: false
      };
    todos.push(newTodo);
    saveTodos(todos);
    console.log("The task was added")
}

function toggleTodo(todos: Todo[]) {
    const id = readlineSync.questionInt('Enter the task ID to mark: ')
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.done = !todo.done;
        saveTodos(todos);
        console.log(`The task "${todo.text}" is now ${todo.done ? 'done' : 'not done'}.\n`);
    } else {
        console.log("Task not found!")
    }
}

function deleteTodo(todos: Todo[]) {
    const id = readlineSync.questionInt('Enter the task ID to delete: ');
    const updated = todos.filter(t => t.id !== id);

    if (updated.length < todos.length) {
        saveTodos(updated);
        console.log("Task deleted");
    } else {
        console.log("Task not found!");
    }
    return updated;
}

let todos = loadTodos();

while (true) {
    console.log(`
        =================== TO-DO ===================
        1) Show all tasks
        2) Add new task
        3) Mark as done / unmark as done 
        4) Delete task
        5) Exit
        =============================================
        `);

        const choice = readlineSync.question('Choose option (1-5): ');

        switch (choice) {
            case '1':
                showTodos(todos);
                break;
            case '2':
                addTodo(todos);
                break;
            case '3':
                toggleTodo(todos);
                break;
            case '4':
                todos = deleteTodo(todos);
                break;
            case '5':
                console.log("Goodbye!");
                process.exit(0);
            default:
                console.log("Error! Wrong choice.")
        }
}
