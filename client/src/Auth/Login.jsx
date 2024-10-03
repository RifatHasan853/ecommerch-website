import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router";
//import { Link } from "react-router-dom";


import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
      //const [disabled, setDisabled] = useState(true);
      const { signIn } = useContext(AuthContext);
      const navigate = useNavigate();
      const location = useLocation();
      
  
      const from = location.state?.from?.pathname || "/";
      console.log('state in the location login page', location.state)
  
     // useEffect(() => {
          //loadCaptchaEnginge(6);
      //}, [])
  
      const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
    
        // Call the signIn function from context (this should return user data with a token)
        signIn(email, password)
            .then((result) => {
                const user = result.user;
    
                // Fetch the JWT token from the server or Firebase and store it in localStorage
                axios.post('https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app/jwt', { email: user.email }) // Use the same route as in your backend to get the token
                    .then((res) => {
                        const token = res.data.token;
                        // Store the token securely
                        localStorage.setItem('access-token', token);
    
                        // Successful login message
                        Swal.fire({
                            title: 'User Login Successful.',
                            showClass: { popup: 'animate__animated animate__fadeInDown' },
                            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                        });
    
                        // Redirect to the intended page after login
                        navigate(from, { replace: true });
                    })
                    .catch((err) => {
                        console.error('Error fetching token', err);
                    });
            })
            .catch((error) => {
                console.error('Login Error', error);
            });
    };
    
    return (
        <>
        <Helmet>
            <title>Ecommerch | Login</title>
        </Helmet>
        <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Welcome Back
        </h2>
        <div className="flex justify-center items-center"  >
            <p ><SocialLogin></SocialLogin></p>
        </div>
        
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4 relative">
            <input
            type="email" 
            name="email"
             placeholder="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <input
             type="password" 
             name="password"
              placeholder="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Registration Link */}
        <p className="mt-4 text-gray-400 text-center">
          New here?{" "}
         <Link      className="text-blue-500 hover:underline hover:text-blue-400 transition duration-300"

          to="/register"
          >
          
            Register
            </Link>
        </p>
      </div>
    </div>
      
     
   


    
  </>
   

    );
};

export default Login;