import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


let questionsData = [];
try {
    const response = await axios.get('http://localhost:8000/api/question/v2/all', { withCredentials: true });
     questionsData = response.data;
    // console.log('Fetched questions:', questionsData);
    
} catch (error) {
    console.error('Error fetching questions:', error);
}



const QuestionTable = ({ questions = questionsData }) => {
    const [sortBy, setSortBy] = useState('id');
    const [filterToughness, setFilterToughness] = useState('all');
    const navigate = useNavigate();

    const getToughnessClass = (toughness) => {
        switch (toughness.toLowerCase()) {
            case 'easy':
                return 'text-[#1cb1a5] font-mono  text-sm';
            case 'medium':
                return 'text-[#c97c1f] font-mono  text-sm';
            case 'hard':
                return 'text-[#d03231] font-mono  text-sm';
            default:
                return 'text-gray-500 font-mono';
        }
    };

    

    const filteredQuestions = questions.filter((q) => 
        filterToughness === 'all' ? true : q.toughness.toLowerCase() === filterToughness.toLowerCase()
    );

    const sortedQuestions = [...filteredQuestions].sort((a, b) => {
        if (sortBy === 'id') return a.id - b.id;
        if (sortBy === 'name') return a.Name.localeCompare(b.Name);
        if (sortBy === 'toughness') {
            const order = { easy: 0, medium: 1, hard: 2 };
            return (order[a.toughness.toLowerCase()] || 3) - (order[b.toughness.toLowerCase()] || 3);
        }
        return 0;
    });

    return (
        <div className="p-4 w-full mt-6 max-w-6xl mx-auto">
            <div className="mb-4 flex  sm:flex-row gap-3 ">
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className=" text-bold appearance-none pr-4 pl-5 py-2  border border-gray-300 rounded-3xl bg-white text-gray-700 hover:border-gray-400 w-full"
                    >
                        <option value="id">Sort by ID</option>
                        <option value="name">Sort by Name</option>
                        <option value="toughness">Sort by Toughness</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />
                </div>

                <div className="relative">
                    <select
                        value={filterToughness}
                        onChange={(e) => setFilterToughness(e.target.value)}
                        className="appearance-none pr-10 pl-5 py-2  border border-gray-300 rounded-3xl bg-white text-gray-700 hover:border-gray-400 w-full"
                    >
                        <option value="all">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />
                </div>
            </div>

            <div className=" mt-10">
                <table className=" text-center w-full ">
                    <tbody >
                        {sortedQuestions.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-4 py-8 text-center text-white bg-[#272727]">
                                    No questions found
                                </td>
                            </tr>
                        ) : (
                            sortedQuestions.map((question, index) => (
                                <React.Fragment  key={question.id}>
                                    <tr className={` text-white h-16 cursor-pointer  hover:border hover:rounded-xl ${
                                        index % 2 === 0 ? 'bg-[#272727]' : ' '
                                    }`}
                                    onClick={() => navigate(`/question/${question.id}`)}
                                    >
                                        <td className="px-4 py-3 ">{question.id}</td>
                                        <td className="px-4 py-3 ">{question.Name}</td>
                                        <td className={`px-4 py-3 font-mono ${getToughnessClass(question.toughness)}`}>
                                            {question.toughness.charAt(0).toUpperCase() + question.toughness.slice(1)}
                                        </td>
                                       
                                    </tr>
                                   
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuestionTable;