import React, { Component } from 'react';
import './App.scss';
import EmojiDisplayer from './components/EmojiDisplayer';
import EmojiButton from './components/EmojiButton';
import { connect } from 'react-redux';
class App extends Component {

    onAppClick = (evt) => {
        if (this.props.showPicker) {
            this.props.hidePicker();
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Emoji Picker</h1>
                <EmojiDisplayer />
                <EmojiButton />
            </div>
        );
    }
}
export default connect()(App);
