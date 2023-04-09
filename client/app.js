let input = document.querySelector(".entered-list");
let addBtn = document.querySelector(".add-list");
let tasks = document.querySelector(".tasks");

input.addEventListener("keyup", () => {
  if (input.value.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
});

addBtn.addEventListener("click", () => {
  if (input.value.trim() != 0) {
    if (loggedIn == true || issue == false) {
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
            <p>${input.value}</p>
                        <div class="item-btn">
                            <!--<i class="fa-solid fa-square-check"></i>-->
                            <i class="fa-solid fa-circle-check"></i>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
            `;
      tasks.appendChild(newItem);
      input.value = "";
    } else {
      alert("Please Log In!!!");
    }
  } else {
    alert("Plese enter a task");
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-xmark")) {
    e.target.parentElement.parentElement.remove();
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-circle-check")) {
    e.target.parentElement.parentElement.classList.toggle("completed");
    //e.target.toggle('fa-square-check');
  }
});

var issue;
var loggedIn;
var msg;
const LoginBtn = document.querySelector(".loginsubmit");
LoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const login = "http://localhost:8080/login";
  const Username_text = document.getElementById("username").value;
  const Password_text = document.getElementById("password").value;
  if (Password_text.length < 8) {
    alert("Password must contain at least 8 characters!");
  } else {
    fetch(login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: Username_text,
        password: Password_text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        issue = data.err;
        loggedIn = data.login;
        msg = data.msg;
      })
      .then(() => {
        if (issue == false || loggedIn == true) {
          alert(msg);
        } else if (issue == true || loggedIn == false) {
          alert(msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
