var React = require('react');
var LeaderboardView = require('./LeaderboardView');

var App = React.createClass({
    getInitialState: function() {
        return { leaderboard30d: null, leaderboardTotal: null, currentLeaderboard: 'leaderboard30d' };
    },

    componentDidMount: function() {
        var lb30d = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(function(response) {
                return response.json();
            });
        var lbTotal = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
            .then(function(response) {
                return response.json();
            });

        Promise
            .all([lb30d, lbTotal])
            .then(this.onLeaderboardFetched);
    },

    onLeaderboardFetched: function(jsonArray) {
        this.setState({ leaderboard30d: jsonArray[0], leaderboardTotal: jsonArray[1] });
    },

    switchLeaderboard: function(e) {
        var selectedLeaderboard = e.target.value;
        this.setState({ currentLeaderboard: selectedLeaderboard });
    },

    render: function() {
        var currentLeaderboard = this.state[this.state.currentLeaderboard];
        if (currentLeaderboard) {
            return (<div>
                Sort by:
                <button
                    value='leaderboard30d'
                    onClick={this.switchLeaderboard} >Past 30 days points</button>
                <button
                    value='leaderboardTotal'
                    onClick={this.switchLeaderboard} >All time points</button>
                <LeaderboardView currentLeaderboard={currentLeaderboard} />
            </div>);
        }
        return (<div>Loading...</div>);
    }
});

module.exports = App;
