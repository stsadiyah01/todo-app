const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Menyimpan data
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    } else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateProgress();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateProgress();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateProgress();
    }
},false);

// Daftar task
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
updateProgress();

// update progress
function updateProgress(){
    const task = document.querySelectorAll("#list-container li");
    const completed = document.querySelectorAll("#list-container li.checked");

    const total = task.length;
    const done = completed.length;

    const percent = total === 0 ? 0 : Math.round((done/total) * 100);

    document.getElementById("progress-text").innerText = `${percent}% completed (${done} of ${total} tasks)`;
}

