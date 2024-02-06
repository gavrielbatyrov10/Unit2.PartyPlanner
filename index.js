const COHORT = "2401-fsa-et-web-ft-sf";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const events = document.querySelector("#events");
const addEventForm = document.querySelector("#add__event--form");

addEventForm.addEventListener("submit", addEvent);
events.addEventListener("click", deleteEvent);

async function addEvent(event) {
  event.preventDefault();

  const newEvent = {
    name: addEventForm.querySelector("#name").value,
    date: addEventForm.querySelector("#date").value,
    time: addEventForm.querySelector("#time").value,
    location: addEventForm.querySelector("#location").value,
    description: addEventForm.querySelector("#description").value,
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });

    state.events.push(newEvent);

    render();
  } catch (error) {
    console.error("Failed to add event:", error);
  }
}

function render() {
  events.textContent = "";
  state.events.forEach((event, index) => {
    const eventItem = document.createElement("li");
    eventItem.innerHTML = `
      <h2>${event.name}</h2>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Description:</strong> ${event.description}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
      <hr>
    `;
    events.appendChild(eventItem);
  });
}

function deleteEvent(event) {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.getAttribute("data-index");

    state.events.splice(index, 1);

    render();
  }
}

// Initial render
render();
