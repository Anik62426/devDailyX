import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBox() {
    const [searchValue, setSearchValue] = useState('');
    //  console.log(searchValue);
    return (
        <div className="flex items-center justify-center mr-5 ">
            <div className="relative   ">
                <div className="flex items-center bg-[#393939] rounded-full shadow-lg px-1 py-1">
                    <Search className="w-4 h-4 text-gray-400 ml-1.5 mr-2" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search"
                        className="flex-1 bg-transparent outline-none text-gray-400 placeholder-gray-400"
                    />
                </div>
            </div>
        </div>
    );
}