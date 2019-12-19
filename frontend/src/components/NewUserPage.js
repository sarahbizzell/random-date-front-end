import React from "react";
import "../css/newUserPage.css";


class NewUserPage extends React.Component {
    handlePPic = (e) => {
        this.setState(prevState => ({
            profilePictures: [...prevState.profilePictures, e.target.value]
        }))
    }
    render() {
        return (
            <div>
                <form id="newUserForm">
                    <span>
                        <input type="text" placeholder="First Name" name="firstName" onChange={this.props.handleInput} required />
                        <p className="requiredIndicator" >*</p>
                    </span>
                    <input type="text" placeholder="Last Name" name="lastName" onChange={this.props.handleInput} />
                    <span>
                        <input type="text" placeholder="Your Gender" name="gender" onChange={this.props.handleInput} required />
                        <p className="requiredIndicator" >*</p>
                    </span>
                    <input type="text" placeholder="Gender Preference" name="genderPreference" onChange={this.props.handleInput} />
                    <p className="formDesc" >Birth Date</p>
                    <span>
                        <input type="date" name="birthDate" onChange={this.props.handleInput} required />
                        <p className="requiredIndicator" >*</p>
                    </span>
                    <p className='formDesc' >Bio</p>
                    <textarea type="text" name="bio" onChange={this.props.handleInput} />
                    <span>
                        <input type="text" placeholder="Location (City)" name="location" onChange={this.props.handleInput} required />
                        <p className="requiredIndicator" >*</p>
                    </span>
                    <input value='Submit' type='submit' onClick={this.props.handleUserUpdate} />
                </form>
            </div>
        )
    }
}

export default NewUserPage