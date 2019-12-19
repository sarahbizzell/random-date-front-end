import React, { Component } from "react";
import "../css/profilePage.css";
import axios from "axios";
const io = require("socket.io-client");
const socket = io("http://localhost:3002");

const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BACKEND_APP_URL
    : "http://localhost:3001";

class ProfilePage extends Component {
  state = {
    possibleDates: []
  }
  componentDidMount() {
    console.log(localStorage)
    //     console.log(socket)
    //     socket.emit("chat message", "Test chat message!");

    // socket.on("received", data => {
    //   console.log({ data });
    // });

    this.findMatches()
  }
  displayChatroom = (index) => e => {
    e.preventDefault()
    let giveMessages = this.props.user.chatRooms[index].map((messages, i) => {
      return <li key={i + 30} >{messages}</li>
    })
    return <div>
      <div>
        <ul>
          {giveMessages}
        </ul>
      </div>
      <input type="text" name="message" onChange={this.props.handleInput} required />
      <input value='Submit' type='submit' />
    </div>
  }
  findMatches = () => {
    let searchParams = { location: window.localStorage.location }
    if (window.localStorage.genderPreference) {
      let searchParams = { location: window.localStorage.location, genderPreference: window.localStorage.genderPreference }
    }
    axios.get(`${databaseUrl}/api/users/userMatching`, { params: searchParams })
      .then(response => {
        let allUsers = response.data.users.filter((user, index) => {
          return response.data.users[index]._id !== window.localStorage._id
        })
        this.setState({ possibleDates: allUsers })
      })
  }
  render() {
    console.log(this.state.possibleDates)
    // This will display the local dates on the users screen.
    const datesInformation = [
      {
        dateHeader: "Wine and Dine",
        datesUsername: "Lauren035",
        datesMessage: "No smalltalk, I want to have a real converstion, laugh and have a good time with a good person over wine and some great food",
        dateLocation: "Drake's bar and grill"
      }, {
        dateHeader: "Wine and Dine",
        datesUsername: "Lauren035",
        datesMessage: "No smalltalk, I want to have a real converstion, laugh and have a good time with a good person over wine and some great food",
        dateLocation: "Drake's bar and grill"
      }
    ]

    const eachDateDiv = datesInformation.map(eachDate => {
      return (
        <div id="dateDiv">
          <p>this the date type</p>
          <p>{datesInformation.dateHeader}</p>

          <div>
            <p>this will be a carousel of profile pictures</p>
            <p></p>
          </div>
          <div>
            <p>this will be a small message to all users veiwing this date</p>
            <p>{datesInformation.datesMessage}</p>
          </div>
          <div>
            <p>this is where all other date information will be</p>
            <p></p>
          </div>
        </div>
      );
    });

    // This is hard coded messages to our user. This can be deleted once we are getting messages from the database.
    const userMessages = [
      {
        userName: "KimmieC",
        firstName: "Kim",
        lastName: "Chan",
        message: "I want to go on this date.",
        profilePicture: "frontend/random-date-app/src/images/profilePicOne.jpeg"
      },
      {
        userName: "Jennifer02",
        firstName: "Jennifer",
        lastName: "Lawrence",
        message: "Hey, I do movies :)",
        profilePicture: "frontend/random-date-app/src/images/profilePicOne.jpeg"
      }
    ];
    // if (localStorage.user.chatRooms) {
    //     const allChatRooms = localStorage.user.chatRooms.map((room, index) => {
    //         return <div key={index} className="userMessageDiv CHANGE" onClick={this.displayChatroom(index)}>
    //             <img src={matchedUser.profilePicture[0]} className="userMessageImage CHANGE" />
    //             <p>{room[0]}</p>
    //         </div>
    //     })
    // }
    const eachMessageDiv = userMessages.map(eachMessage => {
      return (
        <div id="userMessageDiv">
          <img src={userMessages.profilePicture} id="userMessageImage" alt="" />
          <p>{eachMessage.message}</p>
        </div>
      );
    });
    return (
      <div id="profileWrapper">
        <body id="profileBodyTag">
          {/* This is where all messages and such should go? */}
          <nav id="profileNavagationTag">
            {/* This is where the user clicks to see their profile. */}
            <div id="userProfileDiv">
              <img
                scr="../images/profilePicOne.jpeg"
                id="userProfilePicture"
                alt=""
              />
            </div>
            {eachMessageDiv}
            {/* This is the logout button! */}
            <div id="logoutButton">
              <button onClick={this.props.handleLogOut}>Logout</button>
            </div>
          </nav>
          <main id="profileMainTag">
            {/* <p>All other content will go here.</p> */}
            <div>{eachDateDiv}</div>
          </main>
        </body>
      </div>
    );
  }
}

export default ProfilePage;
