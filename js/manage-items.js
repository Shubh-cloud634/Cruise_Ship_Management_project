// admin/js/manage-items.js

import { db } from "../../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const form = document.getElementById("addItemForm");
const itemList = document.getElementById("itemList");

// Add new item
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value;

  if (!name || !category) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    await addDoc(collection(db, "menuItems"), {
      name,
      category,
      timestamp: serverTimestamp()
    });
    alert("✅ Item added successfully");
    form.reset();
  } catch (err) {
    console.error("Add item error:", err);
    alert("❌ Failed to add item");
  }
});

// Realtime item fetch
const fetchItems = () => {
  const query = collection(db, "menuItems");

  onSnapshot(query, (snapshot) => {
    itemList.innerHTML = ""; // Clear old items
    snapshot.forEach((docItem) => {
      const data = docItem.data();
      const li = document.createElement("li");
      li.textContent = `${data.name} (${data.category})`;

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = async () => {
        if (confirm(`Delete "${data.name}"?`)) {
          await deleteDoc(doc(db, "menuItems", docItem.id));
          alert("✅ Item deleted");
        }
      };

      li.appendChild(delBtn);
      itemList.appendChild(li);
    });
  });
};

fetchItems();
