import { useEffect, useState } from "react"
import REQ_URL from "../js/request"
import './boardList.css'

const BoradList = () => {
  // 게시판 글 서버 응답 저장
  const [boards, setboards] = useState([])
  // 페이지 설정
  const [ currentPage, setCurrentPage] = useState(1)
  const boardPerPage = 5 // 한페이지에 5개

  useEffect(()=>{
    // 요청함수
   async function fetchBoards() {
    const token = localStorage.getItem("token")
      try{const response = await fetch(`${REQ_URL}/api/boards`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok){
        const data = await response.json()
        setboards(data)
      }
    }catch(error){
      console.error("데이터 요청 실패:", error)
    }
  } // 여기까지는 api 요청 함수 정의
  fetchBoards() // 함수 실행
},[]) // [] 의존성리스트가 비어있으면 처음 렌더링 할 때 한 번만 실행
console.log(boards) // 로그 출력은 반드시 여기서
// 페이징은 리액트가 합니다.
const indexOfLast = currentPage * boardPerPage // 5, 10, 15 ....
const indexOfStart = indexOfLast - boardPerPage // 0, 5, 10 ....
const currentBoards = boards.slice(indexOfStart, indexOfLast) // lst는 미포함

// 페이지 총 갯수 : 페이지 버튼 만들 때 사용
const totalPage = Math.ceil(boards.length/boardPerPage)

return (
    <div className="board-container">
    <h1>전체 글</h1>
    <table className="board-table">
      <thead>
        <tr>
          <th>제목</th>
          <th>내용</th>
          <th>작성일</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        {currentBoards.map((board)=>(
          <tr key={board.id}>
            <td>{board.title}</td>
            <td>{board.content}</td>
            <td>{new Date(board.createdAt).toLocaleDateString()}</td>
            <td>{board.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="page">현재 페이지 : {currentPage}</div>
    <div className="pagination">
      {/* totalPages 값을 length로 하는 배열을 만들고 인댁스 i 값을 이용해서 버튼 생성은 배열의 값이며 현재 상태는 값이 없습니다*/}
      {Array.from({length: totalPage},(_,i)=>(
        <button key={i+1} onClick={()=>setCurrentPage(i+1)} className={currentPage === i + 1 ? 'active' : ''}>
          {i+1}
        </button>
      ))}
    </div>
    </div>
  )
}
export default BoradList