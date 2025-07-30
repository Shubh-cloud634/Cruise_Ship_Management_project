import { auth, db } from "../../firebase.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const bookingList = document.getElementById("bookingList");

const collections = ["resortBookings", "fitnessBookings", "partyBookings"];

collections.forEach(col => {
  onSnapshot(collection(db, col), (snapshot) => {
    snapshot.forEach(docItem => {
      const data = docItem.data();
      const li = document.createElement("li");
      li.textContent = `[${col}] - ${JSON.stringify(data)}`;
      bookingList.appendChild(li);
    });
  });
});
