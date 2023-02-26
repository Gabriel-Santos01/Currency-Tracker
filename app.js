const key = '?key6b8af869'
const HgApi = `https://api.hgbrasil.com/finance${key}`
function getCurrancy() {
  fetch(HgApi)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

getCurrancy()
