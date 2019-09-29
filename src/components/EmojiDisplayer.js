import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmoji } from '../redux/selectors';
import unicodeMap from 'emoji-unicode-map';

class EmojiDisplayer extends Component {
    render() {
        let emoji = this.props.emoji || "🙈"
        let name = unicodeMap.get(emoji) || "";
        name = name.replace(/_/g,' ');

        return (
            <div className="emoji-displayer">
                {emoji} {name}
            </div>
        )
    }
}

export default connect(state =>({ emoji: getEmoji(state) }))(EmojiDisplayer);
