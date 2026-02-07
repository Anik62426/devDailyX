import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AdminPage = () => {
  const [Name, setName] = useState("");
  const [toughness, setToughness] = useState("easy");
  const [day, setDay] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected || !selected.type.startsWith("image/")) return;

    setQuestionImage(selected);
    setPreview(URL.createObjectURL(selected));
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("toughness", toughness);
    formData.append("day", day);
    if (questionImage) formData.append("questionImage", questionImage);

    try {
      await axios.post(`${BASE_URL}/api/question/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Uploaded successfully 🚀");

      // Optional reset
      setName("");
      setToughness("easy");
      setDay("");
      setQuestionImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed ❌", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] p-6 rounded-xl shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-600 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold py-2 px-4 rounded-md"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="w-full p-2.5 rounded-lg border border-gray-600 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold"
            value={toughness}
            onChange={(e) => setToughness(e.target.value)}
          >
            <option className="text-black" value="easy">Easy</option>
            <option className="text-black" value="medium">Medium</option>
            <option className="text-black" value="hard">Hard</option>
          </select>

          <div className="relative">
            <input
              type="number"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="peer w-full border border-gray-600 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold py-2 px-4 rounded-md placeholder-transparent focus:outline-none"
              placeholder="Day"
              required
            />
            <label
              htmlFor="day"
              className="absolute left-3 top-2 text-white font-bold transition-all duration-200
                peer-placeholder-shown:opacity-100 
                peer-not-placeholder-shown:opacity-0 
                peer-focus:text-blue-400 px-1"
            >
              Day
            </label>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-600 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold py-2 px-4 rounded-md"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-full border border-slate-500 transition-all duration-300 shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Right: Image Preview */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-96 object-contain rounded-lg border border-slate-600"
            />
          ) : (
            <p className="text-gray-400 flex items-center gap-2 text-center">
              Question Image <Camera />
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
