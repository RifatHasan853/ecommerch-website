import { Link } from "react-router-dom";


const SmallProducts = ({products}) => {
    return (
        <div className="w-[14rem] lg:ml-[4rem] lg:p-3 ">
        <div className="relative">
          <img
            src={products.image}
            alt={products.name}
            className="w-full h-[200px]  rounded object-cover mb-2"
          />
         
        </div>
  
        <div className="p-4">
          <Link to={`/products/${products._id}`}>
            <h2 className="flex justify-between items-center">
              <div>{products.name}</div>
              <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                ${products.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    );
};

export default SmallProducts;