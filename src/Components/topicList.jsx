import React, { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

export default function TopicList() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('All Topics');

    const topics = [
        'All Topics',
        'React',
        'JavaScript',
        'CSS',
        'HTML',
        'Node.js',
        'TypeScript',
        'Vue.js',
        'Angular',
        'Python',
        'SQL'
    ];

    const visibleTopics = isExpanded ? topics : topics.slice(0, 4);

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
        console.log(`User selected: ${topic}`);
    };

    return (
        <div className="flex flex-col justify-center items-center mt-30 mb-25 min-w-[65vh] ">
            <div className="grid grid-cols-3  lg:grid-cols-5 gap-2.5 ">
                {visibleTopics.map((topic, index) => (
                    <div 
                        key={index} 
                        className={`px-5 mx-1 py-3.5 w-[10rem] text-sm text-center rounded transition-all duration-300 cursor-pointer ${
                            selectedTopic === topic 
                                ? 'bg-white border rounded-3xl text-[282828] font-bold shadow-lg shadow-blue-400/40' 
                                : '  rounded-3xl text-gray-400 bg-[#282828] hover:bg-[#4e4b4bbc] hover:text-blue-500'
                        }`}
                        onClick={() => handleTopicSelect(topic)}
                    >
                        {topic}
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
        </div>
    );
}