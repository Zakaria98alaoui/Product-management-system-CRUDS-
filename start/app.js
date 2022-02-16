/**
 * get total
 * create product
 * save to loacalstorage
 * clear input
 * read
 * count
 * delete
 * deleteAll
 * update
 * search
 * clean date
 */
let title = document.getElementById('title')
let price = document.getElementById('price')
let ads = document.getElementById('ads')
let taxes = document.getElementById('taxes')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let category = document.getElementById('category')
let total = document.getElementById('total')
let submit = document.getElementById('create')
let search = document.getElementById('search')
let searchByTitle = document.getElementById('searchTitle')
let searchByCategory = document.getElementById('searchCategory')

let productArr
let moodOperation = 'create'
let virtualId = ''
if (localStorage.getItem('products') != null) {
  productArr = JSON.parse(localStorage.getItem('products'))
} else {
  productArr = []
}
// get total
let getTotal = () => {
  if (title.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value
    total.innerHTML = result
    total.style.background = 'green'
  } else {
    total.innerHTML = ''
    total.style.background = 'red'
  }
}

// clear data after storad in localstorage
let clearData = () => {
  title.value = ''
  price.value = ''
  taxes.value = ''
  ads.value = ''
  discount.value = ''
  count.value = ''
  total.innerHTML = ''
  category.value = ''
}
// read data in front end
let showData = () => {
  getTotal()
  let table = ''
  for (let i = 0; i < productArr.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${productArr[i].title}</td>
      <td>${productArr[i].price}</td>
      <td>${productArr[i].taxes}</td>
      <td>${productArr[i].ads}</td>
      <td>${productArr[i].discount}</td>
      <td>${productArr[i].total}</td>
      <td>${productArr[i].category}</td>
      <td><button id="update" onClick='updateItem(${i})'>Update</button></td>
    <td><button id='delete' onClick='deleteItem(${i})'>delete</button></td>
    </tr>
    `
  }
  document.getElementById('tbody').innerHTML = table
  // delete all btn
  let deleteAll = document.getElementById('deleteAll')
  if (productArr.length > 0) {
    deleteAll.innerHTML = `
      <button type='button' onClick='deleteAllBtn()'>deleteAll(${productArr.length})</button>
    `
  } else {
    deleteAll.innerHTML = ''
  }
}
// create roduct
submit.addEventListener('click', () => {
  let productObj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value.toLowerCase(),
    count: count.value,
    total: total.innerHTML,
  }
  // count function
  if (title.value != '' && price.value != '' && category.value != '') {
    if (moodOperation === 'create') {
      if (productObj.count > 1) {
        for (let i = 0; i < productObj.count; i++) {
          productArr.push(productObj)
        }
      } else {
        productArr.push(productObj)
      }
    } else {
      productArr[virtualId] = productObj
      moodOperation = 'update'
      count.style.display = 'block'
      submit.innerHTML = 'create'
    }
    clearData()
  }
  localStorage.setItem('products', JSON.stringify(productArr))
  showData()
})

showData()

// delete each product item in prducts
function deleteItem(id) {
  productArr.splice(id, 1)
  localStorage.products = JSON.stringify(productArr)
  showData()
}
// delete all items in array
function deleteAllBtn() {
  productArr.splice(0)
  localStorage.clear()
  showData()
}
// update iteme in items
function updateItem(id) {
  title.value = productArr[id].title
  price.value = productArr[id].price
  taxes.value = productArr[id].taxes
  ads.value = productArr[id].ads
  discount.value = productArr[id].discount
  category.value = productArr[id].category
  total.innerHTML = productArr[id].total
  count.style.display = 'none'
  submit.innerHTML = 'update'
  moodOperation = 'update'
  getTotal()
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  virtualId = id
  console.log(virtualId)
}
// get search mood
let searchMood = 'title'
let getSearchMood = (searchId) => {
  searchId == 'searchTitle' ? (searchMood = 'title') : (searchMood = 'category')
  search.focus()
  search.placeholder = `search by ${searchMood}`
  search.value = ''
  showData()
}

let searchData = (value) => {
  let table = ''
  productArr.filter((item, index) => {
    if (searchMood == 'title') {
      if (item.title.includes(value.toLowerCase())) {
        table += `
           <tr>
              <td>${index}</td>
              <td>${item.title}</td>
              <td>${item.price}</td>
              <td>${item.taxes}</td>
              <td>${item.ads}</td>
              <td>${item.discount}</td>
              <td>${item.total}</td>
              <td>${item.category}</td>
              <td><button type="button" id="update" onClick='updateData(${index})'>update</button></td>
              <td><button onClick='deleteItem(${index})' type="button" id="delete">delete</button></td>
        </tr>
        `
      }
    } else {
      if (item.category.includes(value.toLowerCase())) {
        table += `
           <tr>
              <td>${index}</td>
              <td>${item.title}</td>
              <td>${item.price}</td>
              <td>${item.taxes}</td>
              <td>${item.ads}</td>
              <td>${item.discount}</td>
              <td>${item.total}</td>
              <td>${item.category}</td>
              <td><button type="button" id="update" onClick='updateData(${index})'>update</button></td>
              <td><button onClick='deleteItem(${index})' type="button" id="delete">delete</button></td>
        </tr>
        `
      }
    }
  })
  document.getElementById('tbody').innerHTML = table
}
