import Login from "../Components/Login";
import DropdownMenu from "../Components/DropdownMenu.jsx";
import Heading from "../Components/Heading.jsx";    
import Header from "../Components/Header.jsx";
import TopicList from "../Components/topicList.jsx";
import QuestionTable from "../Components/QuestionTable.jsx";


function HomePage() {
  return (
    <>
   <div className="min-w-[75vh]">
    <TopicList/>
    </div>
      
    </>
  )
}

export default HomePage;