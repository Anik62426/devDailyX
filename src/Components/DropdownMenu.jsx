import { useState } from "react";

const data = [
  {
    day: "Day 1",
    questions: [
      { id: 1, name: "Arrays", difficulty: "Easy", question: "Find the sum of array" },
      { id: 2, name: "Strings", difficulty: "Medium", question: "Reverse a string" }
    ]
  },
  {
    day: "Day 1",
    questions: [
      { id: 1, name: "Arrays", difficulty: "Easy", question: "Find the sum of array" },
      { id: 2, name: "Strings", difficulty: "Medium", question: "Reverse a string" }
    ]
  },
  {
    day: "Day 2",
    questions: [
      { id: 3, name: "Binary Search", difficulty: "Hard", question: "Find element in rotated array" }
    ]
  }
];

export default function DropdownMenu() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="p-5">
      {/* MAIN DROPDOWN */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setSelectedDay(selectedDay === null ? "" : null)}
      >
        Select Day
      </button>

      {/* DAY LIST */}
      {selectedDay !== null && (
        <div className="mt-2 bg-white border rounded shadow-lg w-48">
          {data.map((item, index) => (
            <div key={index}>
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                onClick={() => setSelectedDay(item.day)}
              >
                {item.day}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SHOW QUESTIONS AFTER SELECTING DAY */}
      {selectedDay && (
        <div className="mt-4 bg-white border rounded shadow-lg p-3">
          <h2 className="font-semibold mb-2">{selectedDay} - Questions</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="font-semibold">
                <td className="border px-2 py-1">ID</td>
                <td className="border px-2 py-1">Name</td>
                <td className="border px-2 py-1">Difficulty</td>
                <td className="border px-2 py-1">Question</td>
              </tr>
            </thead>
            <tbody>
              {data
                .find((d) => d.day === selectedDay)
                ?.questions.map((q) => (
                  <tr key={q.id}>
                    <td className="border px-2 py-1">{q.id}</td>
                    <td className="border px-2 py-1">{q.name}</td>
                    <td className="border px-2 py-1">{q.difficulty}</td>
                    <td className="border px-2 py-1">{q.question}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
