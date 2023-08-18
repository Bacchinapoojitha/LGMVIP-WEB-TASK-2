document.addEventListener("DOMContentLoaded", () => {
    const getUsersButton = document.getElementById("getUsers");
    const userGrid = document.getElementById("userGrid");
    const loader = document.getElementById("loader");
  
    getUsersButton.addEventListener("click", async () => {
      loader.style.display = "block";
      getUsersButton.disabled = true;
  
      try {
        const totalPages = 10;
        userGrid.innerHTML = "";
  
        for (let page = 1; page <= totalPages; page++) {
          const response = await fetch(`https://reqres.in/api/users?page=${page}`);
          const data = await response.json();
  
          data.data.forEach(user => {
            const userCard = createUserCard(user);
            userGrid.appendChild(userCard);
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  
      loader.style.display = "none";
      getUsersButton.disabled = false;
    });
  
    function createUserCard(user) {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
  
      const img = document.createElement("img");
      img.src = user.avatar;
      img.alt = `Avatar of ${user.first_name}`;
  
      const name = document.createElement("h3");
      name.textContent = `${user.first_name} ${user.last_name}`;
  
      const email = document.createElement("p");
      email.textContent = `Email: ${user.email}`;
  
      userCard.appendChild(img);
      userCard.appendChild(name);
      userCard.appendChild(email);
  
      return userCard;
    }
  });
  