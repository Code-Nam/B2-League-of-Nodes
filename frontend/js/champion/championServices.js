const apiUrl = "http://localhost:3000/champion";

async function makeRequest(url, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getChampions() {
  return await makeRequest(apiUrl);
}

async function searchChampion(id) {
  return await makeRequest(`${apiUrl}/${id}`);
}

async function addChampion(name, type) {
  return await makeRequest(apiUrl, "POST", { name, type });
}

async function deleteChampion(id) {
  return await makeRequest(`${apiUrl}/${id}`, "DELETE");
}

async function updateChampionValue(id, name, type) {
  return await makeRequest(`${apiUrl}/${id}`, "PUT", { name, type });
}

export {
  getChampions,
  searchChampion,
  addChampion,
  deleteChampion,
  updateChampionValue,
};