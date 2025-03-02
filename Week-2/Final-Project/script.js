const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

taskList.addEventListener("click", (e) => {
  const taskItem = e.target.closest(".task-item");
  if (e.target.classList.contains("complete")) {
    taskItem.classList.toggle("completed");
  } else if (e.target.classList.contains("delete")) {
    taskItem.remove();
  }
  e.stopPropagation();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const priority = document.querySelector('input[name="priority"]:checked');
    if (!title) {
      throw new Error("Görev başlığı boş bırakılamaz!");
    }
    if (!priority) {
      throw new Error("Öncelik seçilmedi!");
    }
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
            <div class="info">
                <h3>${title}</h3>
                <p>${description}</p>
                <span>Öncelik: ${priority.value}</span>
            </div>
            <div class="actions">
                <button class="complete">Tamamlandı</button>
                <button class="delete">Sil</button>
            </div>
        `;
    taskList.appendChild(taskItem);
    taskForm.reset();
  } catch (error) {
    console.log(error.message);
  }
});

document.getElementById("showCompleted").addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach((task) => {
    if (!task.classList.contains("completed")) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
});

document.getElementById("sortByPriority").addEventListener("click", () => {
  const tasks = Array.from(document.querySelectorAll(".task-item"));
  tasks.sort((a, b) => {
    const priorityA = a.querySelector("span").textContent.split(": ")[1];
    const priorityB = b.querySelector("span").textContent.split(": ")[1];
    const priorityOrder = { Düşük: 1, Orta: 2, Yüksek: 3 };
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task) => taskList.appendChild(task));
});
