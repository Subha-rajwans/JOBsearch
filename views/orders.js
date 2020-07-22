var divOrders = document.getElementById('divOrders');
var start = 0;
var limit = 5;
var index = start + 1;
var activeuser = getActiveUser();

function storeActiveUser(activeuser) {
    localStorage.activeuser = JSON.stringify(activeuser);
}

function getActiveUser() {
    if (!localStorage.activeuser) {
        localStorage.activeuser = JSON.stringify("");
    }
    return JSON.parse(localStorage.activeuser);
}



function getOrders() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/getOrders?since=' + start + '&per_page=' + limit);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        // readyState 4 means the request is done.
        // status 200 is a successful return.
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
            let orders = JSON.parse(xhttp.responseText);
            if (orders == []) {
                var noOrders = document.createElement('p');
                noOrders.innerHTML = 'Looks like you haven\'t ordered anything yet.<br>Click <a style="color:white" href=\'/listproducts\'>here</a> to place your first order!';
                divOrders.appendChild(noOrders);
            }
            if (Array.isArray(orders) && orders.length) {
                orders.forEach(function(order) {
                    addToDOM(order);
                });
                getOrderCount();
            }
        } else {
            // An error occurred during the request.
            console.log(xhttp.status);
        }
    };

}

var divnextprev = document.getElementById("divnextprev");
var divnextprev1 = document.getElementById("divnextprev1");

function getOrderCount() {
    var rxhr = new XMLHttpRequest();
    rxhr.open("GET", '/getOrderCount');
    rxhr.send();
    rxhr.onreadystatechange = function() {
        // readyState 4 means the request is done.
        // status 200 is a successful return.
        if (rxhr.readyState == 4 && rxhr.status == 200) {
            //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
            var count1 = JSON.parse(rxhr.responseText);
            var count = count1.count2;
            createButtons(count);
            createButtons1(count);
        } else {
            // An error occurred during the request.
            console.log(rxhr.status);
        }
    };
}

function createButtons(count) {

    var next = document.createElement("button");
    next.innerHTML = "Next >>";
    next.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #fffcea;border: none;color: rgb(58, 8, 8);text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    next.addEventListener("click", function(event) {
        nextFunction();
    });
    if (start + limit >= count) {
        next.disabled = true;
    }


    var prev = document.createElement("button");
    prev.innerHTML = "<< Previous";
    prev.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #fffcea;border: none;color: rgb(58, 8, 8);text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    prev.addEventListener("click", function(event) {
        prevFunction();
    });
    if (start - limit < 0) {
        prev.disabled = true;
    }
    divnextprev.appendChild(prev);
    divnextprev.appendChild(next);
}

function createButtons1(count) {

    var next1 = document.createElement("button");
    next1.innerHTML = "Next";
    next1.setAttribute("style", "width:100px;height:25px");
    next1.addEventListener("click", function(event) {
        nextFunction();
    });
    if (start + limit >= count) {
        next1.disabled = true;
    }


    var prev1 = document.createElement("button");
    prev1.innerHTML = "Previous";
    prev1.setAttribute("style", "width:100px;height:25px");
    prev1.addEventListener("click", function(event) {
        prevFunction();
    });
    if (start - limit < 0) {
        prev1.disabled = true;
    }
    divnextprev1.appendChild(prev1);
    divnextprev1.appendChild(next1);
}


function nextFunction() {
    start += 5;
    divListProducts.innerHTML = "";
    divnextprev.innerHTML = "";
    divnextprev1.innerHTML = "";
    index = start + 1;

    getOrders();

}

function prevFunction() {
    divListProducts.innerHTML = "";
    divnextprev.innerHTML = "";
    divnextprev1.innerHTML = "";
    start -= 5;
    index = start + 1;
    getOrders();

}


function addToDOM(obj) {
    var divOrder = document.createElement('div');
    var orderno = document.createElement('p');
    orderno.innerHTML = '<b>Order number :</b> ' + obj.PaymentId.slice(6);

    var totalAmount = document.createElement('p');
    totalAmount.innerHTML = '<b>Bill Amount : </b>' + obj.Amount;

    var buttonViewItems = document.createElement('button');
    buttonViewItems.innerHTML = 'See more';
    buttonViewItems.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #fffcea;border: none;color: rgb(58, 8, 8);text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;")

    var divItems = document.createElement('div');
    divItems.style.display = "none";

    var tableItems = document.createElement('table');
    var tr = document.createElement('tr');
    tableItems.appendChild(tr);

    var thName = document.createElement('th');
    thName.innerHTML = 'Name';
    var thPrice = document.createElement('th');
    thPrice.innerHTML = 'Price';
    var thTax = document.createElement('th');
    thTax.innerHTML = 'Tax';
    var thQuantity = document.createElement('th');
    thQuantity.innerHTML = 'Quantity';
    tr.appendChild(thName);
    tr.appendChild(thPrice);
    tr.appendChild(thTax);
    tr.appendChild(thQuantity);

    for (let i = 0; i < obj.Items.length; i++) {
        console.log(obj.Items[i]);
        var x = obj.Items[i];
        var tr = document.createElement('tr');
        tableItems.appendChild(tr);

        var itemName = document.createElement('td');
        itemName.innerHTML = x.name;
        var itemPrice = document.createElement('td');
        itemPrice.innerHTML = x.price;
        var itemTax = document.createElement('td');
        itemTax.innerHTML = x.tax;
        var itemQuantity = document.createElement('td');
        itemQuantity.innerHTML = x.quantity;
        tr.appendChild(itemName);
        tr.appendChild(itemPrice);
        tr.appendChild(itemTax);
        tr.appendChild(itemQuantity);

    }


    buttonViewItems.addEventListener("click", function(event) {
        console.log('button pressed');
        //toggle b/w hide and unhide divitems
        if (buttonViewItems.innerHTML == "See less") {
            //dots.style.display = "inline";
            buttonViewItems.innerHTML = "See more";
            divItems.style.display = "none";
        } else {
            //dots.style.display = "none";
            buttonViewItems.innerHTML = "See less";
            divItems.style.display = "inline";
        }
    });




    divOrder.appendChild(orderno);
    divOrder.appendChild(totalAmount);
    divOrder.appendChild(buttonViewItems);
    addSpace(divOrder, 1);
    divOrder.appendChild(divItems);
    divItems.appendChild(tableItems);
    divOrders.appendChild(divOrder);
    addSpace(divOrder, 2);

}

function addSpace(target, number) {
    for (var i = 0; i < number; i++) {
        var blankLine = document.createElement("br");
        target.appendChild(blankLine);
    }
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
            window.location = '/login';
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
    aLogin.style.display = "none";
    aRegister.style.display = "none";
}