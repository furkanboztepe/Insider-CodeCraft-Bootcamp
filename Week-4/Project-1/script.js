document.addEventListener("DOMContentLoaded", () => {
  const usersContainer = document.querySelector(".ins-api-users");
  const apiUrl = "https://jsonplaceholder.typicode.com/users";
  const localStorageKey = "cachedUsers";
  const cacheDuration = 24 * 60 * 60 * 1000;

  const getCachedUsers = () => {
    const cachedData = localStorage.getItem(localStorageKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < cacheDuration) {
        return data;
      }
    }
    return null;
  };

  const cacheUsers = (users) => {
    const cacheData = {
      timestamp: Date.now(),
      data: users,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(cacheData));
  };

  const deleteUser = (userId) => {
    let users = JSON.parse(localStorage.getItem(localStorageKey)).data;
    users = users.filter((user) => user.id !== userId);
    cacheUsers(users);
    renderUsers(users);
  };

  const renderUsers = (users) => {
    usersContainer.innerHTML = "";
    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}</p>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Sil</button>
            `;
      usersContainer.appendChild(userCard);
    });
  };

  const fetchUsers = () => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API'ye ulaşılamadı");
        }
        return response.json();
      })
      .then((users) => {
        cacheUsers(users);
        renderUsers(users);
      })
      .catch((error) => {
        usersContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
  };

  const cachedUsers = getCachedUsers();
  if (cachedUsers) {
    renderUsers(cachedUsers);
  } else {
    fetchUsers();
  }

  window.deleteUser = deleteUser;
});
