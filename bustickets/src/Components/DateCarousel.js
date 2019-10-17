import React from 'react'
import { BusRides } from '../RidesMaker'
import BusTable from './BusTable'
import NoRides from './NoRides'


class DateCarousel extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            lastButton: true,
            nextButton: false,
            weekArrayNum: 0,
            weekArrays: this.props.weekArrays,
            displayedWeek: this.props.week,
            displayedRides: [],
            dateOfRides: "",
            departure: this.props.departure,
            arrival: this.props.arrival,
            chosenDate: this.props.date,
            lowestPrices: [],
            date: this.props.date,
            ride: this.props.ride
        }

        this.displayRidesByDate = this.displayRidesByDate.bind(this)
        this.dateFormat = this.dateFormat.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.week) {
            this.setState({ displayedWeek: nextProps.week });
        }
        if (nextProps.value !== this.props.date) {
            this.setState({ date: nextProps.date });
        }
    }

    componentWillMount() {
        this.displayRidesByDate(this.state.date)
    }

    componentDidMount() {
        this.getLowestPrice()
    }

    getLowestPrice = () => {
        let dayOne = [];
        let day2 = [];
        let day3 = [];
        let day4 = [];
        let day5 = [];
        let day6 = [];
        let day7 = [];
        let weekInDays = []

        for (let i = 0; i < BusRides.length; i++) {
            if (BusRides[i].Departure == this.props.departure && BusRides[i].ArriveTo == this.props.arrival) {
                if (BusRides[i].Date == this.state.displayedWeek[0]) {
                    dayOne.push(BusRides[i]);
                }

                if (BusRides[i].Date == this.state.displayedWeek[1]) {
                    day2.push(BusRides[i]);
                }

                if (BusRides[i].Date == this.state.displayedWeek[2]) {
                    day3.push(BusRides[i]);
                }

                if (BusRides[i].Date == this.state.displayedWeek[3]) {
                    day4.push(BusRides[i]);
                }
                if (BusRides[i].Date == this.state.displayedWeek[4]) {
                    day5.push(BusRides[i]);
                }
                if (BusRides[i].Date == this.state.displayedWeek[5]) {
                    day6.push(BusRides[i]);
                }
                if (BusRides[i].Date == this.state.displayedWeek[6]) {
                    day7.push(BusRides[i]);
                }
            }
        }
        weekInDays.push(dayOne)
        weekInDays.push(day2)
        weekInDays.push(day3)
        weekInDays.push(day4)
        weekInDays.push(day5)
        weekInDays.push(day6)
        weekInDays.push(day7)
        let lowestPrice = []

        for (let i = 0; i < weekInDays.length; i++) {
            weekInDays[i].sort(function (a, b) {
                return a.Price - b.Price
            })

            lowestPrice.push(weekInDays[i][0])
        }

        let prices = []

        for (let i = 0; i < lowestPrice.length; i++) {
            if (lowestPrice[i] != undefined) {
                prices.push(lowestPrice[i].Price)
            }
            else {
                prices.push("0");
            }
        }
        this.setState({ lowestPrices: prices })
    }


    dateFormat = (date, arr) => {
        let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let dateNum = date.split('-');
        let dateStr = new Date(dateNum);
        let dayOfWeek = weekDays[dateStr.getDay()];
        let month = months[dateStr.getMonth()];
        let day = dateStr.getDate();

        let idx = arr.findIndex(i => i === date);
        return <p>{dayOfWeek}, {month} {day} {'\n'} <div className="lowestPrice">${this.state.lowestPrices[idx]}+</div></p>
    }

    displayRidesByDate = (value) => {
        let ridesOnDate = [];
        for (let i = 0; i < BusRides.length; i++) {
            if (BusRides[i].Date == value && BusRides[i].Departure == this.state.departure && BusRides[i].ArriveTo == this.state.arrival) {
                ridesOnDate.push(BusRides[i]);
            }
        }
        this.setState({ displayedRides: ridesOnDate, date: value }, () => {})
    }

    nextWeek = () => {
        let prevNum = this.state.weekArrayNum;
        let nextNum = prevNum += 1;

        if (this.state.weekArrayNum < 2) {
            this.setState({ nextButton: false, lastButton: false, weekArrayNum: nextNum, displayedWeek: this.props.weekArrays[nextNum] }, () => { this.getLowestPrice() })
        }
        else {
            this.setState({ nextButton: true, lastButton: false, weekArrayNum: nextNum, displayedWeek: this.props.weekArrays[nextNum] }, () => { this.getLowestPrice() })
        }

    }

    lastWeek = () => {
        let prevNum = this.state.weekArrayNum;
        let lastNum = prevNum -= 1

        if (this.state.weekArrayNum > 1) {
            this.setState({ lastButton: false, nextButton: false, weekArrayNum: lastNum, displayedWeek: this.props.weekArrays[lastNum] }, () => { this.getLowestPrice() })
        }
        else if (this.state.weekArrayNum <= 1) {
            this.setState({ lastButton: true, weekArrayNum: lastNum, displayedWeek: this.props.weekArrays[lastNum] }, () => { this.getLowestPrice() })
        }

    }

    render() {
        return (
            <div>
                <button className="nxt-btn" disabled={this.state.lastButton} onClick={this.lastWeek}>◄ Last 7</button>
                <br className="mobile-display"/>
                <br className="tablet-display"/>


                {this.state.displayedWeek.map(w =>
                    <button className="dateBtn" value={w} onClick={(event) => this.displayRidesByDate(event.currentTarget.value)}>
                        {this.dateFormat(w, this.state.displayedWeek)}</button>)}
                       
                        <br className="mobile-display"/>
                        <br className="tablet-display"/>


                <button className="nxt-btn" disabled={this.state.nextButton} onClick={this.nextWeek}>Next 7 ►</button>
                {this.state.displayedRides.length > 0 ? <BusTable displayedRides={this.state.displayedRides} /> : <NoRides />}
            </div>

        )
    }
}

export default DateCarousel