
import Navbar from '../Navbar/Navbar';
import Categories from '../Categories/Categories';
import Dummy from '../DummyCard/Dummy'
import ProductCard from '../ProductCard/productCard';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <Categories />
      {/* <Dummy/> */}
      <ProductCard/>
    </div>
  );
}

export default Dashboard;