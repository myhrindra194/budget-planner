const inputBudget = document.querySelector(".inputBudget");

const inputLabel = document.querySelector(".inputLabel");
const inputCost = document.querySelector(".inputCost");
const buttonAddList = document.querySelector(".addList");

const expenseValue = document.querySelector(".expenseValue");
const balanceValue = document.querySelector(".balanceValue");

balanceValue.textContent = parseFloat("0");
expenseValue.textContent = parseFloat("0");
document.querySelector(".totalValue").textContent = parseFloat("0");

let count = 0;

function getDate() {
    let date = new Date().toString().split(" ");
    return date[0] + " " + date[1] + " " + date[2];
}

function addExpense(newValue) {
    return +expenseValue.textContent + newValue;
}

function setExpense(newValue) {
    return +expenseValue.textContent - newValue;
}

function setBalance() {
    return +document.querySelector(".totalValue").textContent - +expenseValue.textContent;
}

function reload() {
    inputBudget.value = "";
    inputLabel.value = "";
    inputCost.value = "";
    buttonAddList.style.display = "block";
    document.querySelector(".updateButton").style.display = "none";
}


const addBudget = () => {
    if (inputBudget.value != "") {
        balanceValue.textContent = +inputBudget.value;
        document.querySelector(".totalValue").textContent = inputBudget.value;
    }
    reload();
}

const addList = () => {
    if (inputLabel.value.trim() != "" && inputCost.value != "" && inputCost.value <= +balanceValue.textContent) {
        let parentId = `list-item-${count++}`;
        let labelId = `list-label-${count}`;
        let costId = `list-cost-${count}`;

        let item = `
        <li class="list-group-item" id = "${parentId}">
            <div class="">
                <span class="text-muted">${getDate()}</span>
                <div class="row d-flex justify-content-between align-items-center">
                    <div class="fw-bold col-8 d-flex">
                        <span class="border-start border-primary border-4"></span>
                        <h5 class= "mx-3" id ="${labelId}">${inputLabel.value.trim()}</h5>
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                        <h5 class="text-muted" id = "${costId}">${inputCost.value}</h5>
                        <span class="mx-3"><i class="fas fa-trash buttonDelete" data-parent= "${parentId}" data-cost = "${costId}"></i></span>
                        <span class=""><i class="fas fa-edit buttonEdit" data-parent= "${parentId}" data-cost = "${costId}" data-label ="${labelId}" ></i></span>
                    </div>
                </div>
            </div>
        </li>`;

        document.querySelector(".list-group").innerHTML += item;


        expenseValue.textContent = addExpense(+inputCost.value);
        balanceValue.textContent = setBalance();

        reload();

        deleteList();
        updateList();
    }

}


const deleteList = () => {
    document.querySelectorAll(".buttonDelete").forEach(btn => {
        btn.addEventListener("click", (e) => {
            expenseValue.textContent = setExpense(+document.querySelector("#" + e.currentTarget.dataset.cost).textContent);
            balanceValue.textContent = setBalance();

            document.querySelector("#" + e.currentTarget.dataset.parent).remove();
        })

    })
}

const updateList = () => {
    document.querySelectorAll(".buttonEdit").forEach(btn => {
        btn.addEventListener("click", (e) => {

            buttonAddList.style.display = "none";
            document.querySelector(".updateButton").style.display = "block";

            inputLabel.value = document.querySelector("#" + e.currentTarget.dataset.label).textContent;
            inputCost.value = document.querySelector("#" + e.currentTarget.dataset.cost).textContent;

            validateUpd(inputCost.value);
            cancelUpd();

        })
    })
}

const validateUpd = (costValue) => {
    document.querySelector(".validateUpd").addEventListener("click", (e) => {
        if (inputLabel.value.trim() != "" && inputCost.value != "" && inputCost.value <= +balanceValue.textContent + +costValue) {
            console.log(inputLabel.value, inputCost.value);
        }


        reload();
    })
}

const cancelUpd = () => {
    document.querySelector(".cancelUpd").addEventListener("click", () => {
        reload()
    })
}


document.querySelector(".setBudget").addEventListener("click", () => {
    addBudget();
});


buttonAddList.addEventListener("click", () => {
    addList();
});

window.addEventListener("load", () => {
    reload();
})


