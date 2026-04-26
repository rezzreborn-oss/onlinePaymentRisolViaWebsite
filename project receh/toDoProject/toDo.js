const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addBtn.click()
  }
})
// STATE (data utama)
let data = JSON.parse(localStorage.getItem('todo')) || [];

// RENDER ULANG SEMUA LIST
function renderTodos() {
  todoList.innerHTML = "";

  data.forEach((todo, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
      span.classList.add("completed");
    }

    const ceklisBtn = document.createElement("button");
    ceklisBtn.textContent = "Ceklis";
    ceklisBtn.className = "btn-ceklis";

    const hapusBtn = document.createElement("button");
    hapusBtn.textContent = "Hapus";
    hapusBtn.className = "btn-hapus";

    // CEKLIS
    ceklisBtn.addEventListener("click", () => {
      data[index].completed = !data[index].completed;
      updateLocalStorage();
      renderTodos();
    });

    // HAPUS
    hapusBtn.addEventListener("click", () => {
      data.splice(index, 1);
      updateLocalStorage();
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(ceklisBtn);
    li.appendChild(hapusBtn);
    todoList.appendChild(li);
  });
}

// SIMPAN KE LOCAL STORAGE
function updateLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(data));
}

// TAMBAH TODO
addBtn.addEventListener("click", () => {
  const todoText = input.value.trim();

  if (todoText === "") return;

  data.push({
    text: todoText,
    completed: false
  });

  updateLocalStorage();
  renderTodos();

  input.value = "";
});

// LOAD AWAL
renderTodos();