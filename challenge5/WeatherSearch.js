
class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <form onSubmit={(e) => this.onSearch(e)}>
                <input 
                    type="text" 
                    placeholder="e.g. Seattle, 98115" 
                    ref="query" 
                />
                <button type="submit">Search</button>
            </form>
        );
    }

    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        var url;
        if (isNaN(queryValue.charAt(0))) {
            url = "http://api.openweathermap.org/data/2.5/weather?q=" + queryValue + "&appid=" + API_KEY;
        } else {
            url = "http://api.openweathermap.org/data/2.5/weather?zip=" +  queryValue + "&appid=" + API_KEY;
        }
        
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
        });
    }
}



var app = document.getElementById('app');

ReactDOM.render(<WeatherSearch />, app);
