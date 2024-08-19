const inputTodo = document.getElementById("inputTodo");
const addBtn = document.getElementById("addBtn");
const display = document.getElementById("display");
const clearALL = document.getElementById("clearAll");
const reminder = document.getElementById("reminder");

let text;
let id = 0;
let todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

todoArray.map((value) => {
  display.insertAdjacentHTML(
    "afterbegin",
    `<div id="todo">
              <p>${value.text}</p>
              <button onclick="deleteTodo('${value.id.toString()}')" class="deleteBtn">
                  <img src="icons/icons8-trash.svg" alt="icon-trash" />
                  <p class="tooltip">Delete</p>
              </button>
          </div>`
  );
});

addBtn.addEventListener("click", addTodo);
function addTodo() {
  if (!inputTodo.value) {
    alert("You Must input a vlaue before adding");
  } else {
    text = inputTodo.value;
    inputTodo.value = "";

    todoArray.push({
      id: crypto.randomUUID(),
      text: text,
    }),
      localStorage.setItem("todoArray", JSON.stringify(todoArray));
    display.innerHTML = "";

    todoArray.map((value) => {
      display.insertAdjacentHTML(
        "afterbegin",
        `<div id="todo">
                  <p>${value.text}</p>
                  <button onclick="deleteTodo('${value.id.toString()}')" class="deleteBtn">
                      <img src="icons/icons8-trash.svg" alt="icon-trash" />
                      <p class="tooltip">Delete</p>
                  </button>
              </div>`
      );
    });
  }
  reminder.innerText = todoArray.length;
}

clearALL.addEventListener("click", clearTodo);
function clearTodo() {
  todoArray = [];
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
  display.innerHTML = "";
  reminder.innerText = 0;
}
function deleteTodo(id) {
  todoArray = todoArray.filter((todo) => todo.id !== id);
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
  reminder.innerText--;
  display.innerHTML = "";
  todoArray.map((value) => {
    display.insertAdjacentHTML(
      "afterbegin",
      `<div id="todo">
                  <p>${value.text}</p>
                  <button onclick="deleteTodo('${value.id.toString()}')" class="deleteBtn">
                      <img src="icons/icons8-trash.svg" alt="icon-trash" />
                      <p class="tooltip">Delete</p>
                  </button>
              </div>`
    );
  });
}

document.addEventListener("keydown", enterAdd);
function enterAdd(event) {
  if (event.key === "Enter") {
    addTodo();
  }
}
