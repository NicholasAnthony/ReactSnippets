import React, { Component, PropTypes } from 'react';

class Component extends Component {

    static propTypes = {
      email:      PropTypes.string,
      seats:      PropTypes.number,
      callback:   PropTypes.func,
      isClosed:   PropTypes.bool,
      any:        PropTypes.any,
      searchTerm: PropTypes.string
    }

    state = {
      searchTerm: ''
    }

    // This is for the context provider
    static childContextTypes = {
      store: PropTypes.object,
    }

    // This is for the context provider
    getChildContext() {
      return {
        store: this.props.store
      }
    }

    // This is for the context reciever
    contextTypes: {
      color: PropTypes.string
    }

    // Set initial the state on constructor() Before rendering
    constructor(props, context) {
        super(props, context);
    }

    // Don’t use this 
    componentWillMount() {}
    
    // Add DOM event handlers, timers (etc) on componentDidMount()
    // After rendering (DOM available) #
    componentDidMount() {}
    
    // Use setState() here
    componentWillReceiveProps(nextProps) {}
    
    // Skips render() if returns false
    shouldComponentUpdate(nextProps, nextState) {}
    
    // Can’t use setState() here
    componentWillUpdate(nextProps, nextState) {}
    
    // Operate on the DOM here
    componentDidUpdate(prevProps, prevState) {}
    
    // Before DOM removal
    // remove DOM event handlers, timers (etc)
    componentWillUnmount() {}

    // call passed prop method
    doSearch = debounce(() => {
      this.props.doSearch(this.state.searchTerm);
    }, 300)

    // event handler with callback
    handleSearch = (event) => {
      this.setState({ 
        searchTerm: event.target.value 
      }, () => {
        this.doSearch();
      })
    }

    render() {
        return (
          <div>
            <input
              type="search"
              placeholder="Enter search term"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
            />
          </div>
        );
    }
}

export default Component;
