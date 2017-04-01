var React = require('react');
var LeaderboardView = require('./LeaderboardView');

var App = React.createClass({
    getInitialState: function() {
        return { leaderboard30d: null, leaderboardTotal: null, currentLeaderboard: 'leaderboard30d' };
    },

    componentDidMount: function() {
        this.fetchBoard('https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'leaderboard30d');
        this.fetchBoard('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', 'leaderboardTotal');
    },

    fetchBoard: function(url, name) {
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(onFetched.bind(this));

        function onFetched(json) {
            var state = {};
            state[name] = json;
            this.setState(state);
        }
    },

    switchLeaderboard: function(e) {
        var selectedLeaderboard = e.target.value;
        this.setState({ currentLeaderboard: selectedLeaderboard });
    },

    render: function() {
        var currentLeaderboard = this.state[this.state.currentLeaderboard];
        var pageContent;
        if (currentLeaderboard) {
            pageContent = <LeaderboardView currentLeaderboard={currentLeaderboard}/>;
        } else {
            pageContent = <div>Loading...</div>;
        }
        return (
            <div>
                <div className="header container-fluid">
                    <img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg"
                         alt="freeCodeCamp logo"
                         className="logo"
                    />
                    Leaderboard
                    <div className="board-switcher">
                        <span className="sort-title">Sort by:</span>
                        <button
                            type="button"
                            value='leaderboard30d'
                            onClick={this.switchLeaderboard}
                            className="btn-sm btn-link board-switch-btn"
                        >Past 30 days points
                        </button>
                        <button
                            type="button"
                            value='leaderboardTotal'
                            onClick={this.switchLeaderboard}
                            className="btn-sm btn-link board-switch-btn"
                        >All time points
                        </button>
                    </div>
                </div>
                <div className="container table-container">
                    {pageContent}
                </div>
            </div>
        );
    }
});

module.exports = App;
