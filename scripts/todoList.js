//look at the code at line 56 and below
//then here we turn the data stored into what javascript can read and if there is nothing stored we use a fallback this '||'
const todoList = JSON.parse(localStorage.getItem("tasks")) || [] // this means if nothing is stored yet we use an empty array 


renderTodoList();


function renderTodoList(){

  let todoListHTML ='';

  for(let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    const name = todoObject.name;
    const dueDate = todoObject.dueDate;

    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
          todoList.splice(${i},1);
          renderTodoList();
        " class="delete-todo-button">Delete</button>
      
    `;
    todoListHTML += html;

  }
  console.log(todoListHTML);
  /*The task stored will no longer be gone upon refreshing  as it is stored in the web browser
  localeStorage only stores string so JSON.stringify() turns everything into a string like this:
  [
    {
      "name":"make dinner",
      "dueDate": "2025/01/09"
    },{
      "name": "wash dishes",
      "dueDate": "2025/01/09"
    }];
  
  */

  //stores data in the web browser!
  localStorage.setItem("tasks", JSON.stringify(todoList));
  
  document.querySelector('.js-todoList-ouput')
  .innerHTML = todoListHTML;

}

function addTodo(){
  const nameInputElement = document.querySelector('.js-name-input');
  const name = nameInputElement.value;

  const dueDateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dueDateInputElement.value;
 
    //this removes Invalid data from being processed
  //empty strings are falsy values
  if(!name || !dueDate)return
 
  todoList.push({
    name,
    dueDate
  });


  nameInputElement.value = '';

  //also clear the date bar
  dueDateInputElement.value = '';

  renderTodoList();
}

function deleteALL(){
  //clears the web storage
  localStorage.clear()
  
  todoList.length = 0 // by setting the length to 0 everything in that array is gone
  renderTodoList();
}
      