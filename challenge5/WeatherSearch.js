class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
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
                {
                    this.state.name ? (
                        <WeatherCurrent
                            name={this.state.name}
                            shortDesc={this.state.shortDesc}
                            longDesc={this.state.longDesc}
                            icon={this.state.icon}
                            temp={this.state.temp}
                            query={this.state.query}
                            onSave={(query) => this.saveLocation(query)}
                        />
                    ) : null
                }
                
                <SavedWeather
                    saved={this.state.saved}
                    onClick={(loc) => this.searchLocation(loc)}
                />
            </div>
        );
    }

    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        this.searchLocation(queryValue);
    }

    searchLocation(queryValue) {
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
                    temp: Math.round(json.main.temp),
                    query: queryValue
                })
            }
        });
    }

    saveLocation(query) {
        var saved = this.state.saved;
        saved.push(query);
        this.setState({
            saved: saved
        });

        var savedJSON = JSON.stringify(saved);
        localStorage.setItem('savedLocations', savedJSON);
    }
}
