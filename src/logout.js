import { GoogleLogout } from 'react-google-login';

const clientId = "745807323850-qa6kn3lkddddotuc2bbmaf7ivm7qmgmo.apps.googleusercontent.com";


function Logout() {
    const onSuccess = () => {
        console.log("Log out successfull!");
    }
    return (
        <div id="signOutButton">
            < GoogleLogout
                clientId={clientId}
                buttonText={"Sign Out "}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}
export default Logout;