const championController = async () => {
  // Get all champions
  const championList = document.querySelector("#championList");
  const championSearch = document.querySelector("#championSearch");

  try {
    const res = await fetch("http://localhost:3000/champion");
    const champions = await res.json();
    champions.forEach((champion) => {
      championList.innerHTML += `
            <div class="championItem">
            <small>${champion.id}</small>
            <h3>${champion.name}</h3>
            <p>${champion.type}</p>
            <button class="deleteButton" id="${champion.id}">Delete</button>
            </div>
            `;
      championSearch.innerHTML += `<option value="${champion.id}">${champion.name}</option>`;
    });
  } catch (error) {
    console.error(error);
  }

  // Get a single champion
  const searchButton = document.querySelector("#searchButton");
  const championCard = document.querySelector("#championCard");

  searchButton.addEventListener("click", async () => {
    if (!championSearch.value) return;
    try {
      const res = await fetch(
        `http://localhost:3000/champion/${championSearch.value}`
      );
      const champion = await res.json();
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
    } catch (error) {
      console.error(error);
    }
  });

  // Add a new champion
  const form = document.querySelector("#championForm");
  const championName = document.querySelector("#championName");
  const championType = document.querySelector("#championType");
  form.addEventListener("submit", async () => {
    try {
      const res = await fetch("http://localhost:3000/champion", {
        method: "POST",
        body: JSON.stringify({
          name: championName.value,
          type: championType.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
    }
  });

  // Delete a champion
  let deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await fetch(`http://localhost:3000/champion/${button.id}`, {
          method: "DELETE",
        });
        window.location.href = "index.html";
      } catch (error) {
        console.error(error);
      }
    });
  });

  // Update a champion
  const updateChampion = () => {
    const updateButton = document.querySelector(".updateButton");
    updateButton.addEventListener("click", async () => {
      const championNameChange = document.querySelector("#championNameChange");
      const championTypeChange = document.querySelector("#championTypeChange");
      try {
        await fetch(`http://localhost:3000/champion/${updateButton.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: championNameChange.value,
            type: championTypeChange.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        window.location.href = "index.html";
      } catch (error) {
        console.error(error);
      }
    });
  };
};

export { championController };
