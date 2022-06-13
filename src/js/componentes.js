import { Todo } from "../classes";
import { todoList } from '../index.js';

//referencias en el HTML
const divTodoList = document.querySelector(".todo-list");
const txtInput    = document.querySelector(".new-todo");
const btnEliminarCompletados = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTodoHTML = (todo) =>{
    const txtHTML = `
    <li class="${ todo.completado ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="">
    </li>
    `;
    const div = document.createElement('div');
    div.innerHTML = txtHTML;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;   //solo retonar lo que esta dentro del DIV o sea el LI
}

//eventos
txtInput.addEventListener("keyup", (event) => {
    if( event.keyCode == 13 && txtInput.value.length > 0 )
    {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo(nuevoTodo);
        
        crearTodoHTML(nuevoTodo);

        txtInput.value = '';
    }
});

divTodoList.addEventListener("click", (event) => {
    const tipoElementoClickeado = event.target.localName;
    //obtener el LI clickeado
    const todoElemento = event.target.parentElement.parentElement;
    //obtener el id del LI clickeado
    const todoId = todoElemento.getAttribute("data-id");
    
    //se hizo click en la cajita checkbox (input)
    if( tipoElementoClickeado.includes('input') ){
        todoList.toggleTodo(todoId);
        //si el elemento ya tiene una class completed entondes la quita, de lo
        //contrario la vuelve a poner
        todoElemento.classList.toggle("completed");
    }

    //click en el boton de eliminar
    if( tipoElementoClickeado.includes('button') ){
        todoList.eliminarTodo(todoId);
        //eliminar del HTML
        divTodoList.removeChild( todoElemento );
    }
});

btnEliminarCompletados.addEventListener("click", (event) => {
    todoList.eliminarCompletados();
    //eliminar todos los LI checkados, aquellos cuya clase sea completed
    const checkeados = document.querySelectorAll(".completed");
    for( const todo of checkeados )
    {
        divTodoList.removeChild( todo );
    }
});

ulFiltros.addEventListener("click", (event) => {
    const filtro = event.target.text;
    if( filtro )
    {
        anchorFiltros.forEach( el => el.classList.remove("selected") ); //remover la clase a todos los elementos seleccionados por el querySelectorAll
        event.target.classList.add("selected"); //al item clickeado le agregamos la clase selected

        for( const elemento of divTodoList.children )
        {
            elemento.classList.remove('hidden');
            const completado = elemento.classList.contains("completed");

            //de acuerdo al filtro es lo que mostraremos
            switch(filtro)
            {
                case 'Pendientes':
                    if(completado) elemento.classList.add("hidden");
                break;
                case 'Completados':
                    if(!completado) elemento.classList.add("hidden");
                break;
            }
        }
    }
});