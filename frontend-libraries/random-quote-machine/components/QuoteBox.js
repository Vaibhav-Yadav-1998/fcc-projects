import React, { Component } from "react";

export default class QuoteBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      tweet: "",
      colors: [
        "#E91E63",
        "#FFA726",
        "#03A9F4",
        "#D500F9",
        "#546E7A",
        "#FDD835",
        "#6D4C41",
        "#4CAF50",
        "#c62828",
        "#1E88E5",
        "#ff1744"
      ]
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }

  handleFetch() {
    const url = "https://talaikis.com/api/quotes/random/";
    const twitter = "https://twitter.com/intent/tweet?text=";

    fetch(url)
      .then(
        res => (res.status === 200 ? res.json() : alert("something went wrong"))
      )
      .then(data =>
        this.setState({
          quote: data.quote,
          author: data.author,
          tweet: twitter + data.quote + " by " + data.author
        })
      )
      .catch(err => {
        console.log(err);
        alert("something went wrong");
      });
  }

  handleColor() {
    document.body.style.backgroundColor = this.state.colors[
      Math.round(Math.random(this.state.colors) * 10)
    ];
  }

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    return (
      <div id="quote-box" className="mx-auto mt-5 p-2">
        <p id="text">
          <q> {this.state.quote} </q>
        </p>
        <p id="author"> by {this.state.author} </p>
        <div>
          <button
            className="btn btn-dark"
            id="new-quote"
            onClick={() => {
              this.handleFetch();
              this.handleColor();
            }}
          >
            New Quote
          </button>
          <a
            className="ml-3 align-middle"
            id="tweet-quote"
            target="_blank"
            href={this.state.tweet}
          >
            <i className="fa fa-twitter" />
          </a>
        </div>
      </div>
    );
  }
}
