import { Link, useNavigate } from "react-router-dom";
import { logOut, userInfo } from "../UtlisFunction/authentication";
import { CirclePower, Home } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const user = userInfo();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  const [tk, setTk] = useState(localStorage.getItem("tk"));
  const updateToken = () => {
    setTk(localStorage.getItem("tk"));
  };
  useEffect(() => {
    updateToken();
    const intervalId = setInterval(updateToken, 1000);
    window.addEventListener("storage", updateToken);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("storage", updateToken);
    };
  }, []);

  return (
    <div className="w-full container mx-auto">
      <div className="flex justify-between items-center py-4 text-black">
        <div>
          <h1 className="text-xl font-bold text-[#28D08A]">OKOBIZ</h1>
        </div>

        <div className="space-x-6 flex items-center">
          <div>
            <Link
              to="/"
              onClick={() => window.location.reload()}
              className="text-[#28D08A] flex items-center"
            >
              <Home />
            </Link>
          </div>
          <div className="bg-[#28D08A] px-5 text-white">
            <h1>TK- {tk || 0}</h1>
          </div>
          {user ? (
            <div className="relative">
              <div
                className="h-10 w-10 border border-[#28D08A] rounded-full cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
                  alt=""
                  className="p-1"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b">
                      <Link to={"/change-password"}> Change Password</Link>
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <button
                        onClick={handleLogOut}
                        className=" bg-red-600 text-white px-4 py-1 rounded-md  w-full flex items-center gap-2 justify-center"
                      >
                        Logout <CirclePower size={16} />
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className=" bg-[#28D08A] px-4 text-white rounded-lg ">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
