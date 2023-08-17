let input = document.getElementById("userinput");
let button = document.getElementById("button");
let todoList = document.querySelector(".todo-list");
let deleteBtn = document.getElementById("delete-button");
let originalTitle = document.title;
const activeTasksContainer = document.querySelector('.active-tasks');
const completedTasksContainer = document.querySelector('.completed-tasks');


document.addEventListener("DOMContentLoaded", function() {
  let button = document.getElementById('button');
  let textInput = document.getElementById('userinput');
   
  
    // Retrieve stored todo items from localStorage
    let todoData = JSON.parse(localStorage.getItem('todos')) || [];
    todoData.forEach(function(todo) {
      let newTodoItem = document.createElement("div");
     
      newTodoItem.innerHTML = '<li class="checkbox"><label>'  + todo + '</label>';
      todoList.appendChild(newTodoItem);
      
    });
  
   

  
  button.addEventListener('click', function(e) {
    e.preventDefault();
    addTodo();
  });

  textInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) { // Enter key
      e.preventDefault();
      addTodo();
    }
  });
  function updatePercentage() {
    let tasks = document.querySelectorAll('.todo-list li span');
    let completedCount = Array.from(tasks).filter(span => span.style.textDecoration === 'line-through').length; 
    let totalCount = tasks.length;
    let percentage = 0; // Set initial value to 0
    
    if (totalCount !== 0) {
      percentage = Math.round((completedCount / totalCount) * 100);
    }
    
    let percentElement = document.querySelector('.loader .text');
    percentElement.textContent = percentage + "% تسک های شما انجام شد";
  }


function addTodo() {
    if (textInput.value.length > 0) {
      let newTodoItem = document.createElement("div");
      newTodoItem.className = 'todo-item';
      let newTodoHtml = '<div class="div-tick"><button class="tick"> <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="30" rx="5" fill="rgb(29, 243, 29)"/><path d="M12.4154 20.784L8.19037 15.9899C7.93654 15.7019 7.93654 15.2349 8.19037 14.9468L9.10959 13.9038C9.36342 13.6157 9.775 13.6157 10.0288 13.9038L12.875 17.1333L18.9712 10.216C19.225 9.928 19.6366 9.928 19.8904 10.216L20.8096 11.2591C21.0635 11.5471 21.0635 12.0141 20.8096 12.3021L13.3346 20.784C13.0808 21.072 12.6692 21.072 12.4154 20.784Z" fill="white"/></svg></button></div>';
      newTodoHtml += '<li class="checkbox">';
      newTodoHtml += '<span>' + textInput.value + '</span>';
      newTodoHtml += '<div class="div-close"><button class="btn-close"></button></div>';
      newTodoItem.innerHTML = newTodoHtml;
      let tickButton = newTodoItem.querySelector('.tick');
tickButton.addEventListener('click', function() {
    let taskTitle = newTodoItem.querySelector('span'); // select the task name (span)

    if (taskTitle.style.textDecoration === 'line-through' && taskTitle.style.opacity === '0.5') {
      // If the styles have been applied, remove them
      taskTitle.style.textDecoration = 'none';
      taskTitle.style.opacity = '1';
    } else {
      // Otherwise, apply the styles
      taskTitle.style.textDecoration = 'line-through';
      taskTitle.style.opacity = '0.5';
    }
    updatePercentage();
    if (!newTodoItem.classList.contains('completed')) {
      newTodoItem.classList.add('completed');
      newTodoItem.style.textDecoration = 'line-through';
      newTodoItem.style.opacity='0.5'
      if (document.querySelector('.completed-task button').classList.contains('active')) {
        newTodoItem.style.display = 'block';
      } else {
        newTodoItem.style.display = 'none';
      }
    } else {
      newTodoItem.classList.remove('completed');
      newTodoItem.style.display = 'block';
      newTodoItem.style.textDecoration = 'none';
      newTodoItem.style.opacity='1'
    }

})

      let closeButton = newTodoItem.querySelector('.btn-close');
      closeButton.addEventListener('click', function() {
        newTodoItem.remove();
        
        // Update localStorage
        let todoData = JSON.parse(localStorage.getItem('todos')) || [];
        let itemIndex = todoData.findIndex(function(todo) {
          return todo.title === textInput.value;
        });
        if (itemIndex !== -1) {
          todoData.splice(itemIndex, 1);
          localStorage.setItem('todos', JSON.stringify(todoData));
        }
      });
    
      // Store user input in localStorage
      let todoData = JSON.parse(localStorage.getItem('todos')) || [];
      todoData.push({
        title: textInput.value,
        
      });
      localStorage.setItem('todos', JSON.stringify(todoData));
    
      todoList.appendChild(newTodoItem);
      textInput.value = '';
      updatePercentage();
    } else {
      swal({
        title: "لطفا چیزی وارد کنید",
        icon: "info",
        button: "باشه",
      });
    }
}

document.querySelector('.todo-list').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
      updatePercentage();
      let todoItem = e.target.parentElement;
      let checkboxes = document.querySelectorAll('.todo-list li');
      let checked = Array.from(checkboxes).filter(li => li.classList.contains('completed')).length;
      let total = checkboxes.length;
      updatePercentage();
      let percentage = Math.round((checked / total) * 100);
  
      let percentElement = document.querySelector('.loader .text');
      percentElement.textContent = percentage + "% کار های شما انجام شد ";
  
      let oldPercentElement = document.querySelector('#percent-completed');
      
      if (oldPercentElement) {
        document.body.removeChild(oldPercentElement);
      }
  
      if (!todoItem.classList.contains('completed')) {
        todoItem.classList.add('completed');
        todoItem.style.textDecoration = 'line-through';
        todoItem.style.opacity='0.5'
        if (document.querySelector('.completed-task button').classList.contains('active')) {
          todoItem.style.display = 'block';
        } else {
          todoItem.style.display = 'none';
        }
      } else {
        todoItem.classList.remove('completed');
        todoItem.style.display = 'block';
        todoItem.style.textDecoration = 'none';
        todoItem.style.opacity='1'
      }
  
      let todoData = JSON.parse(localStorage.getItem('todos')) || [];
      let itemIndex = todoData.findIndex(function(todo) {
        return todo.title === e.target.nextElementSibling.textContent;
      });
      if (itemIndex !== -1) {
        todoData[itemIndex].completed = e.target.checked;
      } else {
        let newTodo = {
          title: e.target.nextElementSibling.textContent,
          completed: e.target.checked
        };
        todoData.push(newTodo);
      }
  
      localStorage.setItem('todos', JSON.stringify(todoData));
      localStorage.setItem('checkboxState', JSON.stringify(e.target.checked));
    }
});

document.querySelector('.todo-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-close')) {
      let todoItem = e.target.closest('.todo-item');
      todoItem.remove();
      updatePercentage();
      let todoData = JSON.parse(localStorage.getItem('todos')) || [];
      let updatedTodoData = todoData.filter(function(todo) {
        return todo.title !== todoItem.querySelector('label');
      });
  
      localStorage.setItem('todos', JSON.stringify(updatedTodoData));
    }
});
document.querySelectorAll('.todo-item .tick-button').forEach(function(button) {
  button.addEventListener('click', function() {
    var todoItem = this.closest('.todo-item');
    
    if (!todoItem.classList.contains('completed')) {
      todoItem.classList.add('completed');
      todoItem.style.display = 'none'; // Hide the item from the 'active' section
    }
  });
});

  
  document.querySelector('.completed-task button').addEventListener('click', function() {
    this.classList.add('active');
    document.querySelector('.active-task button').classList.remove('active');
    document.querySelector('.all-task button').classList.remove('active');
    document.querySelectorAll('.todo-item').forEach(function(item) {
      if (!item.classList.contains('completed')) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  });
 

  document.querySelector('.active-task button').addEventListener('click', function() {
    this.classList.add('active');
    document.querySelector('.completed-task button').classList.remove('active');
    document.querySelector('.all-task button').classList.remove('active');
    document.querySelectorAll('.todo-item').forEach(function(item) {
      if (item.classList.contains('completed')) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  });

  document.querySelector('.all-task button').addEventListener('click', function() {
    this.classList.add('active');
    document.querySelector('.completed-task button').classList.remove('active');
    document.querySelector('.active-task button').classList.remove('active');
    document.querySelectorAll('.todo-item').forEach(function(item) {
      item.style.display = 'block';
    });
  });
});

window.addEventListener('blur', function () {
  document.title = 'رفیق اهدافت رو یادت نره :)';
});

window.addEventListener('focus', function () {
  document.title = originalTitle;
});



window.addEventListener("load" ,function(){
  if(this.navigator.onLine){
   console.log("کاربر به اینترنت وصله")
  }else{
    this.alert("رفیق گفتم که اینترنتت قطعه")
  }
});
window.addEventListener("offline", () => {
  swal({
    title: "رفیق اینترنتت قطعه",
    text: "لطفا از روشن و وصل بودن خود به اینترنت مطمئن شوید و بعدا تلاش کنید",
    icon: "error",
    button: "باشه",
  });
});

window.addEventListener("online", () => {
  swal({
    title: "اینترنت وصله",
    text: "اینترنت وصل شد",
    icon: "success",
    button: "باشه",
  });
});

window.addEventListener('beforeunload', function(event) {
  let todoListItems = document.querySelector('.todo-list').innerHTML;
  localStorage.setItem('todoListItems', todoListItems);

});

document.addEventListener('DOMContentLoaded', function() {
  let todoListItems = localStorage.getItem('todoListItems');
  if (todoListItems) {
    document.querySelector('.todo-list').innerHTML = todoListItems;
    
  }
});



var savedName = localStorage.getItem("name");

if (savedName) {
  name = savedName;
} else {
  var promptContainer = document.createElement("div");
  promptContainer.classList.add("prompt-container");

  var promptMessage = document.createElement("p");
  promptMessage.classList.add("prompt-message");
  promptMessage.textContent = "لطفا اسم خودرا وارد کنید ترجیحا فارسی";
  promptContainer.appendChild(promptMessage);

  var inputField = document.createElement("input");
  inputField.classList.add("prompt-input");
  promptContainer.appendChild(inputField);

  var okButton = document.createElement("button");
  okButton.classList.add("prompt-button");
  okButton.textContent = "ارسال";
  promptContainer.appendChild(okButton);

  document.body.appendChild(promptContainer);

  okButton.addEventListener("click", function() {
    var name = inputField.value;
    localStorage.setItem("name", name);
    promptContainer.remove();
    location.reload();
  });
}



let daysOfWeek = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
let date = new Date();
let dayOfWeek = date.getDay();

let h1 = document.getElementById("h1");



h1.textContent = `${name}  رفیق ${daysOfWeek[dayOfWeek]} رو با برنامه شروع کن `;
document.addEventListener('DOMContentLoaded', function() {
  const targetSection = document.querySelector('.prompt-container');
  const promptSection = document.getElementById('prompt');

  if(!savedName){
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});


