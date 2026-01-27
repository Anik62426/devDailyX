import Login from "../Components/Login";
import DropdownMenu from "../Components/DropdownMenu.jsx";
import Heading from "../Components/Heading.jsx";    
import Header from "../Components/Header.jsx";
import TopicList from "../Components/topicList.jsx";
import QuestionTable from "../Components/QuestionTable.jsx";


function HomePage() {
  return (
    <>
   <div className="min-w-screen">
    <TopicList/>
      <main className="min-w-[70vh] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <QuestionTable />
      </main>
    </div>
      
    </>
  )
}

export default HomePage;