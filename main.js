var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var productSearch = document.getElementById("productSearch");
var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert");
var categoryAlert = document.getElementById("categoryAlert");
var descAlert = document.getElementById("descAlert");
var inputs=document.getElementsByClassName("form-input");
var products = [];
var indexUpdate = 0;

if(JSON.parse(localStorage.getItem("productLists"))!=null){
    products = JSON.parse(localStorage.getItem("productLists"));
    displayData();
}
// validation
function productNameValidation(){
    var rejex = /^[A-Z][a-z]{2,8}$/
    if(rejex.test(productName.value)){
        productName.classList.add("is-wright");
        productName.classList.remove("is-wrong");
        nameAlert.classList.add("d-none");
        addBtn.removeAttribute("disabled");
        return true;
        
    } else {
        
        productName.classList.add("is-wrong");
        productName.classList.remove("is-wright");
        nameAlert.classList.remove("d-none");
        addBtn.disabled="true";
        return false;
    }
}

function productPriceValidation(){
    var rejex = /^[1-9][0-9]{1,5}$/
    if(rejex.test(productPrice.value)){
        productPrice.classList.add("is-wright");
        productPrice.classList.remove("is-wrong");
        priceAlert.classList.add("d-none");
        addBtn.removeAttribute("disabled");
        return true;
        
    } else {
        productPrice.classList.add("is-wrong");
        productPrice.classList.remove("is-wright");
        priceAlert.classList.remove("d-none");
        addBtn.disabled="true";
        return false;
    }
}

function productCategoryValidation(){
    var rejex = /^[A-Z][a-z]{2,8}$/
    if(rejex.test(productCategory.value)){
        productCategory.classList.add("is-wright");
        productCategory.classList.remove("is-wrong");
        categoryAlert.classList.add("d-none");
        addBtn.removeAttribute("disabled");
        return true;
        
    } else {
        productCategory.classList.add("is-wrong");
        productCategory.classList.remove("is-wright");
        categoryAlert.classList.remove("d-none");
        addBtn.disabled="true";
        return false;
    }
}
function productDescValidation(){
    var rejex = /^[A-z ]{2,20}$/
    if(rejex.test(productDesc.value)){
        productDesc.classList.add("is-wright");
        productDesc.classList.remove("is-wrong");
        descAlert.classList.add("d-none");
        addBtn.removeAttribute("disabled");
        return true;
        
    } else {
        productDesc.classList.add("is-wrong");
        productDesc.classList.remove("is-wright");
        descAlert.classList.remove("d-none");
        addBtn.disabled="true";
        return false;
    }
}
productName.onkeyup = function(){ productNameValidation()};
productPrice.onkeyup = function(){ productPriceValidation()};
productCategory.onkeyup = function(){productCategoryValidation()};
productDesc.onkeyup = function(){productDescValidation()};


addBtn.onclick =function(){
    if(productNameValidation() & productPriceValidation() &productCategoryValidation() &productDescValidation() ){
        if(addBtn.innerHTML == "Add"){
            addData();
        } else {
            editData(indexUpdate);
        }
        displayData();
        clearForm();
    } else {
        alert("Complete All Form Data");
    }
    
}
function addData (){
    var product = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    }
    products.push(product);
    localStorage.setItem("productLists",JSON.stringify(products));
}
function displayData(){
    var trs ="";
    for (i=0;i<products.length;i++){
        trs+=`<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].desc}</td>
                <td><button onclick="deleteData(${i})" >Delete</button></td>
                <td><button onclick="getUpdateDate(${i})">Update</button></td>
            </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = trs;
}
function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value = "";
    }
}
function deleteData(index){
    products.splice(index,1);
    displayData();
    localStorage.setItem("productLists",JSON.stringify(products));
}

productSearch.onkeyup = function(){
    search(productSearch.value);
}

function search(val){
    var trs ="";
    for (i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(val.toLowerCase())){
            trs+=`<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].desc}</td>
                <td><button onclick="deleteData(${i})" >Delete</button></td>
                <td><button onclick="updateData()">Update</button></td>
            </tr>
        `
        }
        
    }
    
    document.getElementById("tableBody").innerHTML = trs;
}

function getUpdateDate(index){
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDesc.value = products[index].desc;
    addBtn.innerHTML = "Update Data";
    indexUpdate = index;
}
function editData(index){
    products[index] = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    }
    localStorage.setItem("productLists",JSON.stringify(products));
    addBtn.innerHTML= "Add";
}