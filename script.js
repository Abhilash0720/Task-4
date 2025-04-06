const balance = document.getElementById("balance");
const incamt = document.getElementById("inc-amt");
const expamt = document.getElementById("exp-amt");
const input1 = document.getElementById("desc");
const input2 = document.getElementById("amt");
const form = document.getElementById("form");
const ul = document.getElementById("unorderli")
const addtrans = document.getElementById("add-trans");

//DETAILS OF TRANSACTIONs
function loadtransactiondetails(transaction){
 
 const sign = transaction.amount<0?"-":"+";
 const li = document.createElement("li");
 li.classList.add(transaction.amount<0?"exp":"inc");
 li.innerHTML = `${transaction.description}
                <span>${sign} ${Math.abs(transaction.amount)}</span> 
                <button class="btn-edit">EDIT</button> 
                <button class="btn-del" onclick="removetrans(${transaction.id})">DELETE</button>`
 ul.appendChild(li);

}

//TO REMOVE THE TRANSACTIONS
function removetrans(id){
  if(confirm("Are you sure you want to delete??"))
  {
   transactions = transactions.filter((transaction)=>transaction.id != id);
   config();
   updatelocalstorage();
  }
  else{
    return;
  }
  
}

//TO UPDATE A AMOUNTS
function updateamount(){
  const amounts = transactions.map((transaction)=>transaction.amount);
  const total = amounts.reduce((acc,item)=>acc+=item,0).toFixed(2);
  balance.innerHTML = `₹ ${total}`

   const income = amounts.filter((item)=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
   incamt.innerHTML = `₹ ${income}`

   const expense = amounts.filter((item)=>item<0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
   expamt.innerHTML = `₹ ${Math.abs(expense)}`

}

//TO DISPLAY INPUT VALUES
function addinput(e){
    e.preventDefault();
    if(input1.value =="" || input2.value=="")
    {
      alert("PLEASE ENTER DESCRIPTION and AMOUNT")
    }
    else{
      const transaction = {
        id:100,
        description:input1.value,
        amount:+input2.value,
      };
      transactions.push(transaction);
      loadtransactiondetails(transaction);
      input1.value="";
      input2.value="";
      updateamount();
      updatelocalstorage()
    }
     
}

form.addEventListener("submit",addinput)

//TO UPDATE LOCALSTORAGE
const localstoragetrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") != null? localstoragetrans : [];

function updatelocalstorage(){
  localStorage.setItem("trans",JSON.stringify(transactions));
}


function config(){
  ul.innerHTML = ""
   transactions.forEach(loadtransactiondetails)
   updateamount();
}

window.addEventListener("load",function(){
  config();
})
























































































































// const transaction = [
//   {
//     id:0,
//     description:"salary",
//     amount:25000,
//     type:"income"

//   },
//   {
//     id:1,
//     description:"food",
//     amount:250,
//     type:"expense"

//   },
//   {
//     id:2,
//     description:"book",
//     amount:150,
//     type:"expense"

//   },
//   {
//     id:0,
//     description:"insurance",
//     amount:10000,
//     type:"expense"

//   },
  
// ];


// function renderlist(){
//   const ul = document.getElementById("unorderli");
//   ul.innerHTML = "";
//   const status = document.getElementById("status");
//   if(transaction.length == 0)
//   {
//     status.innerText = "No Transactions";
//   }
//   transaction.forEach(({id,description,amount,type})=>{
//     const li = document.createElement("li");
//     li.setAttribute("id","list-type")
//     li.innerHTML =`<div class="description">
//       <h2>${description}</h2>
//       </div>
//       <div class="amount ${type}">
//       <h3>Rs.${amount}</h3>
//       </div>
//        <div >
//        <button class="btn-edit">EDIT</button>
//       </div>
//       <br/>
//       <div >
//        <button class="btn-del" onclick="remove(${id})">DELETE</button>
//       </div>
//     `
//     ul.append(li);
//   })
// }
// renderlist();

// function remove(id)
// {
//   const index = transaction.findIndex((trx)=>trx.id==id);
//   transaction.splice(index,1);
//   renderlist();
// }

// const form = document.getElementById("form")
// form.addEventListener("submit",add)
// const input1 = document.getElementById("desc");
// const input2 = document.getElementById("amt");
// const ul = document.getElementById("unorderul");
// function add(){
//       const desc =  input1.value;
//        const amt = input2.value;
//        ul.textContent = desc && amt;
//   renderlist();
// }