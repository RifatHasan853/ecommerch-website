import useMenu from "../Hooks/useMenu";
import Loader from './../components/Loader';
import Carousel from './Carousel';
import SmallProducts from './../pages/Dashboard/SmallProducts';
import useAuth from "../Hooks/useAuth";

const Header = () => {
  const [menu] = useMenu();
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  // Limit the products to the first 4
  const limitedProducts = menu.slice(0, 4);

  return (
    <>
      <div className="flex justify-around ml-6 items-center ">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid grid-cols-2 ">
            {limitedProducts.map((product) => (
              <div key={product._id}>
                <SmallProducts products={product} />
              </div>
            ))}
          </div>
        </div>
         <Carousel />
       
      </div>
    </>
  );
};

export default Header;
