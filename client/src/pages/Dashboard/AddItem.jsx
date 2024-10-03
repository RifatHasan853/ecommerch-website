
import { useForm } from 'react-hook-form';


import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from '../../Hooks/useAxiosPublic';

import SectionTitle from '../../components/SectionTitle';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItem = () => {
    const { register, handleSubmit, } = useForm();
    const axiosPublic = useAxiosPublic();
    
   
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                brand: data.brand,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url
            }
            // 
           
        fetch('https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app/products', {
            
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(menuItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success!',
                        text:  `${data.name} has been added to the products.`,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
            })
        }
        console.log( 'with image url', res.data);
        };
    return (
        <div className="container mx-auto">
        <SectionTitle heading="add a product" subHeading="What's new?" ></SectionTitle>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="ml-60 mx-auto">
                <div  className="flex gap-6 ">
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Product Name*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        {...register('name', { required: true })}
                        required
                        className="input input-bordered w-full border-red-800" />
                </div>
                <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Brand</span>
                        </label>
                        <input
                            type="text"
                            placeholder="brand"
                            {...register('brand', { required: true })}
                            className="input input-bordered w-full border-red-800" />
                    </div>
                    </div>
                <div className="flex gap-6">
                    {/* category */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue="default" {...register('category', { required: true })}
                            className="select select-bordered w-full border-red-800">
                            <option disabled value="default">Select a category</option>
                            <option value='Glasses'>Glasses</option>
                <option value='Sneaker'> Sneaker</option>
                <option value='Watch'>Watch</option>
                <option value='Cloth'>Cloth</option>
                        </select>
                    </div>

                    {/* price */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            {...register('price', { required: true })}
                            className="input  w-full border-red-800" />
                    </div>

                </div>
                {/* recipe details */}
                <div className="">
                    <label className="label">
                        <span className="label-text">Product Details</span>
                    </label>
                    <textarea {...register('description')} className="textarea textarea-bordered border-red-800 h-24" placeholder="Bio"></textarea>
                </div>

                <div className="form-control w-full my-6">
                    <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                </div>

                <button className="btn">
                    Add Item <FaUtensils className="ml-4"></FaUtensils>
                </button>
            </form>
        </div>
    </div>
    
    );
};

export default AddItem;