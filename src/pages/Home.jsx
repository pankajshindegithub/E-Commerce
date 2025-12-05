import Carousel from "../components/Carousel";
import Features from "../components/Features";
import Footer from "../components/Footer";
import MidBanner from "../components/MidBanner";


const Home = () => {
  return (
    <>
    <div className="overflow-x-hidden">
        <Carousel/>
      <MidBanner/>
      <Features/>
    </div>
      
    </>
  )
}

export default Home;
