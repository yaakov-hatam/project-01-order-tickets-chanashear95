import React from 'react'
import BusRide from './BusRide'

class BusTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sortedRides: this.props.displayedRides,
        }

        this.sortByPrice = this.sortByPrice.bind(this)
        this.sortByDate = this.sortByDate.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.displayedRides) {
            this.setState({ sortedRides: nextProps.displayedRides });
        }
    }

    sortByPrice = () => {
        let sortedRidesByPrice = this.props.displayedRides.sort(function (a, b) {
            return a.Price - b.Price;
        })
        this.setState({ sortedRides: sortedRidesByPrice }, () => { })
    }

    sortByDate = () => {
        let nightRides = [];
        let dayRides = [];
        this.props.displayedRides.map(r => {
            if (r.DepartureTime.slice(-3) == "P.M") {
                nightRides.push(r)
            }
            else {
                dayRides.push(r)
            }

        })
        this.sortTimes(nightRides)
        this.sortTimes(dayRides)
        let sortedTimes = dayRides.concat(nightRides);
        this.setState({ sortedRides: sortedTimes }, () => { })
    }

    sortTimes = (arr) => {
        arr.map(n => {
            let hour = n.DepartureTime.slice(0, 2)
            if (Number(hour) == 12) {
                hour = "00";
            }
            let minutes = n.DepartureTime.slice(3, 5);
            let numStr = hour + minutes;
            n.numberTime = Number(numStr)
            arr = arr.sort(function (a, b) {
                return a.numberTime - b.numberTime
            })
        })
        return arr
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" onClick={this.sortByDate} className="pointer">Departure ⬇</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Arival</th>
                            <th scope="col">Operator</th>
                            <th scope="col">Bus ID</th>
                            <th scope="col" onClick={this.sortByPrice} className="pointer">Price ⬇</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sortedRides.map(r => <BusRide {...r} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BusTable

