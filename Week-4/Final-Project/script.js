const appendLocation = document.querySelector("#user-list");
if (!appendLocation) {
  console.error("appendLocation için geçerli bir DOM elementi bulunamadı.");
} else {
  const getUsersFromStorage = () => {
    const usersData = localStorage.getItem("users");
    if (!usersData) return null;

    const { users, expire } = JSON.parse(usersData);

    if (expire && Date.now() > expire) {
      localStorage.removeItem("users");
      return null;
    }
    return users;
  };

  const style = document.createElement("style");
  style.innerHTML = `
    .user-item {
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f9f9f9;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .user-item p {
        margin: 0;
        font-size: 16px;
        color: #333;
    }
    .user-item button {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
    }
    .user-item button:hover {
        background-color: #ff1a1a;
    }
    #reload-button {
        background-color: #4CAF50;
        color: white;
        left: 45%;
        position: absolute;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;
    }
`;
  document.head.appendChild(style);

  const saveUsersToStorage = (users, expireTimeInMinutes = 1) => {
    const expire = Date.now() + expireTimeInMinutes * 60 * 1000;
    localStorage.setItem("users", JSON.stringify({ users, expire }));
  };

  function renderUsers(users) {
    appendLocation.innerHTML = "";
    users.forEach((user, index) => {
      const userElement = document.createElement("div");
      userElement.className = "user-item";
      userElement.innerHTML = `
                <p>${user.name}</p>
                <button onclick="deleteUser(${index})">Sil</button>
            `;
      appendLocation.appendChild(userElement);
    });

    if (users.length === 0) {
      const reloadButton = document.createElement("button");
      reloadButton.innerText = "Kullanıcıları Yeniden Çek";
      reloadButton.id = "reload-button";
      reloadButton.onclick = fetchUsers;
      appendLocation.appendChild(reloadButton);
    }
  }

  const deleteUser = (index) => {
    const users = getUsersFromStorage() || [];
    users.splice(index, 1);
    saveUsersToStorage(users);
    renderUsers(users);
  };
  window.deleteUser = deleteUser;

  const fetchUsers = async () => {
    if (sessionStorage.getItem("usersFetched")) {
      alert("Bu işlem bir oturumda yalnızca bir kez yapılabilir.");
      return;
    }
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      saveUsersToStorage(users);
      sessionStorage.setItem("usersFetched", "true");
      renderUsers(users);
    } catch (error) {
      console.error("Kullanıcılar çekilirken hata oluştu:", error);
    }
  };

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        const reloadButton = document.querySelector("#reload button");
        if (reloadButton) {
          reloadButton.onclick = fetchUsers;
        }
      }
    }
  });
  const observerConfig = { childList: true };
  observer.observe(appendLocation, observerConfig);

  document.addEventListener("DOMContentLoaded", () => {
    const users = getUsersFromStorage() || [];
    renderUsers(users);
  });
}
