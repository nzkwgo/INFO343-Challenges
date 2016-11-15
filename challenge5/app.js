var API_KEY = '96ad85c1dfc4d37daec37b648891f936';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1>Whether the Weather</h1>
                <WeatherSearch/>
            </div>
        );
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
