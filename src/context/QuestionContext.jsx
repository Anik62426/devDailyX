import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const QuestionsContext = createContext();

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          setError("Failed to load questions.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <QuestionsContext.Provider value={{ questions, loading, error }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionsContext);
