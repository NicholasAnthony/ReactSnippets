import React, { Component, PropTypes } from 'react';

class Component extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    state = {
      course: {title: null}
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Courses</h1>
        );
    }
}

export default Component;
