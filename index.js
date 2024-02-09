/**1: -this website will be able to add and delete parties. when you clcik on the event name
 *  it will display the event discription andn change the # in the brouser
 * 2: -make state with parties and  selected party
 * parties start as empty array. we will get the data from the api to change it from an empty arr to an array of objects
 * 3: -when the user clickes the add btn it should add a event and in the event it will
 *  add a delete button, and when the user clickes on the event name it will display the event discription and it will change the #.
 * 4: -no parties will be displayed when the page is loaded so it will display no current parties
 * and when we click the add button we will create a new event with the data that was entered.
 * 5: -on the addBtn we  will add an event listener also on the delete event btn and on the event name
 * 6: -on the initial load of the page it should display a hehader, subheader and a form with a NAME, DATE, TIME, LOCATION, DISCRIPTION, and the ADD EVENT btn...
 *
 *Nouns
- button
- form NAME, DATE, TIME, LOCATION, DESCRIPTION  input

Verb
- listen for the click event
- add a EVENT to the add event btn
- add another click for the event name 
 */

const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2401-FSA-ET-WEB-FT";
const endpoint = "/events";

/**
 * @typedef State
 * @property {events[]} events
 */
// ============ state ===========
/** @type {State} */
const state = {
  events: [], //api events
  localEvents: [],
  selectedEvents: null,
};

//records specificaly which event you click
function setSelectedEvent(event) {
  state.selectedEvents = event;
  location.hash = event.id;
}

//updates the url
function loadEventFromHash() {
  const id = +location.hash.slice(1);
  state.selectedEvents = state.events.find((event) => event.id === id); //pre opens the ul list
}

async function getEvents() {
  try {
    const response = await fetch(BASE_URL + COHORT + endpoint);
    const parsedResponse = await response.json(); //converts json {key:value}
    state.events = parsedResponse.data;
  } catch (err) {
    console.log(err);
  }
}

// ========= RENDER =========

function eventHandler(event) {
  const $li = document.createElement("li"); //<li></li>
  $li.innerHTML = `<h4>${event.name}</h4>`; //<li><h4>dd</h4></li>

  $li.addEventListener("click", (_event) => {
    setSelectedEvent(event);
    loadEventFromHash();
    renderSelectedEvent($li);
  });

  return $li;
}
function localDisplay($li, event) {
  $li.innerHTML = `<h4>${event.name}</h4>`;
  $li.innerHTML += `<h4>${event.date}</h4>`;
  $li.innerHTML += `<h4>${event.location}</h4>`;
}

function localEventsHandler(event) {
  const $li = document.createElement("li");
  localDisplay($li, event);

  $li.addEventListener("click", (_event) => {
    setSelectedEvent(event);
    loadEventFromHash();
    renderSelectedEvent($li, event);
  });

  return $li;
}

function renderEvents() {
  const $ul = document.querySelector("#events"); //<ul></ul>//grabs the html element
  //li maker here
  const $events = state.events.map(eventHandler); //loops through the events from api array returns li
  const $localEvents = state.localEvents.map(localEventsHandler); //loops through events and returns li
  $ul.replaceChildren(...$events, ...$localEvents); // combines them both and puts them in the ul
  //<ul><li></li><li></li><li></li><li></li></ul>
}

function renderSelectedEvent(liEl, event = false) {
  // displays the data to page
  if (event) {
    liEl.innerHTML = `<h4>${event.name}</h4>`;
    liEl.innerHTML += `<h4>${event.description}</h4>`;
  } else {
    liEl.innerHTML = `<h4>${state.selectedEvents.name}</h4>`;
    liEl.innerHTML += `<h4>${state.selectedEvents.description}</h4>`;
  }
}

//  ========= script ==========

async function init() {
  await getEvents(); //get events from api
  renderEvents(); //render the events in the ul
  loadEventFromHash(); //takes the id and puts in the url on top
}

//handles the form submission
function formHandler(event) {
  event.preventDefault();

  //grabs data from form
  state.localEvents.push({
    id: form.name.value,
    name: form.name.value,
    date: form.date.value,
    location: form.location.value,
    description: form.description.value,
  });
  renderEvents(); //render the events in the ul
}
//waiting for form submission
let form = document.querySelector("#add__event--form");
form.addEventListener("submit", formHandler);

let result = document.querySelector("#result");
let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchForm.search.value;

  result.innerHTML = ""; //clear result
  state.events.map((event) => {
    if (event.name.includes(searchForm.search.value)) {
      console.log("i found it", event);
      result.innerHTML = event.name;
      result.innerHTML += event.description;
    }
  });
});

window.addEventListener("load", init); //when html is done loading run init

/*

//function (){}
//variables
let result = 1;
//interger = 1,2,3
//string = "aomdsfds"
//booleon true/false
//anoumouse function 
//()=>{}
//return

function cat(){
  return 5;
}

console.log(cat());

//if else
switch(type){
  case "red": //code;
  case "blue": //code;
  case "yellow": //code
}
//normally when js crashes it stops everything
// but if you anticipate it and use a try catch the js wont crash
try{
  cat()
} catch (err){
  console.log(err)
}

//arrays [1,2,"cat", 3,{}]
//array[0]

//object
let obj = {
  key: "value",
  another: true //number anything
}
//dot notation
obj.key
obj.another

//spread operator ...
let myArray = [1,2,3];
let myArray2 = [];

//oldway
myArray2[myArray[0], myArray[1], myArray[2]]
//spread way copies
myArray2[...myArray]
*/
