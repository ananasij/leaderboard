var React = require('react');
var LeaderboardView = require('./LeaderboardView');

var LeaderboardGetter = React.createClass({
    getInitialState: function() {
        return { leaderboard30d: null, leaderboardTotal: null };
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

    render: function() {
        if (this.state.leaderboard30d) {
            return (<div>
                <LeaderboardView currentLeaderboard={this.state.leaderboard30d} />
            </div>);
        }
        return (<div>Loading...</div>);
    }
});

module.exports = LeaderboardGetter;
