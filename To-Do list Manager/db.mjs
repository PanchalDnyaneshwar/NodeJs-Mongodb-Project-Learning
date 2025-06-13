// db.js

import {readFile, writeFile} from 'fs/promises';
const FILE = 'todo.json';

// Read all todo`s 

export async function getTodos() {
    try{
        const data = await readFile(FILE, 'utf-8');
        return JSON.parse(data);
    } catch(err){
        return [];
    }
}

    // Add new Todo
export async function addTodo(todos) {
    const todo = await getTodos();
    todo.push(todos);
    await writeFile(FILE, JSON.stringify(todo, null, 2));
    console.log("file added succesfullay");
}

// Delete Todo by index

export async function deleteTodo(index) {
    const todos = await getTodos();

    if (index > 0 && index < todos.length) {
        todos.splice(index, 1);
        await writeFile(FILE, JSON.stringify(todos, null, 2));
        console.log("todo deleted succesfully");

    }else{
        console.log("Inalid index");
    }
    
}


