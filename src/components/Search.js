import React from 'react';
import { Input } from 'reactstrap';

export class Search extends React.Component {

    constructor() {
        super();
        this.searchText = React.createRef();
    }

    // https://davidwalsh.name/javascript-debounce-function
    debounce = (func, wait, immediate) => {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    onChange = (evt) => {
        this.props.search(this.searchText.value);
    }

    render() {
        return <Input placeholder="Search for a character .." onChange={this.debounce(this.onChange, 500)} innerRef={input => this.searchText = input} />
    }
}
