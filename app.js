const key = '6b8af869'
const HgApi = `https://cors-everywhere.onrender.com/https://api.hgbrasil.com/finance?key=${key}`

const currencyValue = document.querySelectorAll(
  '.currencies .currency .currencyValue'
)
const stocksValue = document.querySelectorAll('.stocks .stock .stockValue')

console.log(currencyValue, stocksValue)

function getCurrancy() {
  fetch(HgApi)
    .then(response => response.json())
    .then(data => {
      const results = data.results
      const stocks = results.stocks
      const currencies = results.currencies

      Object.entries(stocks).forEach(([key, value]) => {
        stocksValue.forEach(element => {
          const id = element.dataset.id
          if (id === key) {
            element.textContent = `${value.variation.toFixed(2)}%`
            if (value.variation < 0) {
              element.classList.add('negative')
            } else {
              element.classList.remove('negative')
            }
          }
        })
      })

      Object.entries(currencies).forEach(([key, value], index) => {
        if (index > 0) {
          currencyValue.forEach(element => {
            const id = element.dataset.id
            if (id === key) {
              element.textContent = value.buy.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
            }
          })
        }
      })
    })
    .catch(error => {
      console.error(error)
    })
}

function displayDate() {
  const dataHourElem = document.getElementById('date-hour')
  const now = new Date()
  const formattedDate = now.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })
  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric'
  })
  dataHourElem.textContent = `Atualizado em: ${formattedDate} às ${formattedTime}`
}

getCurrancy()
setInterval(getCurrancy, 3600000)
setInterval(displayDate, 1000)
