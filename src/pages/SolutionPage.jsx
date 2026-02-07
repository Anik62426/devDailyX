import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Eye, ArrowBigUpDash } from 'lucide-react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SolutionPage() {
  const { solutionId } = useParams();
  const [solutionData, setSolutionData] = useState([]);
  const [adminsSolution, setAdminSolution] = useState([]);
  const [adminSolutionName, setAdminSolutionName] = useState(" ")

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/solution/${solutionId}`,
          { withCredentials: true }
        );
        setSolutionData(res.data);

        const adminSol = res.data?.filter(s => s.userID?.admin === true);
        setAdminSolution(adminSol);
        setAdminSolutionName(adminSol[0]?.userID?.email)
        // console.log(adminSol)

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchSolutions();
  }, [solutionId]);



  const handleUpvote = async (solutionOwnerId, solutionIdInner) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/solution/updateUpvote/${solutionId}`,
        { SolutionUser: solutionOwnerId },
        { withCredentials: true }
      );

      const { upVote, voted } = res.data;

      setSolutionData(prev =>
        prev.map(sol =>
          sol._id === solutionIdInner
            ? { ...sol, upVote, voted }
            : sol
        )
      );
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  console.log(adminSolutionName)

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-10 mx-auto px-4">

      {/* Admin Solution */}
      <div className="min-w-[67vh] lg:w-[60%] bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">
          {solutionId}. {adminSolutionName.split("@")[0]}
        </h2>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
          {adminsSolution?.[0]?.solutionImage ? (
            <img
              src={adminsSolution[0].solutionImage}
              alt="Admin Solution"
              className="rounded-lg w-full"
            />
          ) : (
            <p className="text-white font-bold text-2xl">
              Admin Has Not Provided Solution
            </p>
          )}
        </div>

        <div className="mt-8 bg-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-white font-bold mb-3">Explanation:</h3>
          <p className="text-white text-sm leading-relaxed">
            {adminsSolution?.[0]?.solutionExplanation || (
              <span className="text-xl font-semibold">
                No explanation provided.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Solution List */}
      <div className="min-w-[67vh] lg:w-[38%] bg-gradient-to-br from-slate-800 to-black border rounded-2xl p-6 shadow-2xl flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-4">Solution List</h2>

        <div className="flex-1 overflow-y-auto space-y-3">
          {solutionData.map(solution => (
            <div
              key={solution._id}
              className="bg-[#0e1113] hover:bg-[#272a2c] rounded-lg p-4 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold w-20">
                  {solution.userID?.email?.split("@")[0]}
                </h3>

                <button
                  onClick={() =>
                    handleUpvote(solution.userID._id, solution._id)
                  }
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer
                    ${solution.voted
                      ? 'bg-gradient-to-r from-[#d93900] to-[#d93a0094] text-white shadow-lg'
                      : 'bg-[#2a3236] text-gray-300'
                    }`}
                >
                  <ArrowBigUpDash size={16} />
                  <span className="text-sm font-semibold">
                    {solution.upVote}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAdminSolution([solution]);
                    setAdminSolutionName(solution?.userID?.email);
                  }}
                  className="cursor-pointer flex gap-2 items-center border border-white px-2.5 py-1 rounded-3xl hover:bg-blue-400"
                >
                  <p className='text-white'>View</p> <Eye size={20} className="text-gray-400  hover:text-blue-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
