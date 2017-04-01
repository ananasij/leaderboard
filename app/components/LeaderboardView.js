var React = require('react');

var LeaderboardView = React.createClass({
    buildLeaderboard: function() {
        var rawLeaderboard = this.props.currentLeaderboard;
        var processedLeaderboard = [];
        var rank = 0;
        rawLeaderboard.map(function(line) {
            rank += 1;
            processedLeaderboard.push(
                <tr>
                    <td>{rank}</td>
                    <td><img src={line.img} alt={line.username + "'s userpicture"} className="userimage"/>
                        <a href={'https://www.freecodecamp.com/' + line.username}>{line.username}</a></td>
                    <td>{line.recent}</td>
                    <td>{line.alltime}</td>
                </tr>
            );
            return true;
        });
        return processedLeaderboard;
    },
    render: function() {
        return <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Camper</th>
                    <th>Points for past 30 days</th>
                    <th>Points for all days</th>
                </tr>
                </thead>
                <tbody>
                {this.buildLeaderboard()}
                </tbody>
            </table>
        </div>;
    }
});

module.exports = LeaderboardView;
