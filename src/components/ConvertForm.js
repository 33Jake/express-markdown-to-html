import React, { Component } from "react";

import Api from "./Api";

export default class ConvertForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: "",
      html: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ markdown: e.target.value });
  }

  handleSubmit(e) {
    let self = this;
    Api.post("/convert", { markdown: this.state.markdown })
      .then(function(response) {
        if (response.data) {
          self.setState({ html: response.data });
        } else {
          alert("Error");
        }
      })
      .catch(function(error) {
        alert("Error");
      });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.markdown}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Markdown to be converted to HTML..."
          />

          <button type="submit">Convert to HTML</button>
        </form>
        {this.state.html && (
          <p>
            Results:
            <br /> {this.state.html}
          </p>
        )}
      </div>
    );
  }
}
