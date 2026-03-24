async function searchDoctors() {
  const location = document.getElementById("location").value;

  const response = await fetch(`http://localhost:5000/doctors?location=${location}`);
  const doctors = await response.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  doctors.forEach(doc => {
    resultsDiv.innerHTML += `
      <div class="card">
        <h2>${doc.name}</h2>
        <p class="specialization">${doc.specialization}</p>
        <p class="rating">⭐ ${doc.rating}</p>
        <p class="info">Experience: ${doc.experience} years</p>
        <p class="info">Fees: ₹${doc.fees}</p>
        <p class="info">Location: ${doc.location}</p>
        <p class="info">${doc.about}</p>
      </div>
    `;
  });
}