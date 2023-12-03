function Ad(name, category, price, color, image, gender, url) {
    this.name = name
    this.category = category
    this.price = price
    this.color = color
    this.image = image
    this.gender = gender
    this.url = url
}

function User(email, password, firstName, surName, birthDate) {
    this.email = email
    this.password = password
    this.firstName = firstName
    this.surName = surName
    this.birthDate = birthDate
}

class Colors {

  static get RED() {return "RED"; }
  static get GREEN() {return "GREEN"; }
  static get BLUE() {return "BLUE"; }
  static get PINK() {return "PINK"; }
  static get BROWN() {return "BROWN"; }
  static get WHITE() {return "WHITE"; }
  static get BLACK() {return "BLACK"; }
  static get GRAY() {return "GRAY"; }
  static get YELLOW() {return "YELLOW"; }
  static get PURPLE() {return "PURPLE"; }
  static get ORANGE() {return "ORANGE"; }
  static get GOLD() {return "GOLD"; }
  static get SILVER() {return "SILVER"; }
  static get BRONZE() {return "BRONZE"; }
}


let shirt = new Ad("T-Shirt", "Clothing", "14,99$", [Colors.WHITE, Colors.RED], "src", "Men")
let long_name = new Ad("This product has a super fkn long name", "Clothing", "4,99$", [Colors.WHITE], "src", "Men")
let adodas = new Ad("Adodas Sleeve Hoodie Gray", "Clothing", "4,99$", [Colors.WHITE, Colors.GRAY], "src", "Men")
let hoodie = new Ad("Hoodie", "Clothing", "35,99$", [Colors.WHITE, Colors.BLACK, Colors.GRAY, Colors.PINK], "src", "Women")
let hat = new Ad("Hat", "Clothing", "19,99$", [Colors.GRAY], "src", "Unisex")
let hat_2 = new Ad("Hat", "Clothing", "22,99$", [Colors.WHITE], "src", "Unisex")
let watch = new Ad("Watch", "Accessories", "59,99$", [Colors.BLACK], "src", "Men")
let shirt_2 = new Ad("T-Shirt", "Clothing", "14,99$", [Colors.PINK], "src", "Women")
let watch_2 = new Ad("Watch", "Accessories", "59,99$", [Colors.GOLD, Colors.SILVER, Colors.BRONZE], "src", "Women")
let hoodie_2 = new Ad("Hoodie", "Clothing", "35,99$", [Colors.WHITE, Colors.YELLOW], "src", "Men")

let items = [
]
// items.push(shirt, long_name, adodas, shirt_2, hoodie, hat, hat_2, watch, watch_2, hoodie_2)
items.push(shirt, shirt_2, hoodie, hat, hat_2, watch, watch_2, hoodie_2)
let unsortedItems = []

for (i = 0; i < items.length; i ++) {
    unsortedItems.push(items[i])
}

function itemsSort(c) {
    let needsSorting = false

    switch(c) {
        case 0:
            for (i = 0; i < items.length; i++) {
                items.splice(i, 1, unsortedItems[i])
            }
            break;
        case 1:
            for(i = 0; i < items.length; i++) {
                if(items[i + 1] != undefined && items[i].price > items[i + 1 ].price) {
                    var current = items[i]
                    items.splice(i, 1)
                    items.splice((i + 1), 0, current)
                    needsSorting = true
                }
            }
            break;
        case 2:
            for(i = 0; i < items.length; i++) {
                if(items[i + 1] != undefined && items[i].price < items[i + 1 ].price) {
                    var current = items[i]
                    items.splice(i, 1)
                    items.splice((i + 1), 0, current)
                    needsSorting = true
                }
            }
            break;
        case 3:
            for(i = 0; i < items.length; i++) {
                if(items[i + 1] != undefined && items[i].name > items[i + 1 ].name) {
                    var current = items[i]
                    items.splice(i, 1)
                    items.splice((i + 1), 0, current)
                    needsSorting = true
                }
            }
            break
    }
    if (needsSorting) {itemsSort(c)}
}

function cartItem(ad, quantity) {
    this.ad = ad
    this.quantity = quantity
}

let cartItems = []

for (i = 0; i < items.length; i++) {

    if (window.location.pathname.toLowerCase().includes(items[i].name)) {
        let description = document.getElementById("description")
        description.style.height = "269px"
        let selectElement = document.getElementById("quantity")
        description.getElementsByTagName("div")[0].getElementsByTagName("h2")[0].innerHTML = localStorage.getItem("productName")
        description.getElementsByTagName("div")[1].getElementsByTagName("h3")[0].innerHTML = localStorage.getItem("productGender")
        description.getElementsByTagName("div")[2].getElementsByTagName("h3")[0].innerHTML = localStorage.getItem("productPrice")
        document.getElementById("colorDiv").getElementsByTagName("div")[0].style.backgroundColor = localStorage.getItem("productColor")

        document.getElementById("item" + (i + 1)).onclick = function() {
            if (selectElement.selectedIndex != 0) {

                let ad = new Ad(localStorage.getItem("productName"),
                localStorage.getItem("productCategory"),
                localStorage.getItem("productPrice"),
                localStorage.getItem("productColor"),
                localStorage.getItem("productImage"),
                localStorage.getItem("productGender"))

                let cartI = new cartItem(ad, selectElement.selectedIndex)
                cartItems.push(JSON.stringify([cartI]))

                if (localStorage.getItem("cart") != null) {
                    let cartItemsSplit = JSON.parse(localStorage.getItem("cart"))
                    cartI = JSON.stringify(cartI)
                    cartI = JSON.parse(cartI)
                    cartItemsSplit.push(cartI)
                    localStorage.setItem("cart", JSON.stringify(cartItemsSplit))
                }
                else {
                    localStorage.setItem("cart", cartItems[0])
                }
            }
            else {
                window.alert("Please select quantity")
            }
        }
    }
}

let user0 = new User("mattias-lindblad2001@hotmail.com", "123", "Mattias", "Lindblad", "2001-07-09")
let user1 = new User("anna.lundström@hotmail.se", "123", "Anna", "Lundström", "1999-01-04")

  // outputs the content of the text file
// fetch('users.txt')
//   .then(response => response.text())
//   .then(text => console.log(text))

let users = [

]

users.push(user0)
users.push(user1)

if (document.getElementById("registerButton") != undefined) {
    
    document.getElementById("registerButton").onclick = function() {
        let allDivs = document.getElementById("loginRegister").querySelectorAll("div")
        for (i = 0; i < allDivs.length; i++) {
            if (allDivs[i].querySelector("input") != null && allDivs[i].querySelector("input").value == "") {
                let input = allDivs[i].querySelector("input")
                input.style.borderStyle = "solid"
                input.style.borderWidth = "3px"
                input.style.borderColor = "red"
                setTimeout(() => {
                    input.style.borderStyle = "none"
                }, 3000)
                window.alert("field can not be empty!")
                return
            }
        }

        if (document.getElementById("passwordLogin").querySelector("input").value.length < 5) {
            let input = document.getElementById("passwordLogin").querySelector("input")
            input.style.borderStyle = "solid"
            input.style.borderWidth = "3px"
            input.style.borderColor = "red"
            setTimeout(() => {
                input.style.borderStyle = "none"
            }, 3000)
            window.alert("Password needs to be at least 5 characters!")
            return
        }

        location.href = "index.html"
        window.alert("Registration successful!")
    }
}

let cartMenuClicked = false
document.getElementById("cartMenu").style.display = "none"

document.getElementById("cart").onmouseenter = function() {
    document.getElementById("cart").style.setProperty("--invertCart", "100%")
}

document.getElementById("cart").onmouseleave = function() {
    if (!cartMenuClicked) {
        document.getElementById("cart").style.setProperty("--invertCart", "0%")
    }
}

cartHeightFunction = function() {
    if (localStorage.getItem("cart") != null) {
        let parsedCartArray = localStorage.getItem("cart").split("],[")
        parsedCartArray = JSON.parse(parsedCartArray)
        document.getElementById("cartMenu").style.height = 75 + (parsedCartArray.length * 25) + "px"

        let cartDiv = document.createElement("div")
        let cartP = document.createElement("p")
        cartP.innerText = "Cart:"
        cartDiv.appendChild(cartP)
        document.getElementById("cartMenu").getElementsByTagName("div")[0].replaceChildren()
        document.getElementById("cartMenu").getElementsByTagName("div")[0].appendChild(cartDiv)

        for(i = 0; i < parsedCartArray.length; i++) {
            let newDiv = document.createElement("div")
            document.getElementById("cartMenu").getElementsByTagName("div")[0].appendChild(newDiv)
            aElement = document.createElement("a")
            aElement.id = "cartItemLink"
            aElement.innerHTML = parsedCartArray[i].ad.name + " x " + parsedCartArray[i].quantity
            aElement.href = "/" + parsedCartArray[i].ad.name + ".html"
            newDiv.appendChild(aElement)
        }
    }
}

self.onclick = (event) => {
    console.log("element pressed: " + event.target.id)
    var id = event.target.id

    if (id != "char" && id != "cart")
    {
        closeMenus()
    }
}

closeMenus = () => {
    document.getElementById("loginMenu").style.display = "none"
    document.getElementById("cartMenu").style.display = "none"
    document.getElementById("char").style.setProperty("--invert", "0%")
    document.getElementById("cart").style.setProperty("--invertCart", "0%")
    cartMenuClicked = false
    loginMenuClicked = false
}

cartFunction = function() {

    if (!cartMenuClicked) {
        cartHeightFunction()
        document.getElementById("cartMenu").style.display = "flex"
        cartMenuClicked = true
        document.getElementById("cart").style.setProperty("--invertCart", "100%")
        loginMenuClicked = true
        document.getElementById("char").style.setProperty("--invert", "0%")
        charFunction()
    }
    else {
        document.getElementById("cartMenu").style.display = "none"
        cartMenuClicked = false
    }
}

let cart = document.getElementById("cart").onclick = function() {
    cartFunction()
}

let loginMenuClicked = false
document.getElementById("loginMenu").style.display = "none"

document.getElementById("char").onmouseenter = function() {
    document.getElementById("char").style.setProperty("--invert", "100%")
}

document.getElementById("char").onmouseleave = function() {
    if (!loginMenuClicked) {
        document.getElementById("char").style.setProperty("--invert", "0%")
    }
}

charFunction = function() {
    if (!loginMenuClicked) {
        document.getElementById("loginMenu").style.display = "flex"
        document.getElementById("loginMenu").style.flexDirection = "column"
        loginMenuClicked = true
        document.getElementById("char").style.setProperty("--invert", "100%")
        cartMenuClicked = true
        document.getElementById("cart").style.setProperty("--invertCart", "0%")
        cartFunction()
    }
    else {
        document.getElementById("loginMenu").style.display = "none"
        loginMenuClicked = false
    }
}

document.getElementById("char").onclick = function() {
    charFunction()
}

document.getElementById("logOut").style.display = "none"
document.getElementById("welcomeText").style.display = "none"
function loggingIn(firstName, surName) {
    if (loggedIn) {
        for (i = 0; i < document.getElementById("loginMenu").querySelectorAll("div").length; i++) {
            document.getElementById("loginMenu").querySelectorAll("div")[i].style.display = "flex"
        }
        document.getElementById("loginMenu").querySelectorAll("div")[7].style.height = "200px"
        document.getElementById("loginMenu").querySelectorAll("div")[7].style.display = "block"
        loggedIn = false
    }
    else {
        for (i = 0; i < document.getElementById("loginMenu").querySelectorAll("div").length; i++) {
            document.getElementById("loginMenu").querySelectorAll("div")[i].style.display = "none"
        }
        document.getElementById("loginMenu").querySelectorAll("div")[7].style.height = "120px"
        document.getElementById("loginMenu").querySelectorAll("div")[0].style.display = "flex"
        document.getElementById("loginMenu").querySelectorAll("div")[1].style.display = "flex"
        document.getElementById("loginMenu").querySelectorAll("div")[1].style.flexDirection = "column"
        document.getElementById("loginMenu").querySelectorAll("div")[7].style.display = "flex"
        document.getElementById("loginMenu").querySelectorAll("div")[7].style.flexDirection = "column"
        document.getElementById("loginMenu").querySelectorAll("div")[8].style.display = "flex"
        document.getElementById("loginMenu").querySelectorAll("div")[9].style.display = "flex"
        document.getElementById("loginMenu").querySelectorAll("div")[9].textContent = firstName + " " + surName
        document.getElementById("loginMenu").querySelectorAll("div")[10].style.display = "flex"
        loggedIn = true
    }
}

let loggedIn = false
document.getElementById("loginButton").onclick = function() {
    for(i = 0; i < users.length; i++) {
        email = document.getElementById("email").value
        password = document.getElementById("password").value
        if (email == users[i].email && password == users[i].password) {
            loggingIn(users[i].firstName, users[i].surName)
        }
    }
}

let isClicked = false

function Scroll() {
    //gets the nav-element from the html
    nav = document.querySelector("nav")

    if (document.querySelector("body").clientWidth > 600) {
        document.querySelector("body").appendChild(document.getElementById("loginMenu"))
        document.querySelector("body").appendChild(document.getElementById("cartMenu"))
        if (window.scrollY > 152) {
            nav.style.position = "fixed"
            nav.style.top = "0px"
            document.getElementById("loginMenu").style.marginTop = (60 + window.scrollY) + "px"
            document.getElementById("cartMenu").style.marginTop = (60 + window.scrollY) + "px"
        }
        else if (window.scrollY <= 152) {
            nav.style.position = "relative"
            nav.style.top = "0px"
            document.getElementById("loginMenu").style.marginTop = "152px"
            document.getElementById("cartMenu").style.marginTop = "152px"

        }
    }
    else {
        document.getElementById("sidebarLogin").appendChild(document.getElementById("loginMenu"))
        document.getElementById("loginMenu").style.display = "contents"
        document.getElementById("sidebarCart").appendChild(document.getElementById("cartMenu"))
        document.getElementById("cartMenu").style.backgroundColor = "transparent"
        document.getElementById("cartMenu").style.display = "contents"
        document.getElementById("cartMenu").style.borderStyle = "none"
        document.getElementById("cartMenu").style.right = "auto"
        document.getElementById("cartMenu").style.marginTop = "0px"
        document.getElementById("cartMenu").getElementsByTagName("div")[0].style.flexDirection = "column"
        document.getElementById("basketButton").style.width = "100%"
        document.getElementById("basketButton").parentElement.style.width = "100%"
        document.getElementById("sidebarCart").appendChild(document.getElementById("basketDiv"))
        document.getElementById("sidebarCart").style.flexDirection = "column"
        if (document.getElementById("cartContent") != null) {
            document.getElementById("cartContent").style.flexDirection = "column"
        }
        document.getElementById("basketDiv").appendChild(document.getElementById("basketButton"))
        cartHeightFunction()

        if (window.scrollY > 152) {
            nav.style.position = "fixed"
        }
        else  if (isClicked) {
            nav.style.position = "relative"
        }
    }
}

//adds a scroll event to listen to, makes the window.scroll work
//creates a funcion that takes in the event to listen for as a parameter
window.addEventListener("scroll", () => {
    Scroll()
})

//adjusts the height of the "sidebar" div in the html
sidebar = document.getElementById("sidebar").style.height = "calc(100vh - 60px + 2px)"

//adds an event listener that will run the mobileMenu function once the menu "menu-icon" is clicked
document.getElementById("menu-icon").addEventListener("click", mobileMenu)

//this function is for the mobile menu, the hamburger menu that pops up when 
//the user is on mobile / screen-width is smaller
function mobileMenu() {
    let nav = document.getElementsByTagName("nav")[0]

    //runs when the mobile menu is not showing
    if (document.querySelector("body").clientWidth > 600) {
        nav.style.top = "92px"
        document.getElementById("sidebar").style.display = "none"
        document.querySelector("footer").style.display = "flex"
        document.querySelector("header").style.display = "flex"
        isClicked = false
    }
    else if (document.querySelector("body").clientWidth <= 600) {
        //runs when the mobile menu is clicked and the menu is not showing
        if (isClicked) {
            document.getElementById("sidebar").style.display = "flex"
            isClicked = false
            document.querySelector("footer").style.display = "none"
            document.querySelector("header").style.display = "none"
            nav.style.position = "fixed"
        }
        //runs if the mobile menu is showing and the menu icon is clicked
        else if (!isClicked) {
            document.getElementById("sidebar").style.display = "none"
            isClicked = true
            document.querySelector("footer").style.display = "flex"
            document.querySelector("header").style.display = "flex"
        }
    }
    Scroll()
}

function navLeftClick(id) {
    element = document.getElementById(id)
    element.style.backgroundColor = "rgb(201, 98, 61)";
}

function navLeftOut(id) {
    element = document.getElementById(id)
    element.style.backgroundColor = "coral";
}

let objPerCol

var filters = {
    Gender: "Unisex",
    Products: "All",
    Colors: "All"
}

function resize() {

    mobileMenu()
    document.getElementsByClassName("filter")[0].getElementsByTagName("option")[0].textContent = "Filter By Gender"
    document.getElementsByClassName("filter")[1].getElementsByTagName("option")[0].textContent = "Filter By Product"
    document.getElementsByClassName("filter")[2].getElementsByTagName("option")[0].textContent = "Filter By Color"
    document.getElementsByClassName("filter")[3].getElementsByTagName("option")[0].textContent = "SORT BY"
    
    document.getElementsByClassName("filter")[0].style.width = "20%"
    document.getElementsByClassName("filter")[1].style.width = "20%"
    document.getElementsByClassName("filter")[2].style.width = "20%"
    document.getElementsByClassName("filter")[3].style.width = "20%"

    loginMenuClicked = true
    charFunction()

    cartMenuClicked = true
    cartFunction()

    document.getElementById("char").style.setProperty("--invertCart", "0%")
    document.getElementById("cart").style.setProperty("--invertCart", "0%")

    searchArticles = document.getElementById("searchArticles")
    searchArticles.style.flexDirection = "row"
    searchArticles.style.backgroundColor = "White"
    searchArticles.style.width = "80%"

    var clientWidth = document.querySelector("body").clientWidth

    if (clientWidth >= 950) {
        objPerCol = 4

        if (searchArticles != null) {
            searchArticles.style.justifyContent = "space-evenly"
        }
    }
    else if (clientWidth >= 600 && clientWidth < 950) {
        objPerCol = 3
        if (searchArticles != null) {
            searchArticles.style.justifyContent = "space-evenly"
        }

        itemElements = document.getElementsByClassName("item")

        for (i = 0; i < itemElements.length; i++) {
            itemElements[i].children[0].style.backgroundImage = "none"
            itemElements[i].children[0].style.height = "40%"
            itemElements[i].children[0].style.width = "350px * 0.4"
        }
    }
    else if (clientWidth < 600) {
        objPerCol = 2
        searchArticles.style.justifyContent = "space-evenly"

        document.getElementsByClassName("filter")[0].getElementsByTagName("option")[0].textContent = "Gender"
        document.getElementsByClassName("filter")[1].getElementsByTagName("option")[0].textContent = "Product"
        document.getElementsByClassName("filter")[2].getElementsByTagName("option")[0].textContent = "Color"
        document.getElementsByClassName("filter")[3].getElementsByTagName("option")[0].textContent = "Sort"
    }
    if (clientWidth <= 335) {
        objPerCol = 1
        searchArticles.style.flexDirection = "column"
        searchArticles.style.backgroundColor = "rgb(245, 245, 245)"
        searchArticles.style.width = "100%"

        document.getElementsByClassName("filter")[0].style.width = "50%"
        document.getElementsByClassName("filter")[1].style.width = "50%"
        document.getElementsByClassName("filter")[2].style.width = "50%"
        document.getElementsByClassName("filter")[3].style.width = "50%"
    }
    loadArticles()
}

if (window.location.pathname.includes("index")) {
    resize()
}

window.onresize = () => {
    resize()
}

var itemsToShow = []
document.getElementById("input-logo").onclick = function() {
    if (window.location.pathname.includes("index")) {
        loadArticles()
    }
    else {
        window.location.href = "/index.html"
    }
}

//adds an event listener who listens for when any of the values of the filter-select-boxes changes
const elementsArray = Array.from(document.getElementsByClassName("filter"))
elementsArray.forEach(element => {
    element.addEventListener("change", filterChange)
})

function filterChange() {

    if (window.location.pathname.includes("index")) {
        switch(document.getElementsByClassName("filter")[0].selectedIndex) {
            case 0:
                filters.Gender = "Unisex"
                break;
            case 1:
                filters.Gender = "Men"
                break;
            case 2:
                filters.Gender = "Women"
                break;
        }
        switch(document.getElementsByClassName("filter")[1].selectedIndex) {
            case 0:
                filters.Products = "All"
                break;
            case 1:
                filters.Products = "Clothing"
                break;
            case 2:
                filters.Products = "Accessories"
                break;
        }
        switch(document.getElementsByClassName("filter")[2].selectedIndex) {
            case 0:
                filters.Colors = "All"
                break;
            case 1:
                filters.Colors = "White"
                break;
            case 2:
                filters.Colors = "Gray"
                break;
            case 3:
                filters.Colors = "Black"
                break;
            case 4:
                filters.Colors = "Red"
                break;
            case 5:
                filters.Colors = "Green"
                break;
            case 6:
                filters.Colors = "Yellow"
                break;
            case 7:
                filters.Colors = "Orange"
                break;
            case 8:
                filters.Colors = "Blue"
                break;
            case 9:
                filters.Colors = "Pink"
                break;
            case 10:
                filters.Colors = "Purple"
                break;
            case 11:
                filters.Colors = "Brown"
                break;
        }
        itemsSort(document.getElementsByClassName("filter")[3].selectedIndex)
        loadArticles()
    }
}
loadArticles()

function loadArticles() {
    if (window.location.pathname.includes("index")) {
        console.clear
        let rowNum = 1
        itemsToShow = []
    
        if (document.querySelectorAll(".row") != null && document.querySelectorAll(".row") != undefined) {
            Array.prototype.forEach.call(document.querySelectorAll(".row"), function (node) {
                node.parentNode.removeChild(node)
            })
        }
    
        if (document.querySelectorAll(".item") != null && document.querySelectorAll(".item") != undefined) {
            Array.prototype.forEach.call(document.querySelectorAll(".item"), function (node) {
                node.parentNode.removeChild(node)
            })
        }
    
        let rowIndex = 1
    
        //creates the rows in which the products will be contained
        for (i = 0; i < items.length; i++) {
            if (i == 0 || i % objPerCol == 0) {
                row = document.createElement("div")
                row.className = "row"
                row.id = "row" + rowIndex
                document.getElementById("articles").appendChild(row)
                rowIndex++;
            }
    
            if ((items[i].gender != filters.Gender && filters.Gender != "Unisex" && items[i].gender != "Unisex")
            || (items[i].category != filters.Products && filters.Products != "All")
            || (items[i].color != filters.Colors && filters.Colors != "All")) {
            }
            else if (items[i].name.toLowerCase().includes(document.getElementById("input-box").value.toLowerCase())) {
                itemsToShow.push(items[i])
                item = document.createElement("a")
                item.href = items[i].name + ".html"
                item.className = "item"
                item.id = "item" + (i + 1)
                img = document.createElement("img")
                img.id = "img" + (i + 1)
                item.appendChild(img)
                productTitle = document.createElement("h1")
                item.appendChild(productTitle)
                colorPrice = document.createElement("div")
                colorPrice.className = "colorPrice" + (i + 1)
                colorPrice.style.display = "flex"
                colorPrice.style.width = "100%"
                colorPrice.style.alignItems = "center"
                colorPrice.style.justifyContent = "space-between"
                item.appendChild(colorPrice)
                price = document.createElement("p")
                price.style.textAlign = "center"
                price.id = "price" + (i + 1)
                price.textContent = items[i].price
                price.style.width = "49%"
                item.appendChild(price)
                colorDiv = document.createElement("div")
                colorDiv.className = "colorDiv"
                colorDiv.style.width = "49%"
                colorDiv.style.display = "flex"
                colorDiv.style.justifyContent = "center"
                colorPrice.appendChild(colorDiv)

                var colors = String(items[i].color).split(",")

                for(j = 0; j < colors.length; j++)
                {
                    color = document.createElement("div")
                    color.className = "color" + (j + 1)
                    color.style.display = "flex"
                    color.style.width = "15px"
                    color.style.height = "15px"
                    color.style.borderRadius = "100%"
                    color.style.borderColor = "gray"
                    color.style.borderStyle = "solid"
                    color.style.borderWidth = "1px"
                    color.style.backgroundColor = colors[j]
                    colorDiv.appendChild(color)
                }
                
                middleMark = document.createElement("p")
                middleMark.id = "middleMark"
                middleMark.textContent = "|"
                colorPrice.appendChild(middleMark)
                colorPrice.appendChild(price)
                item.appendChild(colorPrice)
                document.getElementById("row" + (rowIndex - 1)).appendChild(item)
        
                document.getElementById("item" + (i + 1)).querySelector("h1").innerHTML = items[i].name
                document.getElementById("img" + (i + 1)).style.backgroundImage = "url('img/" + items[i].name  + ".png')"
            }
        }
    
        for (i = 0; i < itemsToShow.length; i++) {

            for (l = 0; l < items.length; l ++) {
                if (items[l] == itemsToShow[i]) {
    
                    if (i == 0 || i < objPerCol * rowNum) {
                        document.getElementById("row" + rowNum).appendChild(document.getElementById("item" + (l + 1)))
                    }
                    else if (i % objPerCol == 0) {
                        rowNum++
                        document.getElementById("row" + rowNum).appendChild(document.getElementById("item" + (l + 1)))
                    }
                }
            }
        }
    
        rows = document.getElementsByClassName("row")
        for (i = 0; i < rows.length; i++) {
    
            //if there is only one object per column, this
            //this the case for narrow viewports, in most cases mobile
            if (objPerCol == 1) {
                rows[i].style.justifyContent = "center"
            }
            else {
                //checks how many products per row there are
                for (rowLength = 0; rowLength < rows[i].childNodes.length; l++) {
                    rowLength++
                }
                //if there is more than 2 articles on row[i]
                if (rowLength > 2) {
                    rows[i].style.justifyContent = "space-between"
                }
                //if there is 1 or 2 articles on row[i]
                else {
                    rows[i].style.justifyContent = "space-evenly"
                }
            }
        }
    }
}