import { useState } from "react";
import SearchBox from "./SearchBox";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";   
import axios from "axios";  
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Header(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userName] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsDropdownOpen(false);
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         const res = axios.get(`${BASE_URL}/logout`)
         if(res){
            console.log("Logout Clearly");
         }
         navigate("/");
        console.log("User logged out");
    };

    const localUser = JSON.parse(localStorage.getItem("user"));
    // console.log("Local User:", localUser.email);

    return(
        <>
            <div className="sticky min-w-[70vh]  top-0 z-40 h-16 bg-[#282828] flex items-center justify-between px-4 shadow-lg">
                <button onClick={()=>navigate("/home")} className="text-2xl font-mono text-white font-bold mx-4 cursor-pointer">DevdailyX</button>
                <div className="flex items-center gap-4">
                    <SearchBox/>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-full border border-slate-500 hover:border-slate-400 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                        >
                            <User size={20} />
                            <span className="text-sm font-semibold">{localUser?.email.split("@")[0]}</span>
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-3 border-b border-slate-600 bg-slate-700">
                                    <p className="text-white text-sm font-semibold">{localUser.email.split("@")[0]}</p>
                                    <p className="text-gray-400 text-xs">{localUser.email}</p>
                                </div>
                                
                                <div className="border-t border-slate-600">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900 hover:text-red-200 transition-colors duration-200 flex items-center gap-3 group cursor-pointer"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;