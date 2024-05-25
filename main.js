const spendingInput = document.querySelector("#input-spending")
const priceInput = document.querySelector("#input-price")
const formBtn = document.querySelector(".btn")
const list = document.querySelector(".list")
const totalInfo = document.querySelector("#total-info")
const statusCheck = document.querySelector("#input-status")
const filterSelect = document.querySelector("#filter-select")

formBtn.addEventListener("click", addExpence)
list.addEventListener("click", handleClick)
filterSelect.addEventListener("change", handleFilter)

let total = 0 

function updateTotal(price){
    total += Number(price)
    totalInfo.textContent = total
}

function handleClick(e){
    const wrapper = e.target.parentElement.parentElement
    if (e.target.id === "remove"){
        wrapper.remove()
        const delPrice = wrapper.querySelector("#value").innerText
        updateTotal(-delPrice)
    }
}

function addExpence(e) {
    e.preventDefault()

    if (!spendingInput.value || !priceInput.value){
        alert("Boş alan olmaz!");
        return
    }
    const spendingDiv = document.createElement("div")

    spendingDiv.classList.add("spending")

    if (statusCheck.checked){
        spendingDiv.classList.add("payed")
    }

    spendingDiv.innerHTML = `
    <h3>${ spendingInput.value }</h3>
    <h3 id='value'>${ priceInput.value }</h3>
    <div class="buttons">
        <img src="images/payment.png" >
        <img id="remove" src="images/del.png" >
    </div>
    `
    list.appendChild(spendingDiv)

    updateTotal(priceInput.value)
    spendingInput.value = ""
    priceInput.value = ""
    
}

function handleFilter(e){
    console.log(e.target.value);

    const items = list.childNodes;
    items.forEach((item) => {
        switch(e.target.value){
            case "all":
                item.style.display = "flex";
                break;
            case "payed":
                if(!item.classList.contains("payed")){
                    item.style.display = "none";
                }else{
                    item.style.display = "flex";}
                break;
            case "not-payed":
                if(item.classList.contains("payed")){
                    item.style.display = "none";                
                }else{
                    item.style.display = "flex";}
                break;
      
        }
    })
}
