import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import yes from "./yes.gif";
import no from "./no.gif";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <Link to="/" className="navbar-brand text-white mt-2">
              AskQuestion
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link" href="">
                    Home <span className="sr-only"></span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/about" className="nav-link about">
                    About Me
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/contact" className="nav-link contact">
                    Contact Me
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/api" className="nav-link api">
                    API
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/api">
              <Api />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PeringatanText: "Tolong masukkan sebuah pertanyaan",
      PeringatanStatus: "success",
      answer: "",
      image: ""
    };
  }

  handleChange = event => {
    let question = event.target.value;
    let questionLength = question.length;
    let lastQuestionChar = question.charAt(questionLength - 1);
    if (question.match("[0-9]") != null) {
      this.setState({
        PeringatanStatus: "danger",
        PeringatanText:
          "Maaf tidak boleh ada angka maaf ya . untuk angka silahkan ganti dengan huruf contoh : satu,dua",
        answer: "",
        image: ""
      });
    } else if (question === "") {
      this.setState({
        PeringatanText: "Tolong masukkan sebuah pertanyaan",
        PeringatanStatus: "success",
        answer: "",
        image: ""
      });
    } else if (lastQuestionChar === "?") {
      this.setState({
        PeringatanText: "mengetik...",
        PeringatanStatus: "info",
        answer: "",
        image: ""
      });

      Axios.get("https://yesno.wtf/api").then(response => {
        this.setState({
          PeringatanText: "",
          answer: response.data.answer,
          image: response.data.image
        });
        if (response.data.answer == "yes") {
          this.setState({
            image: yes
          });
        } else if (response.data.answer == "no") {
          this.setState({
            image: no
          });
        } else {
          this.setState({
            image: ""
          });
        }
      });
    } else {
      this.setState({
        PeringatanText:
          "Mohon gunakan tanda tanya (?) diakhir untuk menyelesaikan pertanyaan",
        PeringatanStatus: "danger",
        answer: "",
        image: ""
      });
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="content">
            <div className="alert peringatan mt-3">
              {this.state.PeringatanText.length > 0 ? (
                <div className={"alert alert-" + this.state.PeringatanStatus}>
                  {this.state.PeringatanText}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="field">
              <div className="control">
                <input
                  type="text"
                  placeholder="Ask a question here..."
                  className="question input is-danger is-rounded mt-3"
                  onChange={this.handleChange}
                  name="question"
                />
              </div>
            </div>

            <div className="question"></div>

            <img className="img" src={this.state.image} alt="" />
            <div className="answer">{this.state.answer.toUpperCase()}</div>
          </div>
        </div>
      </div>
    );
  }
}

function About() {
  return (
    <div>
      <div className="container">
        <div className="content">
          <h1 className="mt-3">About Me</h1>
          <p>
            Website askquestion ini saya buat untuk kalian yang ingin mengisi
            waktu kosong dengan teman lewat pertanyaan yang akan hanya
            mendapatkan jawaban yes/no.
          </p>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <div className="container">
        <div className="content">
          <br />
          <p>
            <div className="media">
              <img
                src="https://avatars1.githubusercontent.com/u/61299070?s=460&v=4"
                width="50"
                height="50"
                className="mr-3"
                alt="..."
              />
              <div className="media-body">
                <h5 className="mt-0">Github</h5>
                <a href="https://github.com/wahyuadamhusaeni" target="_blank">
                  Follow on Github
                </a>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

function Api() {
  return (
    <div>
      <div className="container">
        <div className="content">
          <h2 className="mt-3">API</h2>
          <p>HTTP METHOD : GET</p>
          <p>URL : https://yesno.wtf/api</p>
          <code>
            "answer":"yes", "forced":false,
            "image":"https://yesno.wtf/assets/yes/13-c3082a998e7758be8e582276f35d1336.gif"
          </code>
          <br />
          Response dataType = JSON
        </div>
      </div>
    </div>
  );
}
