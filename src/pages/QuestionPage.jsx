import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Upload, ChevronsRight, CheckCircle, AlertCircle, CheckCheck } from 'lucide-react';
import axios from 'axios';



export default function QuestionPage() {

  const { questionId } = useParams();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [uploadMessage, setuploadMessage] = useState(" ");
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/question/${questionId}`,
          { withCredentials: true }
        );
        setQuestionData(response.data);


      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };
    fetchQuestion();
  }, [questionId]);


  const handleUpload = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("solutionImage", selectedFile);
      formData.append("questionID", questionId);

      await axios.post(
        "http://localhost:8000/api/solution/upload",
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (err) {
      setuploadMessage(err.response?.data || err.message);
      if (err.response?.data.message === "already") {
        setAlreadyUploaded(true);
        return;
      }
      // alert("❌ Upload failed");
    }
  };

  useEffect(() => {
    try {
      const checkAlreadyUploaded = async () => {
        const response = await axios.get(
          `http://localhost:8000/api/solution/check/${questionId}`,
          { withCredentials: true }
        );

        if (response.data.message === "already") {
          setAlreadyUploaded(true);
        }
      };
      checkAlreadyUploaded();
    } catch (error) {

    }

  }, [handleUpload])

  //  console.log(alreadyUploaded);









  return (
    <>
      <div className='flex flex-col mt-10 min-w-[70vh]  bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl p-8 items-center justify-center shadow-2xl'>
        <div className=' mt-10 w-[90%] h-[85%] bg-slate-900 rounded-2xl p-8 flex flex-col shadow-xl'>
          <h1 className="text-2xl font-bold text-white mb-6">{questionId}. {questionData?.Name || 'Question Title'}</h1>
          <div className='text-white font-mono text-sm '>
            <img src={questionData?.questionImage} alt="" />
          </div>

        </div>
        <div className='flex w-[90%] mt-10 '>
          <button
            disabled={alreadyUploaded || isUploading}
            type="button"
            className="relative flex items-center bg-white text-[#0f172b] hover:bg-[#e9eef4] border-2 border-[#e9eef4] font-bold py-2 px-6 rounded-md cursor-pointer overflow-hidden"
          >
            {alreadyUploaded ? (
              <>
                <span className="ml-2 mt-0.5  ">Already Uploaded</span>
                <CheckCheck className="ml-2 mt-0.5" />
              </>
            ) : (
              <>
                {isUploading ? (
                  <span className="ml-2 mt-0.5  ">Uploading...</span>
                ) : (<>
                  Upload
                  <Upload className="ml-2 mt-0.5" size={20} />
                </>
                )}

                <input
                  disabled={isUploading}
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={async (e) => {
                    const selectedFile = e.target.files[0];
                    if (!selectedFile) return;

                    setFile(selectedFile);
                    setIsUploading(true);
                    await handleUpload(selectedFile);
                    setIsUploading(false);
                  }}
                />
              </>
            )}
          </button>


          <button onClick={() => navigate(`/solution/${questionId}`)} className=' flex ml-10 bg-[#0f172b] hover:bg-[#2c2d32db] border-2 border-[#2c2d32db] text-white font-bold py-2 pl-10 pr-5 rounded-md cursor-pointer'>
            View Solution <ChevronsRight className='ml-1 mt-0.5' />
          </button>
        </div>
      </div>
    </>
  );
}

