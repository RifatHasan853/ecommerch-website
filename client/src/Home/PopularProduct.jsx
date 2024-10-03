import { Link } from "react-router-dom";
import Product from "../components/Product";





import useMenu from "../Hooks/useMenu";
import useAuth from "../Hooks/useAuth";
import Loader from "../components/Loader";


const PopularProduct = () => {

  const [menu] = useMenu();
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  // Limit the products to the first 4
  const limitedProducts = menu.slice(0, 8);
  /* const [menu,setMenu] = useState([6]);
   

  

   
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                
            });
    }, [])*/
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
          <h3 className="flex lg:ml-[20rem]  mt-[10rem] text-[3rem] justify-center items-center">
            Special<br /> Products
          </h3>

          <Link
            to="/allproducts"
            className=" bg-pink-600 font-bold rounded-full py-2 px-10 lg:mr-[18rem] mt-[10rem] flex items-center justify-center"
          >
            Shop
          </Link>
        </div>

        <div className=" lg:ml-10 ">
        <div className='grid grid-cols-1   mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {limitedProducts.map(products => (
              <Product key={products._id} products={products} />
            ))}
          </div>
        </div>
      </>
    );
};

export default PopularProduct;