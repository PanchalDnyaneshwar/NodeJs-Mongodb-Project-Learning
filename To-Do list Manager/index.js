
import{addTodo, getTodos, deleteTodo } from "./db.mjs";

await addTodo({Task : "Learn Node.js", Done: false});
await addTodo({Task : "Practice Interview", Done: false});

await deleteTodo(0);

const todos = await getTodos();
console.log(todos);
