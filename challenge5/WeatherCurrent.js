class WeatherCurrent extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <img src={this.props.icon} alt="icon"/>
                <p id="temp">{this.props.temp}&deg;</p>
                <p id="shortDesc">{this.props.shortDesc}</p>
                <p id="longDesc">({this.props.longDesc})</p>
            </div>
        );
    }
}