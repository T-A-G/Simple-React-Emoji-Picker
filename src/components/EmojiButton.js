import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmojiPicker from './EmojiPicker'

class EmojiButton extends Component {
    render() {
        return (
            <div className="emoji-button">
              <EmojiPicker>
                  <button type="button">
                      CLICK ME
                  </button>
              </EmojiPicker>
            </div>

        )
    }
}

export default connect()(EmojiButton);
