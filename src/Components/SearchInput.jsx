import { FcSearch } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchValue } from "../redux/EcommerceSlice";

const SearchInput = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="flex-1 relative mr-5">
      <input
        type="text"
        onChange={(e) => dispatch(searchValue(e.target.value))}
        placeholder="Search here..."
        className="w-full  border border-gray-300 rounded-full p-[5px] pl-5 outline-none h-7 text-sm"
      />

      <FcSearch className="absolute top-[7px] right-5 cursor-pointer" onClick={()=>navigate('/shop')}/>
    </div>
  );
};

export default SearchInput;
