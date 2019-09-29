import React, { Component } from 'react';
import { connect } from 'react-redux';
import TetherComponent from 'react-tether';
import { setEmoji } from '../redux/actions'
import {emojis, categories} from './emojis'
import * as _ from "lodash"
import unicodeMap from 'emoji-unicode-map';

const EmojiGroup = (props) => {

  //greate grouped emojis based and fitler by search term
  const groupEmojis = _.chain(props.emojis)
  .filter(emoji => {

    let emojiName = unicodeMap.get(emoji) || "";
    emojiName = emojiName.replace(/_/g,' ');

    return emojiName.match(props.searchFilter.toLowerCase())

  })
  .map(emoji => {
    return (
      <div
      className='emoji-icon'
      onClick={() => props.onSelect(emoji)}
      key={emoji}
      >
      {emoji}
      </div>
    )
  }).value()

  return (
    <div>
    <h4>{props.groupName}</h4>
    <div className="emoji-group">
    {groupEmojis}
    </div>
    </div>
  )
}


class EmojiPickerSearchBox extends Component {

  constructor(props){
    super(props)
    this.state={
      searchFilter: ''
    }
  }

  generateAllEmojis = () => {

    //create groups of emojis
    return _.chain(emojis).map((groupEmoji, groupName) => {
      return(
        <EmojiGroup
        searchFilter={this.state.searchFilter}
        onSelect={this.props.onSelect}
        key={groupName}
        emojis={groupEmoji}
        groupName={groupName}
        />
      )
    }).value()
  }

  render(){

    const allEmojis = this.generateAllEmojis()

    return (
      <div
      className='emoji-picker-container'
      ref={this.props.tetherRef}
      >
      <input
      className='emoji-searchbar'
      placeholder='Search...'
      type='text'
      onChange={e => {
        this.setState({searchFilter: e.target.value})
      }}
      />
      {allEmojis}
      </div>
    )
  }

}


class EmojiPicker extends Component {

  constructor(props){
    super(props)
    this.state={
      isOpen: false
    }
  }

  selectedEmoji = (emoji) => {
    this.props.setEmoji(emoji)
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;

    return(
        <TetherComponent
        attachment="top center"
        constraints={[
          {
            to: 'scrollParent',
            attachment: 'top',
          },
        ]}

        renderTarget={ref => (
          <div
          ref={ref}
          onClick={() => {
            this.setState({ isOpen: true });
          }}
          >
          {this.props.children}
          </div>
        )}

        renderElement={ref =>
          isOpen && (
            <EmojiPickerSearchBox
            tetherRef={ref}
            onSelect={this.selectedEmoji}/>
          )
        }
        />
    )

  }
}

const mapDispatchToProps = dispatch => ({
  setEmoji: emoji => dispatch(setEmoji(emoji))
})

export default connect(
  null,
  mapDispatchToProps
)(EmojiPicker);
