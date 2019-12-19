import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../css/landingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div id="landingPageWrapper">
        <div>
          <header>
          </header>
          <main>
            <Carousel>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.imgur.com/LQfRjTc.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.imgur.com/APchbcV.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.imgur.com/P45m1jy.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.imgur.com/dPSQYOX.jpg"
                  alt="First slide"
                />

              </Carousel.Item>
            </Carousel>
            <aside>
              <form>
                <input type="email" placeholder="E-mail" name="email" onChange={this.props.handleInput} required />
                <input type="password" placeholder="Password" name="password" onChange={this.props.handleInput} required />
                <button className="buttonCSS1" type='submit' onClick={this.props.handleLogIn} >Log In</button>
                <p id="createAccountLinkPTag" >Don't have an account? <span onClick={this.props.toSignupPage}>create one here.</span></p>
              </form>
            </aside>
            {/* <p>Don't wait to date.</p> */}



          </main>
          <footer>

          </footer>
        </div>
      </div>
    )
  }
}


export default LandingPage