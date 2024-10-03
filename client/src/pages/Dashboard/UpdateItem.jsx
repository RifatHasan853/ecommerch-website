import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const UpdateItems = () => {
    const product = useLoaderData();
    const { _id, name, category, brand, price, description} = product;


    const { register, handleSubmit } = useForm();
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
                price: parseFloat(data.price),
                description: data.description,
                brand: data.brand,
                image: res.data.data.display_url
            }
            // 
           

        console.log(menuItem );
        fetch(`https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app/products/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(menuItem )
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: ' Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    
        console.log( 'with image url', res.data);
    };
}
    
    return (
        <div className="container mx-auto">
        <SectionTitle heading="Update an Item" subHeading="Refresh info"></SectionTitle>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="ml-60 mx-auto">
            <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Recipe Name*</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={name}
                        placeholder=" Name"
                        {...register('name', { required: true })}
                        required
                        className="input input-bordered w-full" />
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
                  
                <div className="flex gap-6">
                    {/* category */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue={category} {...register('category', { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value="default">Select a category</option>

                            
                            <option value='Laptop'>Laptop</option>
                <option value='iphone'>iphone</option>
                <option value='Watch'>Watch</option>
                <option value='Camera'>Camera</option>
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
                    update Item 
                </button>
            </form>
        </div>
    </div>
    );
};

export default UpdateItems;