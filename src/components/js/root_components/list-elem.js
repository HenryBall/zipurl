// npm imports
import React, { Component } from 'react';

// component imports


// style imports
import '../../css/root_components/list-elem.css'

// require dotenv package for managing env variables
require('dotenv').config();

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      listLength: 0,
      dropDownActive: false,
    };
  }

  componentWillReceiveProps(props) {
    if (this.state.listLength !== this.props.listItems.length) {
      this.setState({selectedIndex: 0});
      this.setState({listLength: this.props.listItems.length});
    }
  }

  handleClick(index, value) {
    this.setState({selectedIndex: index['index']});
    this.props.setSelectedLink(value['value']);
  }

  pluralize(count) {
    if (Number(count) === 1) {
      return 'LINK'
    }
    return 'LINKS'
  }

  cleanUpDate(date) {
    const d =  new Date(date)
    return String(d.getMonth()) + ' / ' + String(d.getDate());
  }

  handleDropdownSelection(selection) {
    this.setState({selectedIndex: 0});
    this.setState({dropDownActive: false});
    this.props.sortBySelection(selection);
  }

	render() {
		return (
      <div className='whole-list'>
        <div id='list-title-container'>
          <div id='list-title' className='light-grey-color'>{this.props.listItems.length} {this.pluralize(this.props.listItems.length)}</div>
          <div className='sort-by' onClick={() => this.setState({dropDownActive: !this.state.dropDownActive})}>
            <div className='sort-by-img'></div>
            <div className='light-grey-color'>SORT BY</div>
          </div>
        </div>
        <div className={this.state.dropDownActive ? 'drop-down-active' : 'hide'}>
          <div className='drop-down-item light-grey-color' onClick={() => this.handleDropdownSelection('date')}>Most recent</div>
          <div className='drop-down-item light-grey-color' onClick={() => this.handleDropdownSelection('clicks')}>Most clicks</div>
        </div>
        <ul>
          {this.props.listItems.map((value, index) => {
            return <li key={index} className={this.state.selectedIndex === index ? 'selected' : ''} onClick={() => this.handleClick({index}, {value})}>
              <div className='cell-content'>
                <div className='light-grey-color date'>{this.cleanUpDate(value.createdAt)}</div>
                <div className='dark-grey-color url'>{value.url}</div>
                <div className='yellow-color shortUrl'>{value.shortUrl}</div>
              </div>
            </li>
          })}
        </ul>
      </div>
		);
	}
}

export default List;