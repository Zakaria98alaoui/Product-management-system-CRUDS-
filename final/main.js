/**
 * get total
 * create product
 * save to loacalstorage
 * clear input
 * read
 * count
 * delete
 * update
 * search
 * clean date
 */
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let Submit = document.getElementById('create')
let search = document.getElementById('search')
let searchByTitleBtn = document.getElementById('searchTitle')
let searchByCategoryBtn = document.getElementById('searchCategory')
let updateBtn = document.getElementById('update')
let deleteBtn = document.getElementById('delete')

let moodOperation = 'create'
let costomId
// get Total
let getTotal = () => {
  if (title.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value
    total.innerHTML = result
    total.style.backgroundColor = 'green'
  } else {
    total.innerHTML = ''
    total.style.backgroundColor = '#e74c3c'
  }
}
// create product
let dataProd
// if data was stored in localstorage
localStorage.product != null
  ? (dataProd = JSON.parse(localStorage.product))
  : (dataProd = [])
Submit.addEventListener('click', () => {
  // store product detail in the object
  let proObject = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }
  if (title.value != '' && price.value != '' && category.value != '') {
    if (moodOperation === 'create') {
      // count data
      if (proObject.count > 1) {
        for (let i = 0; i < proObject.count; i++) {
          // push object into array
          dataProd.push(proObject)
        }
      } else {
        dataProd.push(proObject)
      }
    } else {
      dataProd[costomId] = proObject
      Submit.innerHTML = 'create'
      moodOperation = 'create'
      count.style.display = 'block'
    }
    clearInputs()
  }
  // save data to localstorage
  localStorage.setItem('product', JSON.stringify(dataProd))
  // tiger clearInput fun
  showData()
})

// clear inputs
let clearInputs = () => {
  title.value = ''
  price.value = ''
  taxes.value = ''
  ads.value = ''
  discount.value = ''
  total.innerHTML = ''
  count.value = ''
  category.value = ''
}

// read
let showData = () => {
  getTotal()
  let table = ''
  for (let i = 0; i < dataProd.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${dataProd[i].title}</td>
        <td>${dataProd[i].price}</td>
        <td>${dataProd[i].taxes}</td>
        <td>${dataProd[i].ads}</td>
        <td>${dataProd[i].discount}</td>
        <td>${dataProd[i].total}</td>
        <td>${dataProd[i].category}</td>
        <td><button type="button" id="update" onClick='updateData(${i})'>update</button></td>
        <td><button onClick='deleteItem(${i})' type="button" id="delete">delete</button></td>
   </tr>
    `
  }
  document.getElementById('tbody').innerHTML = table
  // check if dataArray not empty
  let deleteAllBtn = document.getElementById('deleteAll')
  dataProd.length > 0
    ? (deleteAllBtn.innerHTML = `
      <button type="submit" onClick='deleteAllItems()'>deleteAll(${dataProd.length})</button>
    `)
    : (deleteAll.innerHTML = '')
}
showData()
// deleteitem
let deleteItem = (id) => {
  // remove specifique item from data product
  dataProd.splice(id, 1)
  // remove specifique item from data product
  localStorage.product = JSON.stringify(dataProd)
  showData()
}
// delete all item from array and localstorage
function deleteAllItems() {
  // clear data product
  dataProd.splice(0)
  // clear data Product from localstorage
  localStorage.clear()
  // update data
  showData()
}

//  update data for each item in dataProduct
function updateData(id) {
  title.value = dataProd[id].title
  price.value = dataProd[id].price
  ads.value = dataProd[id].ads
  taxes.value = dataProd[id].taxes
  discount.value = dataProd[id].discount
  category.value = dataProd[id].category
  getTotal()
  // remove count input
  count.style.display = 'none'
  // update button title from create to update
  Submit.innerHTML = 'update'
  moodOperation = 'update'
  costomId = id
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// search
/**
 * getSearchMood():
 * searchData()
 */
// getSearchMood():
let searchMood = 'title'
function getSearchMood(id) {
  id == 'searchTitle' ? (searchMood = 'title') : (searchMood = 'category')
  search.placeholder = `Search By ${searchMood}`
  search.focus()
  search.value = ''
  showData()
}
// searchMood
function searchData(value) {
  let table = ''
  for (let i = 0; i < dataProd.length; i++) {
    if (searchMood == 'title') {
      if (dataProd[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
              <td>${i}</td>
              <td>${dataProd[i].title}</td>
              <td>${dataProd[i].price}</td>
              <td>${dataProd[i].taxes}</td>
              <td>${dataProd[i].ads}</td>
              <td>${dataProd[i].discount}</td>
              <td>${dataProd[i].total}</td>
              <td>${dataProd[i].category}</td>
              <td><button type="button" id="update" onClick='updateData(${i})'>update</button></td>
              <td><button onClick='deleteItem(${i})' type="button" id="delete">delete</button></td>
        </tr>
      `
      }
    } else {
      if (dataProd[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
              <td>${i}</td>
              <td>${dataProd[i].title}</td>
              <td>${dataProd[i].price}</td>
              <td>${dataProd[i].taxes}</td>
              <td>${dataProd[i].ads}</td>
              <td>${dataProd[i].discount}</td>
              <td>${dataProd[i].total}</td>
              <td>${dataProd[i].category}</td>
              <td><button type="button" id="update" onClick='updateData(${i})'>update</button></td>
              <td><button onClick='deleteItem(${i})' type="button" id="delete">delete</button></td>
        </tr>
      `
      }
    }
  }

  document.getElementById('tbody').innerHTML = table
}
