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

$(document).ready(function () {
  // Run code when the DOM is ready

  $("#currentDay").text(getDate()); // set date for current day element

  $( ".time-block" ).each(function( index ) {
    $(this).addClass(returnHourClass(workHours[index]));
  });

  // get current day and display in header

  // $("#currentDay");

  // $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  // });
});
