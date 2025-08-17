import NewArrivals from "./Components/NewArrivals";
import BestSeller from "./Components/BestSeller";
import CategorySlider from "./Components/CategorySlider";
import Blog from "./Components/Blog";
import HomeSlider from "./Components/HomeSlider";
import { useSelector } from "react-redux";
import useAutoLogout from "./hooks/useAutoLogout";
import SecondSlider from "./Components/SecondSlider";
function App() {
  const token = useSelector((state) => state.ecommerce.token);

  useAutoLogout(token);

  return (
    <div>
      <HomeSlider />
      <CategorySlider />
      <NewArrivals />
      <SecondSlider />
      <BestSeller />
      <Blog />
    </div>
  );
}

export default App;
