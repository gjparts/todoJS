import { crearTodoHTML, saludar } from './js/componentes';
import './styles.css';
import {Todo, TodoList} from './classes';

export const todoList = new TodoList();

for( const todo of todoList.todos )
{
    crearTodoHTML(todo);
}

/*
localStorage.setItem("llave","abc123");

setTimeout(()=>{
    localStorage.removeItem("llave");
},3000);
*/