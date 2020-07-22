var aAddProduct=document.getElementById("aAddProduct");
var divAddProduct=document.getElementById("divAddProduct");
var divListProducts=document.getElementById("divListProducts");
var productId=getProductID();
var products=getStoredProducts();

function storeProductID(){
  localStorage.productId=JSON.stringify(productId);
}
function getProductID()
{
  if(!localStorage.productId)
  {
    localStorage.productId=JSON.stringify(1);
  }
    return JSON.parse(localStorage.productId);
}
function getStoredProducts()
{
  if(!localStorage.products)
  {
    localStorage.products=JSON.stringify([]);
  }
  return JSON.parse(localStorage.products);
}

aAddProduct.addEventListener("click",function(event)
{
unHideLink(divAddProduct);
     createProductInfo();
});

function hideLink(target)
{
  target.setAttribute("style","visibility:hidden");
}

function unHideLink(target)
{
  target.setAttribute("style","visibility:visible");
}

function addBlankLine(target,number)
{
  for(var i=0;i<number;i++)
  {
    var br=document.createElement("br");
    target.appendChild(br);
  }
}

//****To find index in an array*****
function getProductIndex(id)
{
  for(var i=0;i<products.length;i++)
  {
    if(products[i].id==id)
    return i;
  }
}
//*****Get Product Details**********
function getProductDetails(id)
{
/*  var fullInfo=( "Name : " + products[id].name + "  Desc: " + products[id].desc +
               "   Price : " + products[id].price + "  Quantity: " + products[id].qnty);
               var divFullInfo=document.createElement("div");
               divFullInfo.innerHTML=fullInfo;
               divListProducts.appendChild(divFullInfo);*/
console.log( "Name : " + products[id].name + "  Desc: " + products[id].desc +
                              "   Price : " + products[id].price + "  Quantity: " + products[id].qnty);

}
//*****remove from from array***********
function removeFromProductsArray(selectedProductIndex)
{
  products.splice(selectedProductIndex,1);
  console.log(products);
}

//*******List Label*************
addBlankLine(divListProducts,2);
var listLabel=document.createElement("label");
listLabel.innerHTML="Products You Added";
divListProducts.appendChild(listLabel);


function createProductInfo()
{
  hideLink(aAddProduct);
  var labelAddProduct=document.createElement("label");
  labelAddProduct.innerHTML="Add New Product";
  divAddProduct.appendChild(labelAddProduct);

  addBlankLine(divAddProduct,2);

// *****Product Name*******

  var productName=document.createElement("input");
  productName.setAttribute("type","text");
  productName.setAttribute("id","productName");
  productName.setAttribute("placeholder","Enter Product Name......");
  productName.setAttribute("style","width:40%");

  divAddProduct.appendChild(productName);

    addBlankLine(divAddProduct,2);

  // *****Product Description*******

    var productDesc=document.createElement("textarea");
    //productDesc.setAttribute("type","textarea");
    productDesc.setAttribute("id","productDesc");
    productDesc.setAttribute("placeholder","Enter Description......");
    productDesc.setAttribute("style","width:40%; height:100px");

    divAddProduct.appendChild(productDesc);

  addBlankLine(divAddProduct,2);

  // *****Product Price*******

  var productPrice=document.createElement("input");
  productPrice.setAttribute("type","text");
  productPrice.setAttribute("id","productPrice");
    productPrice.setAttribute("placeholder","Enter Price......");
    productPrice.setAttribute("style","width:40%");

    divAddProduct.appendChild(productPrice);

  addBlankLine(divAddProduct,2);

  // *****Product Quantity*******

  var productQnty=document.createElement("input");
  productQnty.setAttribute("type","text");
  productQnty.setAttribute("id","productQnty");
    productQnty.setAttribute("placeholder","Enter Quantity......");
    productQnty.setAttribute("style","width:40%");

    divAddProduct.appendChild(productQnty);

  addBlankLine(divAddProduct,2);

  //*****Add Button*********
  var btnAdd=document.createElement("button");
  btnAdd.setAttribute("id","btnAdd");
  btnAdd.innerHTML="Add";
  btnAdd.setAttribute("style","width:15%; height:20px");
  divAddProduct.appendChild(btnAdd);


  //*****Cancel Button*********
  var btnCancel=document.createElement("button");
  btnCancel.setAttribute("id","btnCancel");
  btnCancel.innerHTML="Cancel";
  btnCancel.setAttribute("style","width:15%; height:20px");
  divAddProduct.appendChild(btnCancel);



btnAdd.addEventListener("click",function(event)
{

  addProducttoArray();

});

}

//*****Add Button Function********

function addProducttoArray()
{
var objProduct=new Object();
  objProduct.id=productId;
  objProduct.name=document.getElementById("productName").value;
  objProduct.desc=document.getElementById("productDesc").value;
  objProduct.price=document.getElementById("productPrice").value;
  objProduct.qnty=document.getElementById("productQnty").value;

products.push(objProduct);
storeProducts(products);
addProducttoDOM(objProduct);
hideLink(divAddProduct);
productId++;
storeProductID();
}

function storeProducts(products){
  localStorage.products=JSON.stringify(products);
}

function addProducttoDOM(objProduct)
{
var divAddedProduct=document.createElement("div");
divAddedProduct.setAttribute("id",productId);

//*********Product name link*********
var aProductName=document.createElement("a");
aProductName.setAttribute("href","#");
aProductName.innerHTML=objProduct.name;
divAddedProduct.appendChild(aProductName);

//*******Product desc label********
/*var labelDesc=document.createElement("label");
labelDesc.innerHTML=objProduct.desc;
divAddedProduct.appendChild(labelDesc);

addBlankLine(2);*/
//*******edit and delete button********
var linkEdit=document.createElement("a");
var linkDelete=document.createElement("a");
linkEdit.innerHTML="Edit    ";
linkEdit.setAttribute("style","width:15%; height:20px");
linkEdit.setAttribute("href","#");
linkDelete.innerHTML="Delete";
linkDelete.setAttribute("style","width:15%; height:20px");
linkDelete.setAttribute("href","#");




//****event listener********

linkDelete.addEventListener("click",function(event)
{
  var targetParent=event.target.parentNode;
  var selectedProductIndex=getProductIndex(parseInt(targetParent.id));
  removeFromProductsArray(selectedProductIndex);
  targetParent.parentNode.removeChild(targetParent);
  storeProducts(products);
  storeProductID()
});

linkEdit.addEventListener("click",function(event){
  var targetParent=event.target.parentNode;
  var selectedProductIndex=getProductIndex(parseInt(targetParent.id));
  editAddedProduct(selectedProductIndex);

});


aProductName.addEventListener("click",function(event){
  var selectedProductIndex=getProductIndex(parseInt(event.target.parentNode.id));
  getProductDetails(selectedProductIndex);
});

//*****append edit and delete*********
addBlankLine(divAddedProduct,1);
divAddedProduct.appendChild(linkEdit);
divAddedProduct.appendChild(linkDelete);
divListProducts.appendChild(divAddedProduct);
divAddProduct.innerHTML="";
unHideLink(aAddProduct);

}

//****edit function************
function editAddedProduct(id)
{

  var selectedProductIndex=getProductIndex(id);
//  console.log(products);
editProductInfo(products[id]);
  var targetParent=event.target.parentNode;
  var selectedProductIndex=getProductIndex(parseInt(targetParent.id));
  removeFromProductsArray(selectedProductIndex);
  targetParent.parentNode.removeChild(targetParent);
}
//**********************
function editProductInfo(objProduct)
{
  hideLink(aAddProduct);
  unHideLink(divAddProduct);
  var labelAddProduct=document.createElement("label");
  labelAddProduct.innerHTML="Edit Product";
  divAddProduct.appendChild(labelAddProduct);

  addBlankLine(divAddProduct,2);

// *****Product Name*******

  var productName=document.createElement("input");
  productName.setAttribute("type","text");
  productName.setAttribute("id","productName");
  productName.setAttribute("value",objProduct.name);
  productName.setAttribute("style","width:40%");

  divAddProduct.appendChild(productName);

    addBlankLine(divAddProduct,2);

  // *****Product Description*******

  var productDesc=document.createElement("input");
    productDesc.setAttribute("type","textarea");
    productDesc.setAttribute("id","productDesc");
    productDesc.setAttribute("value",objProduct.desc);
    productDesc.setAttribute("style","width:40%; height:100px");

    divAddProduct.appendChild(productDesc);

  addBlankLine(divAddProduct,2);

  // *****Product Price*******

  var productPrice=document.createElement("input");
  productPrice.setAttribute("type","text");
  productPrice.setAttribute("id","productPrice");
    productPrice.setAttribute("value",objProduct.price);
    productPrice.setAttribute("style","width:40%");

    divAddProduct.appendChild(productPrice);

  addBlankLine(divAddProduct,2);

  // *****Product Quantity*******

  var productQnty=document.createElement("input");
  productQnty.setAttribute("type","text");
  productQnty.setAttribute("id","productQnty");
    productQnty.setAttribute("value",objProduct.qty);
    productQnty.setAttribute("style","width:40%");

    divAddProduct.appendChild(productQnty);

  addBlankLine(divAddProduct,2);

  //*****Add Button*********
  var btnUpdate=document.createElement("button");
  btnUpdate.setAttribute("id","btnUpdate");
  btnUpdate.innerHTML="Update";
  btnUpdate.setAttribute("style","width:15%; height:20px");
  divAddProduct.appendChild(btnUpdate);


  //*****Cancel Button*********
  var btnCancel=document.createElement("button");
  btnCancel.setAttribute("id","btnCancel");
  btnCancel.innerHTML="Cancel";
  btnCancel.setAttribute("style","width:15%; height:20px");
  divAddProduct.appendChild(btnCancel);

  btnUpdate.addEventListener("click",function(event){
    addProducttoArray();
  });

}
