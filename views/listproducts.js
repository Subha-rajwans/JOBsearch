var rhttp = new XMLHttpRequest();
var xhttp = new XMLHttpRequest();
var ahttp = new XMLHttpRequest();
var http = new XMLHttpRequest();
var activeuser = getActiveUser();
var start = 0;
var limit = 4;
var index = start + 1;
var wishArray = [];
var searchArray = [];
var searchIndex = start + 1;

//--------------------------------------------------------wishlist storage---------------------------
wishArray = getStoredWishlist();

function getStoredWishlist() {
    if (!localStorage.wishlist) {

        localStorage.wishlist = "[]";
    }
    return JSON.parse(localStorage.wishlist);
}
//-----------------------------------------------------------------------------------------------------
function getActiveUser() {
    if (!localStorage.activeuser) {
        localStorage.activeuser = JSON.stringify("");
    }
    return JSON.parse(localStorage.activeuser);
}

function storeActiveUser(activeuser) {
    localStorage.activeuser = JSON.stringify(activeuser);
}

function getStoredProducts() {
    xhttp.open('GET', '/products?since=' + start + '&per_page=' + limit);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        // readyState 4 means the request is done.
        // status 200 is a successful return.
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
            let products = JSON.parse(xhttp.responseText);
            if (Array.isArray(products) && products.length) {
                products.forEach(function(product) {
                    addToDOM(product, true);
                });
                getProductCount();
            }
        } else {
            // An error occurred during the request.
            console.log(xhttp.status);
        }
    };
}

var divnextprev = document.getElementById("divnextprev");

function getProductCount() {
    var rxhr = new XMLHttpRequest();
    rxhr.open("GET", '/getProductCount');
    rxhr.send();
    rxhr.onreadystatechange = function() {
        // readyState 4 means the request is done.
        // status 200 is a successful return.
        if (rxhr.readyState == 4 && rxhr.status == 200) {
            //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
            var count1 = JSON.parse(rxhr.responseText);
            var count = count1.count2;
            createButtons(count);

        } else {
            // An error occurred during the request.
            console.log(rxhr.status);
        }
    };
}

function createButtons(count) {

    var next = document.createElement("button");
    next.innerHTML = "Next >>";
    next.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    next.addEventListener("click", function(event) {
        nextFunction();
    });
    if (start + limit >= count) {
        next.disabled = true;
    }


    var prev = document.createElement("button");
    prev.innerHTML = "<< Previous";
    prev.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    prev.addEventListener("click", function(event) {
        prevFunction();
    });
    if (start - limit < 0) {
        prev.disabled = true;
    }
    divnextprev.appendChild(prev);
    divnextprev.appendChild(next);
}



function nextFunction() {
    start += 4;
    divListProducts.innerHTML = "";
    divnextprev.innerHTML = "";
    index = start + 1;

    getStoredProducts();

}

function prevFunction() {
    divListProducts.innerHTML = "";
    divnextprev.innerHTML = "";
    divnextprev1.innerHTML = "";
    start -= 4;
    index = start + 1;
    getStoredProducts();

}

function addSpace(target, number) {
    for (var i = 0; i < number; i++) {
        var blankLine = document.createElement("br");
        target.appendChild(blankLine);
    }
}

function addToDOM(objectProduct, bool) {
    var divProductAdded = document.createElement("div");
    divProductAdded.setAttribute("id", "divProductAdded");
    divProductAdded.setAttribute("style", "padding-bottom: inherit;");

    var txtProductName = document.createElement("p");
    txtProductName.setAttribute('style', 'font-size: 20;color: black;margin-bottom:0;')
    if (bool == true) {
        txtProductName.innerHTML = index + ".  " + objectProduct.Name;
        index++;
    } else {
        txtProductName.innerHTML = "  " + objectProduct.Name;

    }

    var txtProductDesc = document.createElement("p");
    txtProductDesc.setAttribute("style", "color: black;padding-left:5%;margin:9;");
    txtProductDesc.innerHTML = "  " + objectProduct.Description;

    var txtProductPrice = document.createElement("p");
    txtProductPrice.setAttribute("style", "color: black;padding-left:5%;margin : 9 0;")
    txtProductPrice.innerHTML = "Vacancies : " + objectProduct.Price;

    divProductAdded.appendChild(txtProductName);
    divProductAdded.appendChild(txtProductDesc);
    divProductAdded.appendChild(txtProductPrice);

    if (objectProduct.Quantity <= 0) {
        var txtOutofStock = document.createElement("p");
        txtOutofStock.setAttribute("style", "color: black;padding-left:5%;");
        txtOutofStock.innerHTML = "Out Of Stock!";
        divProductAdded.appendChild(txtOutofStock);
    } else {
    /*    var textQuantity = document.createElement("input");
        textQuantity.setAttribute("id", objectProduct._id);
        textQuantity.setAttribute("type", "number");
        textQuantity.setAttribute("placeholder", "Enter quantity");
        textQuantity.setAttribute("style", "width: 130px;box-sizing: border-box;border: 2px solid #ccc;border-radius: 4px;font-size: 12px;background-color: #eee ;background-repeat: no-repeat;padding: 4px 20px 4px 4px;transition: width 0.4s ease-in-out;");
        divProductAdded.appendChild(textQuantity); 
     */   

        var btnAddToCart = document.createElement("button");
        btnAddToCart.setAttribute("id", objectProduct._id);
        btnAddToCart.innerHTML = "Apply";
        btnAddToCart.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
        //divProductAdded.appendChild(btnAddToCart);
        btnAddToCart.addEventListener("click", function(event) {
            if (checkLogin()) {
                    ahttp.open('GET', '/checkquantity?id=' + btnAddToCart.id);
                    ahttp.send();
                    ahttp.onreadystatechange = function() {
                        if (ahttp.readyState == 4 && ahttp.status == 200) {
                            let available = JSON.parse(ahttp.responseText);
                            console.log('available quantity\t', available.Quantity, " ", parseInt(textQuantity.value));
                            
                        } else {
                            console.log(ahttp.status);
                        }

                    };
                }
            else {
                alert("Kindly login to apply!");
            }
        });
    }
    //----------------------------------------------------add to wishlist---------------------------------------

    var objectProduct2 = {
        _id: objectProduct._id,
        Name: objectProduct.Name,
        Description: objectProduct.Description,
        Price: objectProduct.Price,
        User: activeuser,
        Quantity: objectProduct.Quantity


    }

    var btnAddToWish = document.createElement("button");
    btnAddToWish.setAttribute("id", objectProduct2._id);
    btnAddToWish.innerHTML = "Apply";
    btnAddToWish.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    divProductAdded.appendChild(btnAddToWish);

    function inWishArray() {
        for (var i = 0; i < wishArray.length; i++) {
            if (wishArray[i].Name == objectProduct2.Name && wishArray[i].User == activeuser)
                return true;
        }
        return false;

    }


    if (inWishArray()) {

        btnAddToWish.setAttribute("disabled", "true");
        btnAddToWish.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;margin: 5px; text-decoration:line-through");
    }

    btnAddToWish.addEventListener("click", function(event) {
        if (activeuser == "") {
            prompt("Login first");
            location.href = "login";
        } else {
            wishArray.push(objectProduct2);
            storeWishlist(wishArray);

            btnAddToWish.setAttribute("disabled", "true");

            btnAddToWish.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;margin: 5px; text-decoration:line-through");
        }
    })


    function storeWishlist(array) {
        localStorage.wishlist = JSON.stringify(array);
    }


    //----------------------------------------------------------------------------------------------------------

    divListProducts.appendChild(divProductAdded);
}

function checkPrevEntry(productid, quantity, available, name, price) {
    var chttp = new XMLHttpRequest();
    chttp.open("GET", '/checkPrevEntry?id=' + productid + '&user=' + activeuser);
    chttp.send();
    chttp.onreadystatechange = function() {
        if (chttp.readyState == 4 & chttp.status == 200) {
            let prevEntry = JSON.parse(chttp.responseText);
            console.log('Prev entry', prevEntry);
            if (prevEntry.Name != null) {
                oldQuantity = prevEntry.Quantity;
                newQuantity = parseInt(oldQuantity) + parseInt(quantity);
                console.log('new quantity', typeof newQuantity, newQuantity)
                if (available >= newQuantity) {
                    removeOldEntry(prevEntry);
                    addToCart(productid, newQuantity, name, price);
                } else {
                    alert("Not enough Stock!");
                }
            } else {
                addToCart(productid, quantity, name, price);
            }
        }
    }
}

function checkLogin() {
    if (activeuser != "") {
        return true;
    } else {
        false;
    }
}

function removeOldEntry(prevEntry) {
    var rxhr = new XMLHttpRequest();
    console.log("prevEntry", prevEntry);
    rxhr.open("POST", '/removeOldEntry', true);
    rxhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rxhr.onreadystatechange = function() {
        if (rxhr.readyState == 4 && rxhr.status == 200) {

        }
    }
    rxhr.send('id=' + prevEntry._id);
}

function addToCart(productid, quantity, name, price) {

    http.open("POST", '/addToCart', true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert("Added to Cart!");
        }
    }
    http.send('id=' + productid + '&user=' + activeuser + '&quantity=' + quantity + '&name=' + name + '&price=' + price);
}



function userLogout() {
    activeuser = "";
    storeActiveUser(activeuser);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/logout');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('logging out');
            window.location = "/login";
        } else {
            console.log(xhttp.status);
        }
    }

}

var aAddProduct = document.getElementById("aAddProduct");
if (activeuser != "admin") {
    aAddProduct.style.display = "none";
}

var txtWelcome = document.getElementById("txtWelcome");
var aLogin = document.getElementById("aLogin");
var aLogout = document.getElementById("aLogout");
var aRegister = document.getElementById("aRegister");
if (activeuser == "") {
    txtWelcome.innerHTML = "Welcome, Guest!";
    aLogout.style.display = "none";
} else {
    txtWelcome.innerHTML = "Welcome, " + activeuser + "!";
    aRegister.style.display = "none";
}


//----------------------------------------Search in Database----------------------------------------------

var searchBar = document.getElementById("search");

function getSearchArray(input) {

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let Searchproducts = JSON.parse(xhttp.responseText);
            if (Array.isArray(Searchproducts) && Searchproducts.length) {

                divListProducts.innerHTML = "";
                Searchproducts.forEach(function(product) {

                    addToDOM(product, false);
                });
                //getProductCount();
            }
        } else {
            divListProducts.innerHTML = "";
            var head = document.createElement("h1");
            head.innerHTML = "No Product Found";
            divListProducts.appendChild(head);
        }

    }

    xhttp.open("GET", '/getSearch?input=' + input, true);
    xhttp.send();
}

function searchDatabase() {

    var input = searchBar.value;
    getSearchArray(input);
}