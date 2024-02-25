import {
  getChampions,
  searchChampion,
  addChampion,
  deleteChampion,
  updateChampionValue,
} from "./championServices.js";

const championController = async () => {
  // Get elements
  const championList = document.querySelector("#championList");

  const championSearch = document.querySelector("#championSearch");
  const searchButton = document.querySelector("#searchButton");
  const championCard = document.querySelector("#championCard");

  const championSection = document.querySelector("#addChampion");
  const form = document.querySelector("#championForm");
  const championName = document.querySelector("#championName");
  const championType = document.querySelector("#championType");

  let token = localStorage.getItem("token");
  const title = document.querySelector("h1");
  const auth = document.querySelector("#auth");

  if (token) {
    auth.style.display = "none";
    const userConnected = document.createElement("p");
    userConnected.innerHTML = "Welcome Summoner";
    title.appendChild(userConnected);
  }
  
  // Get all champions
  const champions = await getChampions();
  champions.forEach((champion) => {
    championList.innerHTML += `
    <div class="championItem">
    <small>${champion.id}</small>
    <h3>${champion.name}</h3>
    <p>${champion.type}</p>
    </div>
    `;
    if (token) {
      championList.innerHTML += `
      <button class="deleteButton" id=${champion.id}>Delete</button>
      `;
    }
    championSearch.innerHTML += `<option value="${champion.id}">${champion.name}</option>`;
  });
  
  
  // Get a single champion
  searchButton.addEventListener("click", async () => {
    if (!championSearch.value) return;
    const champion = await searchChampion(championSearch.value);
    
    let championType = () => {
      let options = "";
      const types = [
        "assassin",
        "fighter",
        "mage",
        "marksmen",
        "support",
        "tank",
      ];
      
      for (const type of types) {
        if (type === champion.type) {
          options += `<option value="${type}" disabled selected>${type}</option>`;
        } else {
          options += `<option value="${type}">${type}</option>`;
        }
      }
      
      return options;
    };

    if (token) {
      championCard.innerHTML = `
      <input type="text" id="championNameChange" value="${
        champion.name
      }"></input>
      <select id="championTypeChange">
      ${championType()}
      </select>
      <button type="submit" class="updateButton" id=${
        champion.id
      }>Update</button>
      `;
      updateChampion();
    } else {
      championCard.innerHTML = `
      <h3>${champion.name}</h3>
      <p>${champion.type}</p>
      `;
    }
  });
  
  if (!token) {
    championSection.style.display = "none";
  }

  // Add a new champion
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!championName.value || !championType.value) return;
    try {
      await addChampion(championName.value, championType.value);
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
    }
  });
  
  const deleteButtons = document.querySelectorAll(".deleteButton");

  // Delete a champion
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      console.log(button.id)
      await deleteChampion(button.id);
      window.location.href = "index.html";
    });
  })

  // Update a champion
  const updateChampion = async () => {
    const updateButton = document.querySelector(".updateButton");
    updateButton.addEventListener("click", async () => {
      const championNameChange = document.querySelector("#championNameChange");
      const championTypeChange = document.querySelector("#championTypeChange");
      await updateChampionValue(
        updateButton.id,
        championNameChange.value,
        championTypeChange.value
      );
      window.location.href = "index.html";
    });
  };
};

export {championController};
