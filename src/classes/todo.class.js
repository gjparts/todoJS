export class Todo{

    constructor( tarea ){
        this.tarea = tarea;
        this.id = new Date().getTime(); 
        this.completado = false;
        this.creado = new Date();
    }

    //crear un todo a partir de un objeto generico
    static fromJSON({id, tarea, completado, creado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }
}