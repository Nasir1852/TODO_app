//find all the html elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector(".lists");
const messageElement = document.querySelector("#message");

//show message Element
const showMessage = (text,status)=>{
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
} 
//create Todo Function
const createTodo = (todoId, todoValue)=>{
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span><button class = "btn" id = "deleteButton" ><i class = "fa fa-trash"></i></button></span>
    `
    todoLists.appendChild(todoElement);
    const deleteTodo = todoElement.querySelector("#deleteButton");
    deleteTodo.addEventListener("click",(event)=>{
        const selectedTodo = event.target.parentElement.parentElement.parentElement;
        todoLists.removeChild(selectedTodo);
        showMessage("Todo is remove","style-remove");
        let todos = getTodosFromLocalStorage();
        todos = todos.filter((todo)=>todo.todoId!==selectedTodo.id);
        localStorage.setItem("mytodos",JSON.stringify(todos));
    })
}

//getTodosFrom localStorage
const getTodosFromLocalStorage = ()=>{
    return localStorage.getItem("mytodos")? JSON.parse(localStorage.getItem("mytodos")):[];
}

//add todoFunction
const addTodo = (event)=>{
    event.preventDefault();
    const todoValue = todoInput.value;

    //generate unique ID
    const todoId = Date.now().toString();
    
    //create Todo
    createTodo(todoId,todoValue);
    showMessage("todo is added","style");

    //localStorage
    const todos = getTodosFromLocalStorage();
    todos.push(todoId, todoValue);
    localStorage.setItem("mytodos",JSON.stringify(todos));

    todoInput.value = "";
}

//load Todos
const loadTodos = ()=>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo)=>createTodo(todo));
}


//add listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);
