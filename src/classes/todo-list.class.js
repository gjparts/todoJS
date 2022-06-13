import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        //esto regresa un arreglo pero excluye el todo con el id a eliminar
        //filter retorna una copia del arreglo de acuerdo a la regla de filtrado
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    eliminarCompletados(){
        //dejar solo los que no estan completados.
        this.todos = this.todos.filter( todo => todo.completado == false );
        this.guardarLocalStorage();
    }

    toggleTodo(id){
        //como estoy usando arreglos tendré que localizar el id del elemento a afectar
        //esto se resuelve usando objetos con keys; pero lo hicimos con arreglos por
        //ser tema introductorio.
        for( const todo of this.todos ){
            if( todo.id == id ){
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        //almacenar los todos en el lS
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (
            localStorage.getItem('todo')
            ?
                JSON.parse(localStorage.getItem('todo'))
            :
                []
            );

        //barre cada elemento y aplicarle trabajo (para que la data recuperada sea de la misma clase)
        this.todos = this.todos.map( objeto => Todo.fromJSON( objeto ) );
    }
}