import React from 'react'
import DateCarousel from './DateCarousel';

const todaysDateObj = new Date();

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cities: ["New York, NY", "Memphis, TN", "Toronto, ON", "Miami, FL"],
            secondArr: [],
            chosenDeparture: " ",
            chosenArrival: " ",
            chosenDate: " ",
            buttonClick: false,
            weekArrays: [],
            arriveButton: true,
        }

        this.chosenArrival = this.chosenArrival.bind(this)
        this.chosenDeparture = this.chosenDeparture.bind(this)
        this.chosenDepartureDate = this.chosenDepartureDate.bind(this)
        this.searchButtonClick = this.searchButtonClick.bind(this)


    }

    getDateString = (date) => {
        let year = date.getYear() + 1900;
        let month = date.getMonth() + 1;
        if (month < 10) {
            let monthStr = "0" + month.toString();
            month = monthStr;
        }
        let day = date.getDate();
        return year + "-" + month + '-' + day
    }

    getDateStringForInput = (date) => {
        let year = date.getYear() + 1900;
        let month = date.getMonth() + 1;
        if (month < 10) {
            let monthStr = "0" + month.toString();
            month = monthStr;
        }
        let day = date.getDate();
        if(day < 10){
            let dayStr = "0" + day.toString();
            day = dayStr
        }
        return year + "-" + month + '-' + day
    }

    getDateInMonth = () => {
        let today = new Date();
        let newDate = new Date();
        newDate.setDate(today.getDate() + 27);
        let year = newDate.getYear() + 1900;
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        if (month < 10) {
            let monthStr = "0" + month.toString();
            month = monthStr;
        }
        if(day < 10){
            let dayStr = "0" + day.toString();
            day = dayStr
        }
        return year + "-" + month + '-' + day
    }

    chosenDeparture = (e) => {
        let remainingCities = ["New York, NY", "Memphis, TN", "Toronto, ON", "Miami, FL"];
        let idx = remainingCities.indexOf(e.target.value);
        remainingCities.splice(idx, 1);

        this.setState({ chosenDeparture: e.target.value, buttonClick:false, arriveButton: false, secondArr: remainingCities, }, () => {})
    }

    chosenArrival = (e) => {
        this.setState({ chosenArrival: e.target.value,buttonClick:false }, () => {})
    }

    chosenDepartureDate = (e) => {
        console.log(e.target.value)
        let val = e.target.value;
     
        if (val[8] == "0") {
            let slicedVal = val.slice(0, 8)
            let endOfVal = val.slice(9, 10);
            this.setState({ chosenDate: slicedVal + endOfVal, buttonClick:false }, () => {})
        }
        else {

            this.setState({ chosenDate: e.target.value, buttonClick:false }, () => {})
        }
    }

    searchButtonClick = () => {
        this.setState({ buttonClick: true }, () => {})
        this.makeWeekArrays();
    }

    makeWeekArrays = () => {
        let weekArr = [];
        let chosenDate = this.state.chosenDate.split('-');
        let dateStr = new Date(chosenDate);
        let weekOne = [this.state.chosenDate];
        let weekTwo = [];
        let weekThree = [];
        let weekFour = [];

        for (let i = 0; i < 27; i++) {
            dateStr.setDate(dateStr.getDate() + 1);
            let nextDay = this.getDateString(dateStr);
            if (i < 6) {
                weekOne.push(nextDay);
            }
            if (i > 5 && i < 13) {
                weekTwo.push(nextDay);
            }
            if (i > 12 && i < 20) {
                weekThree.push(nextDay);
            }
            if (i > 19) {
                weekFour.push(nextDay);
            }
        }

        weekArr.push(weekOne);
        weekArr.push(weekTwo);
        weekArr.push(weekThree);
        weekArr.push(weekFour);

        this.setState({ weekArrays: weekArr }, () => {})
    }

    render() {
        return (
            <div className="form"> 
                <h1 className = "title">Bus Tickets</h1>
                <span>Departure From: </span>
                <select onChange={this.chosenDeparture}>
                    <option>Select City</option>
                    {this.state.cities.map(city => <option value={city}>{city}</option>)}
                </select>
            <br className="mobile-display"/>
                <span> Arrive To: </span>
                <select disabled={this.state.arriveButton} onChange={this.chosenArrival}>
                <option>Select City</option>
                    {this.state.secondArr.map(city => <option value={city}>{city}</option>)}
                </select>
                <br className="mobile-display"/>
                <br className="tablet-display"/>


                <span> Deaprture Date: </span>
                <input onChange={this.chosenDepartureDate} type="date" min={this.getDateStringForInput(todaysDateObj)} max={this.getDateInMonth()} />
                <br className="mobile-display"/>

                <span> Return Date: </span>
                <input type="date" min={this.getDateStringForInput(todaysDateObj)} max={this.getDateInMonth()} />
                    <br />
                <button disabled={this.state.chosenArrival == " " || this.state.chosenDate == " " || this.state.chosenDeparture == " " ? true : false} onClick={this.searchButtonClick} className="searchBtn">Search</button>

                {this.state.buttonClick ? <DateCarousel departure={this.state.chosenDeparture} arrival={this.state.chosenArrival} date={this.state.chosenDate} getDateNumString={this.getDateNumString} weekArrays={this.state.weekArrays} week={this.state.weekArrays[0]}/> : " "}
            </div>
        )
    }
}

export default Form