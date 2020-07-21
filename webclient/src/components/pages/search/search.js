import React, { Component } from "react";
import { connect } from "react-redux";
import { search } from "../../../actions/search"

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      images: []
    };
  }

  render() {
    return (
      <div>
        <input
          value={this.state.searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
        />
        <button onClick={() => this.props.search(this.state.searchTerm)}>
          Search
        </button>
      </div>
    );
  }
}

export default connect(null, {
  search
})(Search);
