import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Eye, ArrowBigUpDash } from 'lucide-react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const storedUser = localStorage.getItem("user");
const userData = storedUser ? JSON.parse(storedUser) : null;
const CURRENT_USER_ID = userData?.id || userData?._id;


export default function SolutionPage() {
  const { solutionId } = useParams();
  const [solutionData, setSolutionData] = useState([]);
  const [adminsSolution, setAdminSolution] = useState([]);
  const [adminSolutionName, setAdminSolutionName] = useState("");

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/solution/${solutionId}`,
          { withCredentials: true }
        );
        setSolutionData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchSolutions();
  }, [solutionId]);

 
  useEffect(() => {
    if (solutionData.length > 0) {
      const adminSol = solutionData.filter(s => s.userID?.admin === true);
      if (adminsSolution.length === 0) {
        setAdminSolution([adminSol[0]]);
        setAdminSolutionName(adminSol[0]?.userID?.email || "");
      } else {
        const updatedView = solutionData.find(s => s._id === adminsSolution[0]?._id);
        if (updatedView) setAdminSolution([updatedView]);
      }
    }
  }, [solutionData]);

  
  const handleUpvote = async (solutionOwnerId, solutionIdInner) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/solution/updateUpvote/${solutionId}`,
        { SolutionUser: solutionOwnerId },
        { withCredentials: true }
      );

      const { upVote } = res.data;

      setSolutionData(prev =>
        prev.map(sol => {
          if (sol._id === solutionIdInner) {
            const isCurrentlyVoted = sol.voters?.includes(CURRENT_USER_ID);
            const newVoters = isCurrentlyVoted
              ? sol.voters.filter(id => id !== CURRENT_USER_ID) 
              : [...(sol.voters || []), CURRENT_USER_ID];      

            return { ...sol, upVote, voters: newVoters };
          }
          return sol;
        })
      );
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-10 mx-auto px-4">
      
      
      <div className="min-w-[67vh] lg:w-[60%] bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">
          {solutionId}. {adminSolutionName?.split("@")[0] || "Select a Solution"}
        </h2>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
          {adminsSolution?.[0]?.solutionImage ? (
            <img
              src={adminsSolution[0].solutionImage}
              alt="Admin Solution"
              className="rounded-lg w-full"
            />
          ) : (
            <p className="text-white font-bold text-2xl text-center">
              No Image Provided
            </p>
          )}
        </div>

        <div className="mt-8 bg-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-white font-bold mb-3">Explanation:</h3>
          <p className="text-white text-sm leading-relaxed">
            {adminsSolution?.[0]?.solutionExplanation || (
              <span className="text-xl font-semibold text-gray-400">
                No explanation provided.
              </span>
            )}
          </p>
        </div>
      </div>

     
      <div className="min-w-[320px] lg:w-[38%] bg-gradient-to-br from-slate-800 to-black border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-4">Solution List</h2>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {solutionData
          .sort((a, b) => b.upVote - a.upVote)
          .map(solution => {
            const hasVoted = solution.voters?.includes(CURRENT_USER_ID);

            return (
              <div
                key={solution._id}
                className="bg-[#0e1113] hover:bg-[#1e2225] border border-slate-800 rounded-lg p-4 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium truncate max-w-[100px]">
                    {solution.userID?.email?.split("@")[0]}
                  </h3>

                  <div className="flex items-center gap-3">
                    {/* Upvote Button */}
                    <button
                      onClick={() => handleUpvote(solution.userID._id, solution._id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer
                        ${hasVoted
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                          : 'bg-[#2a3236] text-gray-300 hover:bg-[#363f44]'
                        }`}
                    >
                      <ArrowBigUpDash size={18} fill={hasVoted ? "white" : "none"} />
                      <span className="text-sm font-bold">{solution.upVote}</span>
                    </button>

                    {/* View Button */}
                    <button
                      onClick={() => {
                        setAdminSolution([solution]);
                        setAdminSolutionName(solution?.userID?.email);
                      }}
                      className="cursor-pointer flex gap-2 items-center border border-slate-500 px-3 py-1 rounded-full hover:bg-[#ef6756] hover:border-[#ef6756] transition-colors group"
                    >
                      <span className="text-white text-sm group-hover:text-white">View</span>
                      <Eye size={18} className="text-gray-400 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}