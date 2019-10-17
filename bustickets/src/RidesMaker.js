
const citiesArr = ["New York, NY", "Memphis, TN", "Toronto, ON", "Miami, FL"];
const timeArr = ["07:30 A.M", "08:00 A.M", "10:30 P.M", "12:30 P.M", "01:00 A.M", "03:00 P.M", "09:15 A.M", "08:00 P.M"]
const durationArr = ["04h 05m", "07h 30m", "02h 10m", "10h 45m", "05h 20m"]
const operatorArr = [{ rating: "★★★★★", logo: "Greyhound" }, { rating: "★★★★", logo: "Bluebird" }, { rating: "★★★", logo:"Luxbus"}]
const featuresArr = [["🚭", "🚻", "WiFi"], ["🚭", "🚻"], ["WiFi"], ["🚻", "WiFi"], ["🚭", "WiFi"]];
const todaysDateObj = SetToday();


export const BusRides = AssigningRides();

function AssigningRides() {
    let assignedRides;

    if(window.localStorage.getItem("BusRides") === null) {
        let startingRidesArray = BuildRidesArray(1000, getRandomDate);
        window.localStorage.setItem("BusRides", JSON.stringify(startingRidesArray));
        assignedRides = startingRidesArray;
    }
    else {
        let ridesFromStorage = window.localStorage.getItem("BusRides")
        let parsedFromStorage = JSON.parse(ridesFromStorage);
        assignedRides = deleteDatesPassed(parsedFromStorage);
        for(let i = 0; i < assignedRides.length; i++){
            if(assignedRides[i].Date.slice(-2)[0]=="0"){
                assignedRides[i].Date = assignedRides[i].Date.slice(0,8) + assignedRides[i].Date.slice(-1);
            }
        }
        window.localStorage.setItem("BusRides", JSON.stringify(assignedRides));
    }    
    return assignedRides
}

function deleteDatesPassed(arr) {
    let newRides = [];
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].Date.slice(-2)[0]=="-"){
            arr[i].Date = arr[i].Date.slice(0,8) + "0" + arr[i].Date.slice(-1);
        }
        if (arr[i].Date < todaysDateObj) {
            let idx = arr.findIndex(r => r.num === arr[i].num);
            arr.splice(idx, 1);
            newRides = BuildRidesArray(1, getDateInMonth)
            newRides[0].num = arr.length + i;
            arr.push(newRides[0]);
            i-=1;
        }
    }
    return arr;
}

function BuildRidesArray(num, dateFunc) {
    let rides = [];

    for (let i = 0; i < num; i++) {
        let rndCity = Math.floor(Math.random() * citiesArr.length);
        let rndCity2 = Math.floor(Math.random() * citiesArr.length);
        let rndPrice = Math.ceil(Math.random() * 100) + 10
        let rndTime = Math.floor(Math.random() * timeArr.length)
        let rndDuration = Math.floor(Math.random() * durationArr.length)
        let rndOperator = Math.floor(Math.random() * operatorArr.length)
        let rndFeatures = Math.floor(Math.random() * featuresArr.length)
        let rndSeatsTakes = Math.ceil(Math.random() * 25)

        let ride = {
            Departure: citiesArr[rndCity],
            ArriveTo: citiesArr[rndCity2],
            Price: rndPrice,
            DepartureTime: timeArr[rndTime],
            Duration: durationArr[rndDuration],
            Operator: operatorArr[rndOperator],
            Features: featuresArr[rndFeatures],
            totalSeats: 30,
            takenSeats: rndSeatsTakes,
            Date: dateFunc(),
            busId: getBusID(),
            num: i,
        }
        if (ride.ArriveTo == ride.Departure) {
            if (rndCity2 == citiesArr.length - 1) {
                ride.ArriveTo = citiesArr[rndCity2 - 1];
            }
            else {
                ride.ArriveTo = citiesArr[rndCity2 + 1];
            }
        }
        rides.push(ride)
    }
    for (let i = 0; i < rides.length; i++) {
        rides[i].ArrivalTime = getArrivalTime(rides[i].DepartureTime, rides[i].Duration)
    }
    return rides;
}

function getRandomDate() {
    let rnd = Math.floor(Math.random() * 28);
    let today = new Date();
    let newDate = new Date();
    newDate.setDate(today.getDate() + rnd);
    let year = newDate.getYear() + 1900;
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        let monthStr = "0" + month.toString();
        month = monthStr;
    }
    let day = newDate.getDate();
  
    return year + "-" + month + '-' + day
}

function getBusID() {
    let busId = "";
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    for (let i = 0; i < 2; i++) {
        let rndLetter = Math.floor(Math.random() * letters.length)
        busId += letters[rndLetter];
    }
    for (let i = 0; i < 7; i++) {
        let rndNum = Math.ceil(Math.random() * 9);
        busId += rndNum.toString();
    }
    return busId;
}

function getDateInMonth() {
    let today = new Date();
    let newDate = new Date();
    newDate.setDate(today.getDate() + 27);
    let year = newDate.getYear() + 1900;
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        let monthStr = "0" + month.toString();
        month = monthStr;
    }
    let day = newDate.getDate();
    return year + "-" + month + '-' + day
}

function getArrivalTime(depart, duration) {
    let hourNum = depart.slice(0, 2)
    let durHourNum = duration.slice(0, 2)
    let minNum = depart.slice(3, -4);
    let durMinNum = duration.slice(4, -1)

    let hourAdded = Number(hourNum) + Number(durHourNum)
    let minAdded = Number(minNum) + Number(durMinNum)

    let nightOrDay = " " + depart.slice(-3)
    let newHour = hourAdded;
    let newMin = minAdded

    if (hourAdded > 12) {
        newHour -= 12;}
        if(hourAdded >= 12){
        if(hourNum < 12){
            if(depart.slice(-3) =="A.M"){
                nightOrDay = " P.M";
            }
            else{
                nightOrDay = " A.M"
            }
        }
    }
    if (minAdded > 59) {
        newHour += 1;
        newMin -= 60;
    }
    if (newMin < 10) {
        return newHour + ":0" + newMin + nightOrDay;
    }
    else {
        return newHour + ":" + newMin + nightOrDay;
    }
}

function SetToday(){
    let today = new Date();
    let newDate = new Date()
    newDate.setDate(today.getDate());
        let year = newDate.getYear() + 1900;
        let month = newDate.getMonth() + 1;
        if (month < 10) {
            let monthStr = "0" + month.toString();
            month = monthStr;
        }
       
        let day = newDate.getDate();
        if(day < 10){
            let dayStr = "0" + day.toString();
            day = dayStr
        }
    
        return year + "-" + month + '-' + day
    }