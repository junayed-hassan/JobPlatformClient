import { Helmet } from "react-helmet";
import Carousel from "../components/Carousel";
import TabCategories from "../components/TabCategories";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>JOB NEST | HOME</title>
      </Helmet>
      <Carousel />
      <TabCategories />
    </div>
  );
};

export default Home;
