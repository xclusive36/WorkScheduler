const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // array of work hours in 24-hour time

const weekDays = [
  // array of week days
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  // array of months
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
    return "past"; // if hour is before current hour, set class to past
  } else if (hour > currentHour) {
    return "future"; // if hour is after current hour, set class to future
  } else {
    return "present"; // if hour is current hour, set class to present
  }
};

const getDate = () => {
  // function to get current date
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
  const index = events.findIndex((x) => x.id === event.id); // check if event already exists
  if (index) {
    // if event already exists, update it
    events[index] = event;
  } else {
    // if event doesn't exist, add it
    events.push(event);
  }

  localStorage.setItem("events", JSON.stringify(events)); // save events to local storage
};

const saveEvent = (id) => {
  // function to run when save button is clicked
  const textAreaContent = $("#" + id) // get text from textarea
    .children("textarea")
    .val()
    .trim();

  saveScheduledEvents({ id, description: textAreaContent }); // save event to local storage

  $("#saved") // display message that event was saved
    .append(
      `<div id="added">Appointment added to LocalStorage <img id="checkmark" src="./assets/images/check.svg" alt="checkmark image" /></div>`
    )
    .fadeIn(1000);

  $("#added") // remove message after 3 seconds
    .delay(3000)
    .fadeOut(1000)
    .queue(function () {
      $(this).remove();
    });
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

  // save event to local storage when save button is clicked
  $(".saveBtn").on("click", function () {
    saveEvent($(this).parent().attr("id"));
  });
});
