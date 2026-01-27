import Login from "../Components/Login";
import backgroundImg from "../assets/background.png";

function LoginPage() {
  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
        <Login />
      </div>
    </>
  )
}

export default LoginPage;