var React = require('react');
var LeaderboardGetter = require('./LeaderboardGetter');

var App = React.createClass({
    render: function() {
        return (
            <div className='container'>
                Sort by:
                <button value='30d'>Past 30 days points</button>
                <button value='total'>All time points</button>
                <LeaderboardGetter />
            </div>
        );
    }
});

module.exports = App;