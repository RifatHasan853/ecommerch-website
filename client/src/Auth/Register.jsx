import { useContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
//import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
//import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";


const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    
    const navigate = useNavigate();
    

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })
    };
    return (
        <>
        <Helmet>
            <title>Bistro Boss | Sign Up</title>
        </Helmet>
        <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Create an Account
        </h2>
        <div className="flex justify-center items-center"  >
            <p ><SocialLogin></SocialLogin></p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div  className="mb-4 relative"> <input
       type="text"  {...register("name", { required: true })}
        name="name"
        placeholder="Name"
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
        />
        {errors.name && <span className="text-red-600">Name is required</span>}
      </div>
          {/* Email Input */}
          <div  className="mb-4 relative">
      <input
      type="email"  {...register("email", { required: true })} name="email" placeholder="email"
      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
      />
       {errors.email && <span className="text-red-600">Email is required</span>}
      </div>

          {/* Password Input */}
          <div className="mb-6 relative">
          <input
         type="password"  {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
        })} placeholder="password"
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
        />
       {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
            
          </div>

          {/* Register Button */}
          <button
            type="submit"
            value="Sign Up"
            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 hover:underline hover:text-green-400 transition duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    
      
     
    </>
    );
};

export default Register;