import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate()
  
function handleLogout(){
  localStorage.clear(); // token, email 2개 아이템을 삭제
  navigate("/")
  window.location.reload()
} 

return <button onClick={handleLogout}>로그아웃</button>


}
export default Logout