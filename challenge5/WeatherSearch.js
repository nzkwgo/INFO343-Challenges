class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.onSearch(e)}>
                    <input 
                        type="text" 
                        placeholder="e.g. Seattle, 98115" 
                        ref="query" 
                    />
                    <button type="submit">Search</button>
                </form>
                <div id="search-error" className={this.state.error} role="alert">Error: Location Not Found</div>
            </div>
        );
    }

    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        var url;
        if (isNaN(queryValue.charAt(0))) {
            url = "http://api.openweathermap.org/data/2.5/weather?q=" + queryValue + "&units=imperial&appid=" + API_KEY;
        } else {
            url = "http://api.openweathermap.org/data/2.5/weather?zip=" +  queryValue + "&units=imperial&appid=" + API_KEY;
        }
        
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (!json.name) {
                this.setState({
                    error: "error"
                })
            } else {
                this.setState({
                    error: "",
                    name: json.name,
                    shortDesc: json.weather[0].main,
                    longDesc: json.weather[0].description,
                    icon: "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png",
                    temp: Math.round(json.main.temp)
                })
            }
        });
    }
}
