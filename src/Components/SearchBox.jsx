import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useQuestions } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const { questions } = useQuestions();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const filterQuestion = questions.filter((q) =>
    q.Name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center mr-5">
      <div className="relative">
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

        {searchValue && filterQuestion.length > 0 && (
          <div className="absolute top-11 left-0 right-0 bg-[#272727] rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
            {filterQuestion.map((q) => (
              <div
                key={q.id}
                onClick={() => {
                  navigate(`/question/${q.id}`);
                  setSearchValue('');
                }}
                className="px-4 py-2 text-sm text-white hover:bg-[#3a3a3a] cursor-pointer transition"
              >
                {q.Name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
