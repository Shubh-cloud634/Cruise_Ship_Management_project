import { db } from "../../firebase.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const stationeryList = document.getElementById("stationeryList");

onSnapshot(collection(db, "stationeryOrders"), (snapshot) => {
  stationeryList.innerHTML = "";
  snapshot.forEach(docItem => {
    const data = docItem.data();
    const li = document.createElement("li");
    li.textContent = `${JSON.stringify(data.items)} by Voyager ${data.voyagerId}`;
    stationeryList.appendChild(li);
  });
});
