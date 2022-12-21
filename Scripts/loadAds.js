//adds a scroll event to listen to, makes the window.scroll work
//creates a funcion that takes in the event to listen for as a parameter
window.addEventListener("scroll", () => {

    //gets the nav-element from the html
    nav = document.querySelector("nav")

    if (isClicked) {
        nav.style.transition = "0s"

        if (window.scrollY > 187) {
            nav.style.position = "fixed"
            nav.style.top = "0px"
        }
    }
    else if (!isClicked) {

        if (window.scrollY > 187) {
            nav.style.position = "fixed"
            nav.style.top = "0px"
            nav.style.transition = "0s"
        }
        else if (window.scrollY <= 187) {
            nav.style.position = "relative"
            nav.style.top = "0px"
            nav.style.transition = ".2s"
        }
    }
})

//adjusts the height of the "sidebar" div in the html
sidebar = document.getElementById("sidebar").style.height = "calc(100vh - 60px + 2px)"

let isClicked = false

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

let objPerCol

function resize() {

    if (document.querySelector("body").clientWidth > 600) {
        
    }

    if (document.querySelector("body").clientWidth >= 950) {
        objPerCol = 3

        searchArticles = document.getElementById("searchArticles")
        searchArticles.style.justifyContent = "flex-end"
    }
    else if (document.querySelector("body").clientWidth >= 600 &&
        document.querySelector("body").clientWidth < 950) {
        objPerCol = 2
        searchArticles = document.getElementById("searchArticles")
        searchArticles.style.justifyContent = "space-evenly"

        items = document.getElementsByClassName("item")

        for (i = 0; i < items.length; i++) {
            console.log(items[i].children[0])
            items[i].children[0].style.backgroundImage = "none"
            items[i].children[0].style.height = "40%"
            items[i].children[0].style.width = "350px * 0.4"
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

loadArticles()

function loadArticles() {
    let numOfItems = 7

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

    for (i = 0; i < numOfItems; i++) {

        if (i == 0 || i % objPerCol == 0) {
            row = document.createElement("div")
            row.className = "row"
            row.id = "row" + rowIndex
            articles.appendChild(row)
            rowIndex++;
        }

        item = document.createElement("div")
        item.className = "item"
        img = document.createElement("img")
        item.appendChild(img)
        h = document.createElement("h1")
        h.textContent = "Product Name"
        item.appendChild(h)
        p = document.createElement("p")
        p.textContent = "Price"
        item.appendChild(p)
        document.getElementById("row" + (rowIndex - 1)).appendChild(item)
    }
    rows = document.getElementsByClassName("row")

    for (i = 0; i < rows.length; i++) {

        if (objPerCol == 1) {
            rows[i].style.justifyContent = "center"
        }
        else {
            rowLength = 0
            for (l = 0; l < rows[i].childNodes.length; l++) {
                rowLength++
            }

            if (rowLength > 1) {
                rows[i].style.justifyContent = "center"
            }
            else {
                rows[i].style.justifyContent = "start"
            }
        }
    }
}