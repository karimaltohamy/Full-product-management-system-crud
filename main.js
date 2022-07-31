let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let btnCreate = document.getElementById("btn-creat");
let num;

// function get total number
function getTotal() {
    if (price.value != "") {
        let totalNumber = +price.value + +taxes.value + +ads.value - +discount.value
        total.innerHTML = totalNumber;
        total.style.backgroundColor = "rgb(0 182 97)";
    }else {
        total.style.backgroundColor = "rgb(255, 8, 103)";
        total.innerHTML = "0";
    }
}

// function create product
let tableBody;

// retrieved products from localstorage
if (localStorage.products != null) {
    
    tableBody = JSON.parse(localStorage.products)
}else {
    tableBody = [];
}

function creatProduct() {
    let product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads:   ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    if (btnCreate.innerHTML === "Create") {
        if (count.value > 1) {
            for (let i = 0; i < count.value; i++) {
                tableBody.push(product)
            }
        }else {
            tableBody.push(product)
        }
    
    }else {
        tableBody[num] = product;
        count.style.display = "block";
        total.style.backgroundColor = "rgb(255, 8, 103)";
        btnCreate.innerHTML = "Create"
    }

    localStorage.setItem("products", JSON.stringify(tableBody))
    readDate() 
    clearInputs() 
}

// clear inputs

function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = ""
}

// create button clear all data
let clearAll = document.createElement("button")
    clearAll.className = "clear-all"
    clearAll.innerHTML = `Clear All`

// function read data 

function readDate() {
    let data = "";
    for (let i = 0; i < tableBody.length; i++) {
        data += `
            <tr>
                <td>${i}</td>
                <td>${tableBody[i].title}</td>
                <td>${tableBody[i].price}</td>
                <td>${tableBody[i].taxes}</td>
                <td>${tableBody[i].ads}</td>
                <td>${tableBody[i].discount}</td>
                <td>${tableBody[i].total}</td>
                <td>${tableBody[i].category}</td>
                <td><button onclick="updateElement(${i})" id="update">update</button></td>
                <td><button onclick="deleteElement(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    
    document.querySelector("tbody").innerHTML = data;

    if (tableBody.length > 0) {
        document.querySelector(".content-search").append(clearAll)
    }else {
        clearAll.remove()
    }
}
readDate() 

// create function clear all 
clearAll.addEventListener("click", () => {
    tableBody.length = 0
    localStorage.clear("products");
    readDate()
})

// function Delete Element in array
function deleteElement(i) {
    tableBody.splice(i,1)
    localStorage.setItem("products", JSON.stringify(tableBody))
    readDate() 
}


// update element
function updateElement(i) {
    title.value = tableBody[i].title;
    price.value = tableBody[i].price;
    taxes.value = tableBody[i].taxes;
    ads.value = tableBody[i].ads;
    discount.value = tableBody[i].discount;
    total.innerHTML = tableBody[i].total
    category.value = tableBody[i].category;
    
    count.style.display = "none";
    total.style.backgroundColor = "rgb(0 182 97)";
    btnCreate.innerHTML = "update"

    num = i;
}


// function get mode search
let mode = "title";
let inputSearch = document.getElementById("search")
function getModeSearch(id) {
    if (id === "sarch-title") {
        mode = "title";
    }else {
        mode = "category";
    }
    inputSearch.value = ""
    inputSearch.focus()
}

// function search element
function searchElement(value) {
    let data = "";
    if (mode === "title") {
        for(let i = 0; i < tableBody.length; i++) {
            if (tableBody[i].title.includes(value)) {
                data += `
                <tr>
                    <td>${i}</td>
                    <td>${tableBody[i].title}</td>
                    <td>${tableBody[i].price}</td>
                    <td>${tableBody[i].taxes}</td>
                    <td>${tableBody[i].ads}</td>
                    <td>${tableBody[i].discount}</td>
                    <td>${tableBody[i].total}</td>
                    <td>${tableBody[i].category}</td>
                    <td><button onclick="updateElement(${i})" id="update">update</button></td>
                    <td><button onclick="deleteElement(${i})" id="delete">delete</button></td>
                </tr>
            `
            }
        }
    }else {
        for(let i = 0; i < tableBody.length; i++) {
            if (tableBody[i].category.includes(value)) {
                data += `
                <tr>
                    <td>${i}</td>
                    <td>${tableBody[i].title}</td>
                    <td>${tableBody[i].price}</td>
                    <td>${tableBody[i].taxes}</td>
                    <td>${tableBody[i].ads}</td>
                    <td>${tableBody[i].discount}</td>
                    <td>${tableBody[i].total}</td>
                    <td>${tableBody[i].category}</td>
                    <td><button onclick="updateElement(${i})" id="update">update</button></td>
                    <td><button onclick="deleteElement(${i})" id="delete">delete</button></td>
                </tr>
            `
            }
        }
    }

    document.querySelector("tbody").innerHTML = data;
}