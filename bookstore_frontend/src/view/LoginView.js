import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {login, register} from "../services/userService";
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from "react-toasts";
import {GlobalState} from "../utils/GlobalState";
import {history} from "../utils/history";

const useStyles = {
    loginView: {
        backgroundImage: `linear-gradient(to bottom right, #00000060, #00000060), url(${require('../assets/login/login_background.jpg')})`,
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Verdana, fantasy',
        backgroundSize: '100% 200%, 100% auto',
        fontSize: 'medium',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        boxShadow: '0 0 40px 9px #ffffff'
    },
    title: {
        textAlign: 'center',
        marginTop: '3%',
        textShadow: '0px 0px 15px #fff'
    },
    loginBox: {
        backgroundColor: '#ffffff50',
        borderRadius: '80px',
        boxShadow: '0 0 40px 9px #ffffff',
        position: 'relative',
        width: '450px',
        height: '300px',
        margin: '6% auto',
        textAlign: 'center'
    },
    btnToggleBox: {
        position: 'relative',
        width: '260px',
        margin: 'inherit',
        borderRadius: '30px'
    },
    btnToggleSwitch: {
        top: '0',
        left: '0',
        position: 'absolute',
        width: '130px',
        height: '100%',
        background: 'linear-gradient(to bottom right, #9791ffb8, #ffec3cb8)',
        borderRadius: '30px'
    },
    btnToggle: {
        width: '125px',
        padding: '10px 30px',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        position: 'relative',
        textAlign: 'center',
        horizAlign: 'center',
        verticalAlign: 'middle'
    },

    inputBox: {
        margin: '5px auto',
        top: '50px',
        left: '75px',
        right: '65px',
        position: 'absolute'
    },

    loginText: {
        color: '#ffffff',
        border: '0',
        width: '300px',
        height: '40px',
        background: 'transparent',
        borderBottom: '2px solid #000000',
        marginTop: '12px',
        '&::placeholder': {
            color: 'rgba(27, 126, 191, 0.70)'
        }
    },
    loginCheckBox: {
        fontSize: 'medium',
        position: 'absolute',
        width: '150px',
        left: '70px',
        top: '120px'
    },
    loginSubmit: {
        position: 'absolute',
        width: '150px',
        height: '60px',
        border: 'none',
        borderRadius: '77% 23% 68% 32% / 29% 60% 40% 71%',
        fontSize: 'larger',
        left: '75px',
        top: '160px',
        boxShadow: '0 0 10px 5px #4e555b',
        background: 'transparent',
        '&:hover': {
            animationName: 'submit',
            animationDuration: '2s',
            animationFillMode: 'forwards'
        }
    },
    registerBox: {
        backgroundColor: '#ffffff50',
        borderRadius: '80px',
        boxShadow: '0 0 40px 9px #ffffff',
        position: 'relative',
        width: '450px',
        height: '420px',
        margin: '6% auto',
        textAlign: 'center'
    },
    registerCheckBox: {
        fontSize: 'medium',
        position: 'absolute',
        width: '180px',
        left: '55px',
        top: '240px'
    },
    registerSubmit: {
        position: 'absolute',
        width: '150px',
        height: '60px',
        border: 'none',
        borderRadius: '77% 23% 68% 32% / 29% 60% 40% 71%',
        fontSize: 'larger',
        left: '75px',
        top: '280px',
        boxShadow: '0 0 10px 5px #4e555b',
        background: 'transparent',
        '&:hover': {
            animationName: 'submit',
            animationDuration: '2s',
            animationFillMode: 'forwards'
        }
    }
};

class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: true
        };

        this.login_callback = this.login_callback.bind(this);
        this.register_callback = this.register_callback.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.submit = this.submit.bind(this);
    }

    login_callback(data) {
        console.log(data);
        if (data.status === 404) {
            ToastsStore.error("Wrong Username or Password.");
        } else if (data.status === 400) {
            ToastsStore.error("Your Account is Prohibited.");
        } else {
            GlobalState.set('isAdmin', data.status === 0);
            GlobalState.set('token', data.token);
            history.push('/explore');
        }
    }

    register_callback(data) {
        console.log(data);
        if (data.opt === '0') {
            ToastsStore.error('Username Already Exists.');
        } else {
            this.login_callback(data);
        }
    }

    submit(e) {
        e.preventDefault();
        let valid = true;
        if (this.state.isLogin) {
            let usr = document.getElementById('login-username').value;
            let passwd = document.getElementById('login-password').value;
            if (usr === '') {
                document.getElementById('login-username').style.borderBottom = '2px solid red';
                document.getElementById('login-username').placeholder = 'Please Input Username';
                if (valid) {
                    ToastsStore.error('Username Cannot be Empty.')
                }
                valid = false;
            } else {
                document.getElementById('login-username').style.borderBottom = '2px solid #000000';
                document.getElementById('login-username').placeholder = 'Username';
            }
            if (passwd === '') {
                document.getElementById('login-password').style.borderBottom = '2px solid red';
                document.getElementById('login-password').placeholder = 'Please Input Password';
                if (valid) {
                    ToastsStore.error('Password Cannot be Empty.')
                }
                valid = false;
            } else {
                document.getElementById('login-password').style.borderBottom = '2px solid #000000';
                document.getElementById('login-password').placeholder = 'Password';
            }
            if (valid) {
                login(usr, passwd, this.login_callback);
            }
        } else {
            let usr = document.getElementById('register-username').value;
            let passwd = document.getElementById('register-password').value;
            let passwd_again = document.getElementById('register-password-again').value;
            let agree = document.getElementById('register-check').checked;
            let email = document.getElementById('register-email').value;
            let emailReg = `^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$`;
            if (usr === "") {
                document.getElementById('register-username').style.borderBottom = '2px solid red';
                document.getElementById('register-username').placeholder = 'Please Input Username';
                if (valid) {
                    ToastsStore.error('Username Cannot be Empty.')
                }
                valid = false;
            } else {
                document.getElementById('register-username').style.borderBottom = '2px solid #000000';
                document.getElementById('register-username').placeholder = 'Username';
            }
            if (passwd === "") {
                document.getElementById('register-password').style.borderBottom = '2px solid red';
                document.getElementById('register-password').placeholder = 'Please Input Password';
                if (valid) {
                    ToastsStore.error('Password Cannot be Empty.')
                }
                valid = false;
            } else {
                document.getElementById('register-password').style.borderBottom = '2px solid #000000';
                document.getElementById('register-password').placeholder = 'Password';
            }
            if (email === "" || email.match(emailReg) === null) {
                document.getElementById('register-email').style.borderBottom = '2px solid red';
                if (email === "") {
                    if (valid) {
                        ToastsStore.error('Email Cannot be Empty.')
                    }
                    document.getElementById('register-email').placeholder = 'Please Input Email';
                } else if (valid){
                    ToastsStore.error('Wrong Email Format.');
                }
                valid = false;
            } else {
                document.getElementById('register-email').style.borderBottom = '2px solid #000000';
                document.getElementById('register-email').placeholder = 'Email';
            }
            if (passwd !== passwd_again) {
                document.getElementById('register-password').style.borderBottom = '2px solid red';
                document.getElementById('register-password-again').style.borderBottom = '2px solid red';
                ToastsStore.error('Password do not Match.')
                valid = false;
            } else {
                document.getElementById('register-password').style.borderBottom = '2px solid #000000';
                document.getElementById('register-password').placeholder = 'Password';
                document.getElementById('register-password-again').style.borderBottom = '2px solid #000000';
                document.getElementById('register-password-again').placeholder = 'Password Again';
            }
            if (!agree) {
                document.getElementById('register-check-text').style.color='red';
                if (valid) {
                    ToastsStore.error("Huh, Only Good User's Registration is Accepted :)")
                }
                valid = false;
            } else {
                document.getElementById('register-check-text').style.color='black';
            }
            if (valid) {
                register(usr, passwd, email, this.register_callback);
            }
        }
    }

    toggleLogin() {
        let loginID = document.getElementById("login");
        let registerID = document.getElementById("register");
        let switchID = document.getElementById("switch");
        loginID.style.visibility = "visible";
        registerID.style.visibility = "hidden";
        switchID.style.left = "0px";
        this.setState({
            isLogin: true
        });
    }

    toggleRegister() {
        let loginID = document.getElementById("login");
        let registerID = document.getElementById("register");
        let switchID = document.getElementById("switch");
        loginID.style.visibility = "hidden";
        registerID.style.visibility = "visible";
        switchID.style.left = "130px";
        this.setState({
            isLogin: false
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.loginView}>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} lightBackground />
                <h1 className={classes.title}>Online Bookstore</h1>
                <div className={this.state.isLogin ? classes.loginBox : classes.registerBox}>
                    <div className={classes.btnToggleBox}>
                        <div id="switch" className={classes.btnToggleSwitch}/>
                        <button className={classes.btnToggle} onClick={this.toggleLogin}>Login</button>
                        <button className={classes.btnToggle} onClick={this.toggleRegister}>Register</button>
                    </div>
                    <form id="login" className={classes.inputBox} onSubmit={this.submit}>
                        <div>
                            <label className="sr-only" htmlFor="login-username"/>
                            <input id="login-username" className={classes.loginText} type="text" placeholder="Username"
                                   autoFocus="autofocus"/>
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="login-password"/>
                            <input id="login-password" className={classes.loginText} type="password"
                                   placeholder="Password"/>
                        </div>
                        <div className={classes.loginCheckBox}>
                            <input type="checkbox"/><span>   Have Fun!</span>
                        </div>
                        <button
                            className={classes.loginSubmit}
                            type="submit"
                        >Login
                        </button>
                    </form>
                    <form id="register" className={classes.inputBox} style={{visibility: "hidden"}} onSubmit={this.submit}>
                        <div>
                            <label className="sr-only" htmlFor="register-username"/>
                            <input id="register-username" className={classes.loginText} type="text"
                                   placeholder="Username" autoFocus="autofocus"/>
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="register-password"/>
                            <input id="register-password" className={classes.loginText} type="password"
                                   placeholder="Password"/>
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="register-password-again"/>
                            <input id="register-password-again" className={classes.loginText} type="password"
                                   placeholder="Password Again"/>
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="register-email"/>
                            <input id="register-email" className={classes.loginText} type="text"
                                   placeholder="Email"/>
                        </div>
                        <div className={classes.registerCheckBox}>
                            <input id="register-check" type="checkbox"/>
                            <span id="register-check-text">   I'll be a good user!</span>
                        </div>
                        <button className={classes.registerSubmit} type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(LoginView)