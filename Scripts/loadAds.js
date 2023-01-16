function Ad(name, category, price, color, image, gender) {
    this.name = name
    this.category = category
    this.price = price
    this.color = color
    this.image = image
    this.gender = gender
}

function User(email, password, firstName, surName, birthDate) {
    this.email = email
    this.password = password
    this.firstName = firstName
    this.surName = surName
    this.birthDate = birthDate
}

let shirt = new Ad("T-Shirt", "Clothing", "14,99$", "White", "src", "Men")
let hoodie = new Ad("Hoodie", "Clothing", "35,99$", "Black", "src", "Women")
let hat = new Ad("Hat", "Clothing", "19,99$", "Gray", "src", "Unisex")
let watch = new Ad("Watch", "Accessories", "59,99$", "Black", "src", "Men")
let shirt_2 = new Ad("T-Shirt", "Clothing", "14,99$", "Pink", "src", "Women")
let watch_2 = new Ad("Watch", "Accessories", "59,99$", "Gray", "src", "Women")
let hoodie_2 = new Ad("Hoodie", "Clothing", "35,99$", "Yellow", "src", "Men")

let items = [
]
items.push(shirt, shirt_2, hoodie, hat, watch, watch_2, hoodie_2)
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

    if (window.location.pathname.includes(items[i].name)) {
        let description = document.getElementById("description")
        description.style.height = "269px"
        let selectElement =  document.getElementById("quantity")
        description.getElementsByTagName("div")[0].getElementsByTagName("h2")[0].innerHTML = localStorage.getItem("productName")
        description.getElementsByTagName("div")[1].getElementsByTagName("h3")[0].innerHTML = localStorage.getItem("productGender")
        description.getElementsByTagName("div")[2].getElementsByTagName("h3")[0].innerHTML = localStorage.getItem("productPrice")
        document.getElementById("colorDiv").getElementsByTagName("div")[0].style.backgroundColor = localStorage.getItem("productColor")

        document.getElementById("buyButton").onclick = function() {
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
            aElement.innerHTML = parsedCartArray[i].ad.name + " x " + parsedCartArray[i].quantity
            aElement.href = "/" + parsedCartArray[i].ad.name + ".html"
            newDiv.appendChild(aElement)
        }
    }
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
        document.getElementById("loginMenu").style.display = "block"
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

//adds a scroll event to listen to, makes the window.scroll work
//creates a funcion that takes in the event to listen for as a parameter
window.addEventListener("scroll", () => {

    //gets the nav-element from the html
    nav = document.querySelector("nav")

    let isClicked = false

    if (isClicked) {
        nav.style.transition = "0s"

        if (window.scrollY > 187) {
            nav.style.position = "fixed"
            nav.style.top = "0px"
        }
    }
    else if (!isClicked) {

        if (window.scrollY > 152) {
            nav.style.position = "fixed"
            nav.style.top = "0px"
            nav.style.transition = "0s"
            document.getElementById("loginMenu").style.marginTop = (60 + window.scrollY) + "px"
            document.getElementById("cartMenu").style.marginTop = (60 + window.scrollY) + "px"
        }
        else if (window.scrollY <= 152) {
            nav.style.position = "relative"
            nav.style.top = "0px"
            nav.style.transition = ".2s"
            document.getElementById("loginMenu").style.marginTop = "152px"
            document.getElementById("cartMenu").style.marginTop = "152px"
        }
    }
})

//adjusts the height of the "sidebar" div in the html
sidebar = document.getElementById("sidebar").style.height = "calc(100vh - 60px + 2px)"

//adds an event listener that will run the mobileMenu function once the menu "menu-icon" is clicked
document.getElementById("menu-icon").addEventListener("click", mobileMenu)

//this function is for the mobile menu, the hamburger menu that pops up when 
//the user is on mobile / screen-width is smaller
function mobileMenu() {
    //runs when the mobile menu is clicked and the menu is not showing
    if (!isClicked) {
        document.getElementById("sidebar").style.display = "inline"
        isClicked = true
        document.querySelector("footer").style.display = "none"
        document.querySelector("header").style.display = "none"
        nav.style.transition = "0s"
        nav.style.position = "fixed"
        nav.style.top = "0px"
    }
    //runs if the mobile menu is showing and the menu icon is clicked
    else {
        nav.style.position = "absolute"
        nav.style.top = "92px"
        document.getElementById("sidebar").style.display = "none"
        isClicked = false
        document.querySelector("footer").style.display = "flex"
        document.querySelector("header").style.display = "flex"
    }
}

function navLeftClick(id) {
    element = document.getElementById(id)
    element.style.backgroundColor = "rgb(201, 98, 61)";
}

function navLeftOut(id) {
    element = document.getElementById(id)
    element.style.backgroundColor = "coral";
}

let objPerCol = 3

var filters = {
    Gender: "Unisex",
    Products: "All",
    Colors: "All"
}

function resize() {

    if (document.querySelector("body").clientWidth >= 950) {
        objPerCol = 3

        searchArticles = document.getElementById("searchArticles")
        if (searchArticles != null) {
            searchArticles.style.justifyContent = "space-evenly"
        }
    }
    else if (document.querySelector("body").clientWidth >= 600 &&
        document.querySelector("body").clientWidth < 950) {
        objPerCol = 2
        searchArticles = document.getElementById("searchArticles")
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
    else {
        objPerCol = 1
        searchArticles = document.getElementById("searchArticles")
        searchArticles.style.justifyContent = "space-evenly"
    }
    loadArticles()
}
resize()

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
document.getElementsByClassName("filter").forEach(addEventListener("change", function() {
    filterChange()
}))

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
                item = document.createElement("div")
                item.className = "item"
                item.id = "item" + (i + 1)
                img = document.createElement("img")
                img.id = "img" + (i + 1)
                item.appendChild(img)
                h = document.createElement("h1")
                h.textContent = "Product Name"
                item.appendChild(h)
                d = document.createElement("div")
                item.appendChild(d)
                p = document.createElement("p")
                p.textContent = "Price $"
                p.style.textAlign = "center"
                p.id = "price" + (i + 1)
                p.style.width = "49%"
                cd = document.createElement("div")
                cd.id = "colorDiv" + (i + 1)
                s = document.createElement("p")
                s.style.width = "2%"
                s.textContent = "|"
                s.style.color = "black"
                p2 = document.createElement("p")
                p2.textContent = "Color: "
                p2.style.color = "black"
                cd.appendChild(p2)
                c = document.createElement("div")
                c.id = "color" + (i + 1)
                b = document.createElement("a")
                b.style.textDecoration = "none"
                b.className = "buyButton"
                b.href = items[i].name + ".html"
                b.onclick = (function(i) {return function() {
                    localStorage.setItem("productName", items[i].name)
                    localStorage.setItem("productCategory", items[i].category)
                    localStorage.setItem("productPrice", items[i].price)
                    localStorage.setItem("productColor", items[i].color)
                    localStorage.setItem("productImage", items[i].image)
                    localStorage.setItem("productGender", items[i].gender)
                }}(i))
                b.style.marginBottom = "25px"
                b.style.width = "60%"
                b.style.height = "35px"
                b.style.display = "flex"
                b.style.alignItems = "center"
                b.style.justifyContent = "center"
                bt = document.createElement("h2")
                bt.style.color = "white"
                bt.innerHTML = "Buy"
                item.appendChild(b)
                b.appendChild(bt)
                cd.appendChild(c)
                d.appendChild(p)
                d.appendChild(s)
                d.appendChild(cd)
                d.className = "colorPrice"
                document.getElementById("row" + (rowIndex - 1)).appendChild(item)
        
                d.style.display = "flex"
                d.style.height = "30px"
                d.style.width = "75%"
                document.getElementById("colorDiv" + (i + 1)).style.width = "49%"
                document.getElementById("colorDiv" + (i + 1)).style.display = "flex"
                document.getElementById("colorDiv" + (i + 1)).style.justifyContent = "center"
                document.getElementById("colorDiv" + (i + 1)).style.marginBottom = "10px"
                document.getElementById("color" + (i + 1)).style.width = "25px"
                document.getElementById("color" + (i + 1)).style.height = "25px"
                document.getElementById("color" + (i + 1)).style.borderRadius = "100%"
                document.getElementById("color" + (i + 1)).style.borderColor = "gray"
                document.getElementById("color" + (i + 1)).style.borderStyle = "solid"
                document.getElementById("color" + (i + 1)).style.borderWidth = "1px"
        
                document.getElementById("item" + (i + 1)).querySelector("h1").innerHTML = items[i].name
                document.getElementById("item" + (i + 1)).querySelector("p").innerHTML = items[i].price
                document.getElementById("img" + (i + 1)).style.backgroundImage = "url('img/" + items[i].name  + ".png')"
                document.getElementById("color" + (i + 1)).style.backgroundColor = items[i].color
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
                rowLength = 0
                for (l = 0; l < rows[i].childNodes.length; l++) {
                    rowLength++
                }
                //if there is more than 2 articles on row[i]
                if (rowLength > 2 || (objPerCol == 2)) {
                    rows[i].style.justifyContent = "center"
                }
                //if there is 1 or 2 articles on row[i]
                else {
                    rows[i].style.justifyContent = "flex-start"
                }
            }
        }
    }
}