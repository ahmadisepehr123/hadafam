let li = document.querySelector("li");


li.addEventListener("mouseover", function() {
  this.style.borderBottom = "text-decoration: line-through;";
});

li.addEventListener("mouseout", function() {
  this.style.borderBottom = "none";
});

let button = document.getElementById("button")
let input = document.getElementById("userinput")
let ul = document.querySelector("ul")

function inputLength(){
    return input.value.length;
}


function createListElement() {
    let li = document.createElement("li")
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
}

function finishList() {

}

function addListAfterClick(){
    if (inputLength() > 0){
        createListElement()
    }
}


function addListAfterKeypress(event){
    if (inputLength() > 0 && event.which === 13){
        createListElement()
    }
}

button.addEventListener("click" ,addListAfterClick)

input.addEventListener("keypress" ,  addListAfterKeypress)




window.addEventListener("load", function() {
    const loading = document.getElementById("loading");
    loading.style.display = "none";
  });


 function addBorder(element) {
  element.classList.add("clicked");
}
 

const myLi = document.getElementById("my-li");


myLi.addEventListener("mouseover", function() {
  this.style.borderBottom = "1px solid black";
});

// //تعریف یک event listener برای رویداد mouseout
// myLi.addEventListener("mouseout", function() {
//   // حذف خط از روی المان li
//   this.style.borderBottom = "none";
// });




// let li = document.querySelector("li");


// li.addEventListener("mouseover", function() {
//   // اضافه کردن خط بر روی المان li
//   this.style.borderBottom = "1px solid black";
// });

// li.addEventListener("mouseout", function() {
//   // حذف خط از روی المان li
//   this.style.borderBottom = "none";
// });


// let button = document.getElementById("button")
// let input = document.getElementById("userinput")
// let ul = document.querySelector("ul")

// function inputLength(){
//     return input.value.length;
// }


// function createListElement() {
//     let li = document.createElement("li")
//     li.appendChild(document.createTextNode(input.value));
//     ul.appendChild(li);
//     input.value = "";
    
//     // اضافه کردن event listener برای المان li
//         li.addEventListener("mouseover", function() {
//           // اضافه کردن خط بر روی المان li
//           this.style.borderBottom = "1px solid black";
//         });

//         li.addEventListener("mouseout", function() {
//           // حذف خط از روی المان li
//           this.style.borderBottom = "none";
//         });
//     }

//     function finishList() {

//     }

// function addListAfterClick(){
//     if (inputLength() > 0){
//         createListElement()
//     }
// }


// function addListAfterKeypress(event){
//     if (inputLength() > 0 && event.which === 13){
//         createListElement()
//     }
// }

// button.addEventListener("click" ,addListAfterClick)

// input.addEventListener("keypress" ,  addListAfterKeypress)

// window.addEventListener("load", function() {
//     const loading = document.getElementById("loading");
//     loading.style.display = "none";
// });
// ```توجه داشته باشید که با اضافه کردن event listener برای المان li، خط بر روی تمام المان‌های li که قبلاً ایجاد شده‌اند اضافه می‌شود. برای اینکه خط فقط بر روی المان li جدید اضافه شده بکشید، می‌توانید به جای استفاده از querySelector، از دستور createElement برای ایجاد المان li جدید استفاده کنید و به همین شکل، event listener را اضافه کنید.