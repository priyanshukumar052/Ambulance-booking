// Your Firebase config (replace with your own from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyC3R5jzHmeLPT9Po7ju1EiRl4X578BUCZI",
  authDomain: "amblunce-service.firebaseapp.com",
  projectId: "amblunce-service",
  storageBucket: "amblunce-service.firebasestorage.app",
  messagingSenderId: "694612375309",
  appId: "1:694612375309:web:5d9a0382c614a10b112244"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  db.collection("bookings").add({
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    emergency: document.getElementById("emergency").value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Ambulance booked successfully!");
    document.getElementById("bookingForm").reset();
  }).catch((error) => {
    console.error("Error adding booking: ", error);
  });
});
// Display bookings in admin dashboard
const bookingList = document.getElementById("bookingList");
if (bookingList) {
  db.collection("bookings").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    bookingList.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      bookingList.innerHTML += `
        <tr>
          <td>${data.name}</td>
          <td>${data.phone}</td>
          <td>${data.location}</td>
          <td>${data.emergency}</td>
        </tr>
      `;
    });
  });
}
