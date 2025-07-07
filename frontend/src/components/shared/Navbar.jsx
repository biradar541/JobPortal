import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 gap-5">
        <Link to="/" className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between  w-full">
          <ul className="flex items-center gap-6 font-medium">
            {!user ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            ) : user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] text-white">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-10 w-10 border border-gray-300 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                  <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4>{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio?.length > 25
                        ? user.profile.bio.slice(0, 25) + "..."
                        : user?.profile?.bio}
                    </p>
                  </div>
                </div>
                {user?.role === "student" && (
                  <div className="flex items-center gap-2">
                    <User2 className="text-muted-foreground" />
                    <Link to="/profile">
                      <Button variant="link" className="p-0 h-auto">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <LogOut className="text-muted-foreground" />
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 font-medium mt-2">
            {!user ? (
              <>
                <li>
                  <Link to="/" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={toggleMenu}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" onClick={toggleMenu}>
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={toggleMenu}>
                      Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={toggleMenu}>
                    SignUp
                  </Link>
                </li>
              </>
            ) : user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" onClick={toggleMenu}>
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={toggleMenu}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={toggleMenu}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" onClick={toggleMenu}>
                    Browse
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                {user?.role === "student" && (
                  <li>
                    <Link to="/profile" onClick={toggleMenu}>
                      View Profile
                    </Link>
                  </li>
                )}
                <li>
                  <li
                    variant="link"
                    onClick={() => {
                      logoutHandler();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </li>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
