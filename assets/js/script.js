const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // array of work hours in 24-hour time

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentHour = dayjs().hour(); // gets current hour in 24-hour time

const returnHourClass = (hour) => {
  // function to set class for each hour
  if (hour < currentHour) {
    return "past";
  } else if (hour > currentHour) {
    return "future";
  } else {
    return "present";
  }
};

const getDate = () => {
  const currentWeekDay = dayjs().day(); // gets day of current week
  const currentDay = dayjs().date(); // gets day of current month
  const currentMonth = dayjs().month(); // gets current month

  const nth = function (d) {
    // function to add suffix to day of month
    // https://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return `st`;
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${weekDays[currentWeekDay]}, ${
    months[currentMonth]
  } ${currentDay}${nth(currentDay)}`;
};

const getScheduledEvents = () => {
  // function to get events from local storage

  let getEvents = JSON.parse(localStorage.getItem("events")); // get events from local storage
  if (!getEvents) getEvents = []; // if no events in local storage, set to empty array

  return getEvents; // return array of events
};

const saveScheduledEvents = (event) => {
  // function to save events to local storage

  const events = getScheduledEvents(); // get events from local storage
  const index = events.find((x) => x.id === event.id); // check if event already exists

  if (index) {
    // if event already exists, update it
    events[index] = event;
  } else {
    // if event doesn't exist, add it
    events.push(event);
  }

  localStorage.setItem("events", JSON.stringify(events)); // save events to local storage
  console.log("Event saved to local storage");
};

const saveEvent = (id) => {
  const textAreaContent = $("#" + id)
    .children("textarea")
    .val()
    .trim();

  if (textAreaContent) {
    saveScheduledEvents({ id, description: textAreaContent });
  } else {
    saveScheduledEvents({ id, description: "" });
  }
};

$(document).ready(function () {
  // Run code when the DOM is ready

  // get current day and display in header
  $("#currentDay").text(getDate());

  $(".time-block").each(function (index) {
    // set class for each time block
    $(this).addClass(returnHourClass(workHours[index]));
  });

  // set description for each time block from local storage to textarea
  getScheduledEvents().forEach((event) => {
    $(`#${event.id}`).children("textarea").val(event.description);
  });

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
});
