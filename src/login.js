import {GoogleLogin} from 'react-google-login'

const clientId="745807323850-qa6kn3lkddddotuc2bbmaf7ivm7qmgmo.apps.googleusercontent.com";

function Login() {
    const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileobj);
    }
    const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
    }

    return(
      <div id="signInButton">
        <    GoogleLogin
             clientId={clientId}
             buttonText="Sign In with Google"
             onSuccess={onSuccess}
             onFailure={onFailure}
             cookiePolicy={'single_host_origin'}
             isSignedIn={true}
         />
    </ div>
    )
}
export default Login;
