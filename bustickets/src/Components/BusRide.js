import React from 'react'
import { BusRides } from '../RidesMaker'
import Greyhound from './../Imgs/greyhound.jpg'
import Luxbus from './../Imgs/luxbus.png'
import Bluebird from './../Imgs/bluebird.jpeg'





class BusRide extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            takenSeats: this.props.takenSeats,
            styleEmpty: {
                backgroundColor: "transparent",
            },
            styleFull: {
                backgroundColor: "grey"
            }
        }

        this.bookSeat = this.bookSeat.bind(this)

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.takenSeats) {
            this.setState({ takenSeats: nextProps.takenSeats });
        }
    }

    componentWillMount() {
        this.bookSeat()
    }

    bookSeat = () => {
        let idx = BusRides.findIndex(i => i.num === this.props.num);
        if (this.state.takenSeats == 30) {
            this.setState({ full: true, style: "grey" }, () => {})
        }
        else {
            let prevSeats = this.state.takenSeats
            prevSeats += 1
            BusRides[idx].takenSeats += 1;
            this.setState({ takenSeats: prevSeats })
            window.localStorage.setItem("BusRides", JSON.stringify(BusRides))
        }
    }

    render() {
        return (
            <tr style={this.state.takenSeats == 30 ? this.state.styleFull : this.state.styleEmpty}>
                <td>{this.props.DepartureTime}<br /> {this.props.Departure}</td>
                <td>{this.props.Duration}</td>
                <td>{this.props.ArrivalTime} <br />{this.props.ArriveTo}</td>
                <td>
                    <figure>
                        {this.props.Operator.logo == "Greyhound" ? <img src={Greyhound}/> : this.props.Operator.logo == "Bluebird" ? <img src={Bluebird}/> : <img src={Luxbus}/>}
                        <figcaption>{this.props.Operator.rating}</figcaption>
                    </figure>
                </td>
                <td>{this.props.busId}<br /><span className="features"> {this.props.Features}</span> </td>
                <td className="price">${this.props.Price}</td>
                <td>
                    <button className={this.state.takenSeats == 30 ? "disabled" : "bookBtn"} disabled={this.state.takenSeats == 30 ? true : false} onClick={this.bookSeat}>Book</button>
                </td>
            </tr>
        )
    }
}

export default BusRide