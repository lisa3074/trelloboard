const endpoint = "https://frontend-22d4.restdb.io/rest/trelloboard";
const apiKey = "5e9581a6436377171a0c234f";
let data;
let count = 0;

export function changeDbDelegation() {
  //fetch data
  get();
  //For hver gang man klikker på knappen opretter vi nedenstående objekt
  document.querySelector(".add").addEventListener("click", function () {
    count++;
    const dataObject = {
      name: "Yes" + count,
      description: "En prøvesang",
      time_estimate: "1",
      category: ["CSS"],
      duedate: "04-25-2020 12:30",
      image: "lisa.jpg",
    };
    //og sender objektet videre til post(), som tilføjer objektet til db
    post(dataObject);
  });
}

//
/////////////////// MODEL FUNCTIONS /////////////////////
//

async function get() {
  console.log("get");
  document.querySelector(".append").innerHTML = "";
  let response = await fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  data = await response.json();
  //Ved at sætte ."name" (input name) efter elements (document.queryselector("form").elements)
  //kan man tage fat i et bestemt input (input name skal være unik)
  //Kør displaydata() for hver data entry i db
  data.forEach(displayData);
}

export async function post(payload) {
  console.log("post");
  //if you call the dislpay function here, then it adds the properties to the DOM before adding to the db
  //displayData(dataObject);
  //Lvaer objektet til tekst/string, så det kan læses
  const postData = JSON.stringify(payload);
  let response = await fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
  data = await response.json();
  console.log(data);
  //if you call the dislpay function here, then it adds the properties to the db before adding to the DOM (Safer)
  //go directly to displayfunction, since only one is updated a time, there's no need for looping forEach
  //Vis det opdaterede data (her kun den ene der er blevet tilføjet)
  displayData(data);
}

async function put(id) {
  console.log("put");
  count++;
  //Det objekt der skal sættes ind i stedet (redigering)
  const dataObject = {
    name: "No" + "2" + count,
    description: "En prøvesang " + count,
    time_estimate: "1",
    category: ["CSS"],
    duedate: "04-25-2020 12:30",
    image: "lisa.jpg",
  };
  //if you call the dislpay function here, then it adds the properties to the DOM before adding to the db
  //displayData(dataObject);
  const postData = JSON.stringify(dataObject);
  //Sikrer det er det rigtige id der redigeres
  let response = await fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
  //objektet ændres i db
  data = await response.json();
  console.log(data);
  //Elementet i DOM'en ændres i displayEdit
  displyEdit(data, id);
  //if you call the dislpay function here, then it adds the properties to the db before adding to the DOM (Safer)
  //go directly to displayfunction, since only one is updated a time, there's no need for looping forEach
}

async function deleteIt(id) {
  console.log("post");
  //elementet med det pågældende id (der er sendt med videre fra klik) slettes med det samme i DOM'en
  document.querySelector(`article[data-id="${id}"]`).remove();
  let response = await fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  //Herefter slettes elementet i db
  data = await response.json();
  console.log(data);
}

//
/////////////////// DISPLAY FUNCTIONS /////////////////////
//

function displayData(entry) {
  console.log("displayData");
  const template = document.querySelector("template");
  const clone = template.cloneNode(true).content;
  //sørger for at klonen har det samme id som i db, på denne måde kan vi slette klonen fra DOM'en med det samme der trykkes slet.
  clone.querySelector("article").dataset.id = entry._id;
  clone.querySelector(".name span").textContent = entry.name;
  clone.querySelector(".time_estimate span").textContent = entry.time_estimate;
  clone.querySelector(".description span").textContent = entry.description;
  clone.querySelector(".duedate span").textContent = entry.duedate;
  clone.querySelector(".image").src = entry.image;
  clone.querySelector(".image").alt = entry.name;
  const ul = clone.querySelector("ul");
  //smider hver kategori in i en li
  entry.category.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  //For klik på delete knap -> gå til deleteIt og send id'et med, så det er den samme klon der slettes, som der klikkes på.
  clone.querySelector(".del").addEventListener("click", function () {
    deleteIt(entry._id);
  });
  //For klik på edit knap -> gå til edit og send id'et med, så det er den samme klon der redigeres, som der klikkes på.
  clone.querySelector(".edit").addEventListener("click", function () {
    put(entry._id);
  });
  document.querySelector(".append").appendChild(clone);
}

function displyEdit(data, id) {
  //sikrer det er det rigtige element der redigeres i (id)
  const clone = document.querySelector(`article[data-id="${id}"]`);
  const ul = clone.querySelector("ul");
  ul.innerHTML = "";
  clone.querySelector(".name span").textContent = data.name;
  clone.querySelector(".time_estimate span").textContent = data.time_estimate;
  clone.querySelector(".description span").textContent = data.description;
  clone.querySelector(".duedate span").textContent = entry.duedate;
  clone.querySelector(".image").src = entry.image;
  clone.querySelector(".image").alt = entry.name;
  data.category.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}
