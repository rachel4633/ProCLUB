import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/signup.css';

const Signup = () => {
    // Initialize the hooks
    const [username,setUsername]=useState(""); // this are the temporary memory boxes thats why there empty
    // username= name of the hook \|/ setUsername= function
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [number,setNumber] = useState("");
    // console.log(username)

    // Define the three state of application will move to
    const[loading,setLoading]=useState(""); // tells user something is happening
    const[success,setSuccess]=useState("");// tells user its has gone well and is done
    const[error,setError]=useState("");// tells user something went wrong

    // Below is a function to handle the submit action
    const handleSubmit = async(e: React.SyntheticEvent) => {
        // Below we prevent our site from reloading
        e.preventDefault() // this tells the browser not to refresh/blink even after clicking submit

        // Update our loading hook with a message that will be displayed to the users who will try to register
        setLoading("Please wait while we finalize your registration. This will only take a few seconds.")
        try{
            // Create a form data object that will enable you to capture the four detils entered on the form
            const formdata = new FormData(); // this is the suitcase of the data transporting it to the database

            // Insert the four details(username,email,password,phone number) interms of key-value pairs.
            formdata.append("username", username); // this is whatever will be written by the user
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", number);

            // By use of Axois, we can access the method (POST)
            // here we specify to our delivery guy axios.post the servers address
            const response = await axios.post("https://nkiroterakel.alwaysdata.net/api/signup", formdata);

            // Set back the loading to default
            setLoading("");

            //  Just incase everything goes well update the success hook with a message.
            setSuccess(response.data.message)

            // Clear the hooks
            setUsername("");// this empty quote means you have cleare the edit areas so the user details are not still there
            setEmail("");
            setPassword("");
            setNumber("");

            setTimeout(() => {
    setSuccess("");
}, 5000);
        }
        catch(error: any){
            // set the loading book back to default
            setLoading("");

            // Update the error hook with the message given back from the response
            setError(error.message)
        }
    }


return (
    // here we use div tags to group everything into groupd so we can apply the styles bla bla bla
    <div className='signup-container'> 
        <div className="signup-card">
            <h1 className='text-warning'>Join the Pro Club</h1>
            
            {/* this is the communication center  */}
            <h5>{loading}</h5> 
            <h3>{success}</h3>
            <h4>{error}</h4>

            <form onSubmit={handleSubmit}>
                {/* this part tells the comp when the user clicks this run the handle submit functio */}

            <input type="text" 
            placeholder='👤Enter the Username'
            className='form-input' 
            value={username} // this means that screen always shows exactly what inside the username state
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} // this is the listener to hear aytime the user tyoes onse single letter the onchange fire call the function and updates the state
            required /> <br />

            {/* <p className='text-light'>{username} <br /></p> */}

            <input type="email"
            placeholder='✉️Enter the email address'
            className='form-input' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/> <br />

            {/* <p className='text-light'>{email} <br /></p> */}
            
            <input type="password"
            placeholder='🔒Enter the password'
            className='form-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required /> <br />

            {/*<p className='text-light'>{password} <br /></p>*/}

            <input type="number"
            placeholder='📱Enter the mobilephone number'
            className='form-input' 
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required/> <br />

            {/* <p className='text-light'>{number} <br /></p> */}

            <input type="submit" value="Signup" className="add-btn" /> <br /> <br />

            <p className='last'>Already have an account?<Link to={'/signin'} className='link'>Sign In</Link></p>
            {/* this is the shortcut or backdoor it allows the page not to reload but just swap */}
            </form>
        </div>
    </div>
)
}

export default Signup;

