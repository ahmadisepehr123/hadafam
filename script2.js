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

function finishList() {
    this.style.textDecoration = "line-through";
    this.style.color = "red";
}
 li.addEventListener("dblclick", function() {
        this.remove();
    });
    li.addEventListener("click", finishList)

    li.addEventListener("click", finishList)
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
// lis[i].addEventListener("dblclick", function() {
//     this.remove();
//   });