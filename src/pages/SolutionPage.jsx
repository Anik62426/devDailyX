import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, Eye, ArrowBigUpDash } from 'lucide-react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SolutionPage() {
    const { solutionId } = useParams();
    const [solutionData, setSolutionData] = useState();
    const [adminsSolution, setAdminSolution] = useState();
    

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/solution/${solutionId}`,
                    { withCredentials: true }
                );
                setSolutionData(response.data);
                const adminSolution = response.data?.filter(s => s.userID?.admin === true);
                setAdminSolution(adminSolution);
            } catch (error) {
                console.error('Error fetching question data:', error);
            }
        };
        fetchQuestion();
    }, []);


    
    // const imageUrls = adminSolution.map(sol => sol.solutionImage);

    const geSolutions = adminsSolution?.[0]?.solutionImage;
    console.log(adminsSolution)
    const solutionExplanation = adminsSolution?.[0]?.solutionExplanation;
    // console.log("adminsolution", adminsSolution);
    // console.log("solutionData", solutionData?.[0].userID._id);
    // console.log("solutionData", solutionData);

    // const emails = solutionData?.map(sol => console.log(sol.userID?.email));
    // const upvotes = solutionData?.map(sol => console.log(sol?.upVote));

    // console.log(solutionData?[0].userID)





   
    const handleUpvote = async (userId, solutionid) => {

        const response = await axios.put(
            `${BASE_URL}/api/solution/updateUpvote/${solutionId}`,
            { SolutionUser: userId },
            { withCredentials: true }
        );
        
        const { upVote, voted } = response.data
        setSolutionData(prev =>
            prev.map(sol =>
                sol._id === solutionid
                    ? { ...sol, upVote,voted}
                    : sol
            )
        );

    };

   




    return (
        <div className='flex flex-col lg:flex-row gap-6 mt-10  mx-auto px-4'>

            <div className='min-w-[67vh] md: lg:w-[60%] bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl p-8 shadow-2xl'>
                <h2 className='text-2xl font-bold text-white mb-6'>{solutionId}. Admin Solution</h2>
                <div className='bg-slate-900 rounded-xl p-6 shadow-lg'>
                   {geSolutions ?( <img src={geSolutions} alt="For A Reason Karan Aujla" />):(<p className='text-white font-bold text-2xl'>Admin Has Not Provided Solution</p>) } 
                </div>
                <div className='mt-8 bg-slate-800 rounded-xl p-6 shadow-lg'>
                    <h3 className='text-white font-bold mb-3'>Explanation:</h3>
                    <p className='text-white text-sm leading-relaxed'>
                        {solutionExplanation ? solutionExplanation : (<p className='text-xl font-semibold'>For A Reason Karan Aujla</p>) }
                    </p>
                </div>
            </div>



            <div className=' min-w-[67vh] md:min-w-[30vh] lg:w-[38%]  bg-gradient-to-br from-slate-800 to-black border rounded-2xl p-6 shadow-2xl flex flex-col'>
                <h2 className='text-2xl font-bold text-white mb-4'>Solution List</h2>
                <div className='flex-1 overflow-y-auto space-y-3'>
                    {solutionData?.map((solution) => (
                        <div
                            key={solution?._id}
                            className='bg-[#0e1113] hover:bg-[#272a2c] rounded-lg p-4 transition-all duration-300 shadow-md hover:shadow-lg'
                        >
                            {/* {console.log("Hello from inside div 👋", solution)} */}
                            <div className='flex items-center justify-between mb-2'>
                                <h3 className='text-white font-semibold w-20'>{solution?.userID?.email.split("@")[0]}</h3>
                                <div className='flex items-center gap-2'>
                                    <button
                                        onClick={() => { handleUpvote(solution?.userID?._id,solution?._id)}}
                                        className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer
                                             ${solution?.voted
                                                ? 'bg-gradient-to-r from-[#d93900] to-[#d93a0094] text-white shadow-lg'
                                                : 'bg-[#2a3236] text-gray-300  '
                                            }`}
                                    >
                                        <ArrowBigUpDash className=' hover:text-red-500' size={16} />
                                        <span className='text-sm font-semibold'>{solution?.upVote}</span>
                                    </button>
                                </div>
                                <button onClick={()=>setAdminSolution([solution])} className='cursor-pointer'>
                                    <Eye size={20} className='text-gray-400 hover:text-blue-400' />
                                    
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
                <div className='mt-4 pt-4 border-t border-slate-600'>
                    <button className='w-full bg-gradient-to-r from-slate-600 to-slate-900 text-white font-bold font-mono py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer'>
                        View All
                    </button>
                </div>
            </div>
        </div>
    );
}
