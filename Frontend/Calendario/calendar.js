// Add JavaScript code here

///it tells me whether I click the init or end date
var clicksCounterCalendar = 1;
///DATES
var selectedDate = null;


///CALENDAR
var contentCalendarLeft = document.getElementById("calendar-left");
var contentCalendarRight = document.getElementById("calendar-right");

////INIT FUNCTIONS
////INIT FUNCTIONS
////INIT FUNCTIONS
////INIT FUNCTIONS



function updateSelectedDaysClasses(contendCalendar) {

    //UPDATE THE CLASSES
    let children = contendCalendar.childNodes;

    for (const node of children) {
        var nodeDate = new Date(Number(node.id));
        // console.log(node);
        if (nodeDate.valueOf() == selectedDate.valueOf()) {
            node.classList.add("day-selected");
        }
        else {
            node.classList.remove("day-selected");
        }

    }
}



function populateCalendar(calendar, monthHeader, date) {

    calendar.innerHTML = "";
    var monthNameSelect = monthsNames[date.getMonth() % 12];
    monthHeader.innerText = monthNameSelect + " - " + date.getFullYear();

    //PRINT MONTH
    // console.table([monthNameSelect, date.getMonth()])

    ///DAy of the 1st day of the month
    var firstDayInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var day = firstDayInMonth.toLocaleString('en-us', { weekday: 'long' });

    var dayOffset = daysNames[day];

    for (let i = 0; i < dayOffset; i++) {
        const nodeEmpty = document.createElement("span");
        calendar.appendChild(nodeEmpty);
    }


    ///Max amount of days in a month
    var maxDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= maxDays; i++) {

        const node = document.createElement("p");
        node.id = firstDayInMonth.valueOf();
        node.addEventListener("click", (event) => {
            clicksCounterCalendar = (clicksCounterCalendar + 1) % 2;
            selectedDate = new Date(Number(event.target.id));
            
            var p = document.getElementById("day-selected");
            
            p.innerText =selectedDate; 
            // console.log(selectedDate)

            updateSelectedDaysClasses(contentCalendarLeft);
            updateSelectedDaysClasses(contentCalendarRight);


        })
        const textNode = document.createTextNode(i);
        node.appendChild(textNode);
        calendar.appendChild(node);
        firstDayInMonth.setDate(firstDayInMonth.getDate() + 1);
    }


}









////INIT CODE
////INIT CODE
////INIT CODE
////INIT CODE

/////FUCK AJJAJJAJAJAJAJAJAJAJJA IT WAS BUGGY BECAUSE I FORGOT OCTOBER EXISTED!!!!! XDD
const monthsNames = ["January",
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
    "December"];

const daysNames = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
}





//CALENDAR HEADERS
var monthHeaderLeft = document.getElementById("month-left-name");
var monthHeaderRight = document.getElementById("month-right-name");

///DATES
var dateInit = new Date();
var dateEnd = new Date(dateInit.getFullYear(), dateInit.getMonth() + 1, 1);


////UPDATE MONTHS
function nextMonth() {

    dateInit.setMonth(dateInit.getMonth() + 1);
    dateEnd.setMonth(dateEnd.getMonth() + 1);
    //update the calendars
    populateCalendar(contentCalendarLeft, monthHeaderLeft, dateInit);
    populateCalendar(contentCalendarRight, monthHeaderRight, dateEnd);
}
function lastMonth() {

    dateInit.setMonth(dateInit.getMonth() + 1);
    dateEnd.setMonth(dateEnd.getMonth() + 1);
    //update the calendars
    populateCalendar(contentCalendarLeft, monthHeaderLeft, dateInit);
    populateCalendar(contentCalendarRight, monthHeaderRight, dateEnd);
}



///BUTTONS
var bntLastMonth = document.getElementById("btnLastMonth");
var bntNextMonth = document.getElementById("btnNextMonth");

///BUTTONS EVENTS
bntLastMonth.addEventListener("click", (event) => {
    lastMonth();
    
    const idPelicula = btnLastMonth.dataset.idPelicula;
    console.log(idPelicula);

}  );


bntNextMonth.addEventListener("click", () =>  nextMonth() );


document.addEventListener("keydown", (event) => {
    // console.log(event.key);
    if (event.key == "ArrowRight")
        nextMonth();
    if (event.key == "ArrowLeft")
        lastMonth();
})






////POPULATE CALENDARS FOR THE FIRST TIME
populateCalendar(contentCalendarLeft, monthHeaderLeft, dateInit);
populateCalendar(contentCalendarRight, monthHeaderRight, dateEnd);







//// TODAY
var todayP = document.getElementById("today");
todayP.addEventListener("click", () =>{
    //Reinicio fechas
    dateInit = new Date();
    dateEnd = new Date(dateInit.getFullYear(), dateInit.getMonth() + 1, 1);

    //Actualizo calendarios
    populateCalendar(contentCalendarLeft, monthHeaderLeft, dateInit);
    populateCalendar(contentCalendarRight, monthHeaderRight, dateEnd);



})

