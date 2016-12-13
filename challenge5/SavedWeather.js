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
                                <button type="button" onClick={(e) => this.remove(e, loc)}>
                                    Remove
                                </button>
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

    remove(e, loc) {
        e.preventDefault();
        localStorage.removeItem(loc);
        this.props.saved.splice(this.props.saved.indexOf(loc), 1);
        this.setState({
            saved: this.props.saved
        });
    }
}