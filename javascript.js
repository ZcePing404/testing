function navBar1(){
    var bar = document.getElementById("navbar");
    
    if (bar.style.height == '457px'){
        document.getElementById("navbar").style.height = "0";
        document.querySelector("article").style.marginTop = "0";
        document.querySelector(".content").style.marginTop = "0";
        document.querySelector(".btn-primary").style.marginTop = "0";
    }
    else{
        document.getElementById("navbar").style.height = "457px";
        document.querySelector("article").style.marginTop = "440px";
        document.querySelector(".content").style.marginTop = "440px";
        document.querySelector(".btn-primary").style.marginTop = "440px";
    }
}

function navBar2(){
    let bar = document.getElementById("navbar");
    

    if (bar.style.height == '457px'){
        document.getElementById("navbar").style.height = "0";
        document.querySelector("section").style.marginTop = "0";
    }
    else{
        document.getElementById("navbar").style.height = "457px";
        document.querySelector("section").style.marginTop = "470px";
    }
}

function navBar3(){
    let bar = document.getElementById("navbar");
    

    if (bar.style.height == '457px'){
        document.getElementById("navbar").style.height = "0";
        document.querySelector(".contactus").style.marginTop = "1.5cm";
    }
    else{
        document.getElementById("navbar").style.height = "457px";
        document.querySelector(".contactus").style.marginTop = "470px";
    }
}

function navBar4(){
    let bar = document.getElementById("navbar");
    

    if (bar.style.height == '457px'){
        document.getElementById("navbar").style.height = "0";
        document.querySelector("aside").style.marginTop = "0";
    }
    else{
        document.getElementById("navbar").style.height = "457px";
        document.querySelector("aside").style.marginTop = "450px";
    }
}

function navBar5(){
    let bar = document.getElementById("navbar");
    

    if (bar.style.height == '500px'){
        document.getElementById("navbar").style.height = "0";
        document.querySelector("section").style.marginTop = "0";
    }
    else{
        document.getElementById("navbar").style.height = "500px";
        document.querySelector("section").style.marginTop = "510px";
    }
}

function search(){
    document.getElementById('search-form').style.top = "0";
}

function closebtn(){
    document.getElementById('search-form').style.top = "-110%";
} 

function favorite(x){
    let heart = x.closest("#heart-icon");

    if(heart.style.color == ''){
        heart.style.color = 'red';
    }else{
        heart.style.color = '';
    }
}

function formValidity(){
    var emailInput=document.getElementById("email");
    var email=emailInput.value;

    if((email.indexOf('@')&&email.indexOf('.'))===-1){
        alert("Please enter a valid email address");

        emailInput.value="";

        return false;
    }
    
    var confirmed=confirm("Are you sure you want to submit the form?");

    return confirmed;    
}

function show() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function count(){
    let subtotal = 0;
    let tableRow = "";
    let image = document.getElementById("order").getAttribute('src');
    let name = document.getElementById("name").innerHTML;
    let size = parseFloat(document.getElementById("size").value);
    let cup = parseFloat(document.getElementById("numOfCup").value);

    subtotal += size * cup;

    tableRow = "<tr>" +
               "<td>" + "<i class='far fa-times-circle' id='cancel' onclick='cancelButton(this)'></i>" + "</td>" +
               "<td>" + "<img src='" + image + "'></td>" + //important
               "<td>" + name + "</td>" +
               "<td>" + "RM" + size.toFixed(2) +"</td>" +
               "<td>" + cup + "</td>" +
               "<td>" + "RM" + subtotal.toFixed(2) +"</td>" +
               "</tr>";

    // Retrieve existing content from local storage
    let currentTableContent = localStorage.getItem('table-content');
    
    // Append the new data to the existing table content
    currentTableContent += tableRow;

    // Update the table content in local storage
    localStorage.setItem('table-content', currentTableContent);

    let currentSubtotal = parseFloat(localStorage.getItem('subtotal-amount'));
    currentSubtotal += subtotal; 
    localStorage.setItem('subtotal-amount', currentSubtotal);

    newTable();
    newTotal();
}

function newTable(){
    let tableContent = localStorage.getItem('table-content');
    let empty = document.getElementById("emptyCart");

    if(tableContent != ""){
        document.getElementById("tableBody").innerHTML = tableContent;
        empty.style.display = 'none';
    }else{
        empty.style.display = 'block';
    }
}

function newTotal(){
    let total = parseFloat(localStorage.getItem('subtotal-amount'));
    document.getElementById("amount").innerHTML = "RM" + total.toFixed(2);
    document.getElementById("totalAmount").innerHTML = "RM" + total.toFixed(2);
}


function cancelButton(button){
     // Find the parent row of the clicked cancel button and remove it
    let row = button.closest("tr");
    row.remove();

    // Update the table content in local storage after removing the row
    let updatedContent = document.getElementById("tableBody").innerHTML;
    localStorage.setItem('table-content', updatedContent);

    // Extract the subtotal from the last <td>
    let subtotal = parseFloat(row.lastElementChild.innerText.substring(2)); 
    let total = parseFloat(localStorage.getItem("subtotal-amount")); 
    total -= subtotal;
    localStorage.setItem("subtotal-amount", total);

    newTotal(); // Update the displayed total
}

function checkout() {
    let rows = document.getElementById("tableBody").getElementsByTagName("tr");
    let listOut = "";
    let currentPayment = 0;
    let checkbox = confirm("Are you sure to make a payment?");

    if (checkbox) {
        for (let i = 0; i < rows.length; i++) {
            let name = rows[i].children[2].innerHTML;
            let subtotal = parseFloat(rows[i].children[5].innerHTML.substring(2));

            listOut += "<p>" + name + '<span class="price">' + subtotal.toFixed(2) + "</span>" + "</p>";
            currentPayment += subtotal;
        }

        let currentListOut = localStorage.getItem('listout-content');
        currentListOut += listOut;
        localStorage.setItem('listout-content', currentListOut);

        localStorage.setItem('payment', currentPayment);

        window.location.href = ("ass_payment.html")
    }
}


function paymentList(){
    let payment = localStorage.getItem('listout-content');
    let price = parseFloat(localStorage.getItem('payment'));

    document.getElementById("paymentList").innerHTML = payment;
    document.getElementById("totalPayment").innerHTML = price.toFixed(2);
}