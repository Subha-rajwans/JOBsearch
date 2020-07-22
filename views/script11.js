var http = new XMLHttpRequest();
var xhttp = new XMLHttpRequest();
var ahttp = new XMLHttpRequest();
var aAddNewProduct = document.getElementById("aAddNewProduct");
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var activeuser = getActiveUser();
var start = 0;
var limit = 4;
var index = start + 1;

function storeActiveUser(activeuser) {
    localStorage.activeuser = JSON.stringify(activeuser);
}

function getActiveUser() {
    if (!localStorage.activeuser) {
        localStorage.activeuser = JSON.stringify("");
    }
    return JSON.parse(localStorage.activeuser);
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
                    addToDOM(product);
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
    next.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: black;border: none;color: #FFFFFF;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    next.addEventListener("click", function(event) {
        nextFunction();
    });
    if (start + limit >= count) {
        next.disabled = true;
    }


    var prev = document.createElement("button");
    prev.innerHTML = "<< Previous";
    prev.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: black;border: none;color: #FFFFFF;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
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
    divnextprev1.innerHTML = "";
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
aAddNewProduct.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: rgb(58, 8, 8);text-align: center;padding: 5px;height: 25px;transition: all 0.5s;cursor: pointer;margin: 5px;")
aAddNewProduct.addEventListener("click", function(event) {
    addNewProduct();
});

function addNewProduct() {

    hideAddNewProductLink(aAddNewProduct);
    var formAddProduct = document.createElement("form");
    formAddProduct.setAttribute("name", "formEditProduct");
    //  formAddProduct.setAttribute("onsubmit","addToObject()");
    formAddProduct.setAttribute("action", "/addProduct");
    formAddProduct.setAttribute("method", "POST");

    var labelAddProduct = document.createElement("label");
    labelAddProduct.innerHTML = "Enter Job Details";
    formAddProduct.appendChild(labelAddProduct);

    addSpace(formAddProduct, 2);

    var inputProductName = document.createElement("input");
    inputProductName.setAttribute("name", "Name");
    inputProductName.setAttribute("type", "text");
    inputProductName.setAttribute("placeholder", "Company Name");
    inputProductName.setAttribute("style", "width:40%");
    formAddProduct.appendChild(inputProductName);

    addSpace(formAddProduct, 2);

    var labelProductDescp = document.createElement("label");
    labelProductDescp.innerHTML = "Job Description";
    formAddProduct.appendChild(labelProductDescp);

    addSpace(formAddProduct, 2);

    var inputProductDescp = document.createElement("textarea");
    inputProductDescp.setAttribute("name", "Descp");
    inputProductDescp.setAttribute("type", "text");
    inputProductDescp.setAttribute("placeholder", "Enter Job description");
    inputProductDescp.setAttribute("style", "width:40%");
    formAddProduct.appendChild(inputProductDescp);

    addSpace(formAddProduct, 2);

    var labelProductPrice = document.createElement("label");
    labelProductPrice.innerHTML = "Vacancies";
    formAddProduct.appendChild(labelProductPrice);

    addSpace(formAddProduct, 2);

    var inputProductPrice = document.createElement("input");
    inputProductPrice.setAttribute("name", "Price");
    inputProductPrice.setAttribute("type", "number");
    inputProductPrice.setAttribute("placeholder", "Enter no. of vacancies");
    inputProductPrice.setAttribute("style", "width:40%");
    formAddProduct.appendChild(inputProductPrice);


    addSpace(formAddProduct, 2);

    var btnSubmit = document.createElement("button");
    btnSubmit.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    btnSubmit.setAttribute("type", "submit");
    btnSubmit.setAttribute("name", "btnSubmit");
    btnSubmit.innerHTML = "Submit";
    formAddProduct.appendChild(btnSubmit);

    //  addSpace(divAddProduct,2);

    var btnCancel = document.createElement("button");
    btnCancel.setAttribute("name", "btnCancel");
    btnCancel.innerHTML = "Cancel";
    btnCancel.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: ##eee;border: none;color: black;text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;");
    formAddProduct.appendChild(btnCancel);
    divAddProduct.appendChild(formAddProduct);

    btnCancel.addEventListener("click", function(event) {
        deleteProductForm();
        unhideAddNewProductLink(aAddNewProduct);
    });
}

function deleteProductForm() {
    var childNodes = divAddProduct.childNodes;
    for (var i = 0; childNodes.length > 0;) {
        divAddProduct.removeChild(childNodes[i]);
    }
}

function unhideAddNewProductLink(target) {
    target.setAttribute("style", "visibility:visible");
}

function addSpace(target, number) {
    for (var i = 0; i < number; i++) {
        var blankLine = document.createElement("br");
        target.appendChild(blankLine);
    }
}

function hideAddNewProductLink(target) {
    target.setAttribute("style", "visibility:hidden");
}

function addToDOM(objectProduct) {
    var divProductAdded = document.createElement("div");
    divProductAdded.setAttribute("id", objectProduct._id);
    divProductAdded.setAttribute("style", "padding-bottom: inherit;");
    var txtProductName = document.createElement("p");
    txtProductName.setAttribute('style', 'font-size: 20;color: black ;margin-bottom:0;')
    txtProductName.innerHTML = index + ".  " + objectProduct.Name;
    index++;

    var txtProductDesc = document.createElement("p");
    txtProductDesc.setAttribute("style", "color: black;padding-left:5%;margin:9;");
    txtProductDesc.innerHTML = "  " + objectProduct.Description;

    var txtProductPrice = document.createElement("p");
    txtProductPrice.setAttribute("style", "color: black ;padding-left:5%;margin : 9 0;")
    txtProductPrice.innerHTML = "Vacancies: " + objectProduct.Price;

    var txtProductQuantity = document.createElement("p");
    txtProductQuantity.setAttribute("style", "color: black ;padding-left:5%;margin : 9 0;")
  //txtProductQuantity.innerHTML = "Quantity: " + objectProduct.Quantity;

    var btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", objectProduct._id);
    btnEdit.innerHTML = "Edit";
    btnEdit.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: rgb(58, 8, 8);text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;")

    var btnDelete = document.createElement("button");
    btnDelete.setAttribute("id", "btnDelete");
    btnDelete.innerHTML = "Delete";
    btnDelete.setAttribute("style", "display: inline-block;border-radius: 4px;background-color: #eee;border: none;color: rgb(58, 8, 8);text-align: center;padding: 5px;height: 25px;width: 100px;transition: all 0.5s;cursor: pointer;margin: 5px;")

    divProductAdded.appendChild(txtProductName);
    divProductAdded.appendChild(txtProductDesc);
    divProductAdded.appendChild(txtProductPrice);
   // divProductAdded.appendChild(txtProductQuantity);
    divProductAdded.appendChild(btnDelete);
    divListProducts.appendChild(divProductAdded);


    btnEdit.addEventListener("click", function(event) {
        xhttp.open('GET', '/getToBeEditedProduct?number=' + btnEdit.id);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            // readyState 4 means the request is done.
            // status 200 is a successful return.
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let product = JSON.parse(xhttp.responseText);
                console.log(product);
                editProduct(product);
            } else {
                // An error occurred during the request.
                console.log(xhttp.status);
            }
        };
    });
    btnDelete.addEventListener("click", function(event) {
        http.open("POST", '/deleteProduct', true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                location.reload();
            }
        }
        http.send('number=' + objectProduct._id);
    });
    unhideAddNewProductLink(aAddNewProduct);
    deleteProductForm();
}

function editProduct(product) {

    hideAddNewProductLink(aAddNewProduct);
    var formEditProduct = document.createElement("div");
    /*  formEditProduct.setAttribute("name","formEditProduct");
    //  formEditProduct.setAttribute("onsubmit","addToObject()");
      formEditProduct.setAttribute("action","/editProduct");
      formEditProduct.setAttribute("method","POST");*/

    var labelAddProduct = document.createElement("label");
    labelAddProduct.innerHTML = "Enter element details";
    formEditProduct.appendChild(labelAddProduct);

    addSpace(formEditProduct, 2);

    var inputProductName = document.createElement("input");
    inputProductName.setAttribute("name", "Name");
    inputProductName.setAttribute("type", "text");
    inputProductName.setAttribute("value", product.Name);
    inputProductName.setAttribute("placeholder", "Enter product name");
    inputProductName.setAttribute("style", "wnameth:40%");
    formEditProduct.appendChild(inputProductName);

    addSpace(formEditProduct, 2);

    var labelProductDescp = document.createElement("label");
    labelProductDescp.innerHTML = "Product Description";
    formEditProduct.appendChild(labelProductDescp);

    addSpace(formEditProduct, 2);

    var inputProductDescp = document.createElement("textarea");
    inputProductDescp.setAttribute("name", "Descp");
    inputProductDescp.setAttribute("type", "text");
    inputProductDescp.innerHTML = product.Description;
    inputProductDescp.setAttribute("placeholder", "Enter product description");
    inputProductDescp.setAttribute("style", "width:40%");
    formEditProduct.appendChild(inputProductDescp);

    addSpace(formEditProduct, 2);

    var labelProductPrice = document.createElement("label");
    labelProductPrice.innerHTML = "Vacancies";
    formEditProduct.appendChild(labelProductPrice);

    addSpace(formEditProduct, 2);

    var inputProductPrice = document.createElement("input");
    inputProductPrice.setAttribute("name", "Price");
    inputProductPrice.setAttribute("type", "text");
    inputProductPrice.setAttribute("value", product.Price);
    inputProductPrice.setAttribute("placeholder", "Enter no. of Vacancies");
    inputProductPrice.setAttribute("style", "width:40%");
    formEditProduct.appendChild(inputProductPrice);

    addSpace(formEditProduct, 2);

    var labelProductQuantity = document.createElement("label");
    labelProductQuantity.innerHTML = "Enter quantity";
    formEditProduct.appendChild(labelProductQuantity);

    addSpace(formEditProduct, 2);

    var inputProductQuantity = document.createElement("input");
    inputProductQuantity.setAttribute("name", "Quantity");
    inputProductQuantity.setAttribute("type", "text");
    inputProductQuantity.setAttribute("value", product.Quantity);
    inputProductQuantity.setAttribute("style", "width:40%");
    inputProductQuantity.setAttribute("placeholder", "Enter product Quantity");
   // formEditProduct.appendChild(inputProductQuantity);

    addSpace(formEditProduct, 2);

    var btnEdit = document.createElement("button");
    //btnSubmit.setAttribute("type","submit");
    btnEdit.setAttribute("id:", product._id);
    btnEdit.setAttribute("name", "btnEdit");
    btnEdit.setAttribute("style", "width:20%;height:25px");
    btnEdit.innerHTML = "Submit";
    formEditProduct.appendChild(btnEdit);

    //  addSpace(divAddProduct,2);

    var btnCancel = document.createElement("button");
    btnCancel.setAttribute("name", "btnCancel");
    btnCancel.setAttribute("style", "width:20%;height:25px");
    btnCancel.innerHTML = "Cancel";
    formEditProduct.appendChild(btnCancel);
    divAddProduct.appendChild(formEditProduct);

    btnEdit.addEventListener("click", function(event) {
        var num = product._id;
        var name = inputProductName.value;
        var descp = inputProductDescp.value;
        var price = inputProductPrice.value;
        var quan = inputProductQuantity.value;
        ahttp.open("POST", '/editProduct', true);
        ahttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ahttp.send('number=' + num + '&name=' + name + '&descp=' + descp + '&price=' + price + '&quantity=' + quan);
        ahttp.onreadystatechange = function() {
            if (ahttp.readyState == 4 && ahttp.status == 200) {
                //console.log(ahttp.responseText);

            }
        }
        location.reload(true);
    });

    btnCancel.addEventListener("click", function(event) {
        deleteProductForm();
        unhideAddNewProductLink(aAddNewProduct);
    });
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
            console.log(xhr.status);
        }
    }

}

var aAddProduct = document.getElementById("aAddProduct");
if (activeuser != "admin") {
    aAddProduct.style.display = "none";
    aAddProduct.style.visibility = "hidden";
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