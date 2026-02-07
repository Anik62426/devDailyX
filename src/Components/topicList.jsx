import React, { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { useEffect } from 'react';
import axios from "axios";
import QuestionTable from './QuestionTable';
import SearchBox from './SearchBox';


export default function TopicList() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('All ');
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    
   useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/question/v2/all`, {
          withCredentials: true,
        });
        setQuestions(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to load questions. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
     

  


    const topics = [
        'All ',
        '1',
        '2',
        '3',
        '4',
        '5',
        
    ];

    const visibleTopics = isExpanded ? topics : topics.slice(0, 4);

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
        // console.log(`User selected: ${topic}`);
    };

     const filteredQuestions =
  selectedTopic === "All "
    ? questions
    : questions.filter((q) => q.day == selectedTopic);

//    console.log(selectedTopic);
//    console.log(filteredQuestions, " All Questions")

    return (
        <div className="flex flex-col justify-center items-center mt-30 mb-25 min-w-[65vh] ">
            <div className="grid grid-cols-3  lg:grid-cols-5 gap-2.5 ">
                {visibleTopics.map((topic, index) => (
                    <div 
                        key={index} 
                        className={`px-5 mx-1 py-3.5 w-[10rem] text-sm text-center rounded transition-all duration-300 cursor-pointer  ${
                            selectedTopic ===  topic 
                                ? 'bg-white border rounded-3xl text-[282828] font-bold shadow-lg shadow-blue-400/40' 
                                : '  rounded-3xl text-gray-400 bg-[#282828] hover:bg-[#4e4b4bbc] hover:text-blue-500'
                        }`}
                        onClick={() => handleTopicSelect(topic)}
                    >
                       {topic === "All " ? "All Days" : `Day ${topic}`}
                    </div>
                ))}

                

                
                {topics.length > 5 && (
                    <button 
                        className="p-2.5 text-sm rounded-3xl text-gray-400 bg-[#282828] hover:bg-[#4e4b4bbc] hover:text-blue-400 flex items-center justify-center gap-2 cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? <>Show Less <ChevronsUp/> </> : <>Show More<ChevronsDown size={18} /></>}
                    </button>
                )}
                
            </div>
            <QuestionTable questions={filteredQuestions} loading={loading} error={error} />
            
        </div>
    );
}