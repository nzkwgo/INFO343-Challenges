class SavedWeather extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.saved.map((loc) => (
                            <li key={loc}>
                                <a href="#" onClick={(e) => this.onSavedClick(e, loc)}>
                                    {loc}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }

    onSavedClick(e, loc) {
        e.preventDefault();
        this.props.onClick(loc);
    }
}