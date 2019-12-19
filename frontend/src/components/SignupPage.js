import React from "react";
import "../css/signupPage.css";

class SignupPage extends React.Component {
    render() {
        return (
            <div id="signupPageWrapper">

                <body>
                    <header>

                    </header>
                    <main>

                        <aside>
                            <form id="signup_form">
                                <input type="text" placeholder="E-mail" name="email" onChange={this.props.handleInput} required />
                                <input type="text" placeholder="Password" name="password" onChange={this.props.handleInput} required />
                                <input type="text" placeholder="Confirm Password" name="checkPass" onChange={this.props.handleInput} required />
                                {this.props.fail}
                                <input value='Signup' type='submit' onClick={this.props.handleSignup} />
                            </form>

                        </aside>

                    </main>
                    <footer>

                    </footer>

                </body>
            </div>


        )
    }

}
export default SignupPage