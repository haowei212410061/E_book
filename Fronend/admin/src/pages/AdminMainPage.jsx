import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/global style/global.css";
import "../styles/pages/Main.css";
import adminUserImage from "../assets/Admin.png";
import { useQuery ,useMutation} from "@apollo/client";
import { GET_ALL_BOOK_WITH_ADMIN } from "../Graphql api/query";
import { GET_SINGLE_BOOK_WITH_ADMIN } from "../Graphql api/mutation";
import ColumnTitle from "../components/UI/ColumnTitle";
import BookList from "../components/UI/BookList";
import Navbar from "../components/Navbar";
import AdminTitle from "../components/UI/AdminTitle";
import Filter from "../components/Filter";
import ControlPageBtn from "../components/UI/ControlPageBtn";
function getUserLocalStorage(){
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  return {username:user.data.username,email:user.data.email}
}

function AdminMainPage() {
  const { loading, error, data } = useQuery(GET_ALL_BOOK_WITH_ADMIN);
  const response = data?.AdminBooks?.data || [];
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [column, setColumn] = useState("bookname");
  const [input, setInput] = useState("");
  const user = getUserLocalStorage();
  const [getSingleBookWithAdmin] = useMutation(GET_SINGLE_BOOK_WITH_ADMIN)
  const [buttonDisable,setButtonDisable] = useState(true)
  const [displayWindow,setDisplayWindow] = useState('none')

  useEffect(()=>{
    isDisabled();
    const time = setTimeout(()=>{
      //要先讓數據加載進來
      setBooks(response)
    },500)
    return ()=>clearTimeout(time)
  },[response,buttonDisable])
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>Error: {error.message}</div>;
  
  function selectFunc(event) {
    const column = event.target.value;
    setColumn(column);
  }

  function isDisabled(){
    if(books.length === 0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  }

  function addEditChangeListener(event) {
    const userInput = event.target.value;
    console.log(userInput);
    setInput(userInput);
  }

  function addPageNumber() {
    if(books.length === 0){
      setButtonDisable(false)
    }
    const newCount = pageNumber + 10;
    if (newCount < books.length) {
      setPageNumber(newCount);
    }
  }
  function reducePageNumber() {
    if(books.length === 0){
      setButtonDisable(false)
    }
    const newCount = pageNumber - 10;
    if (newCount >= 0) {
      setPageNumber(newCount);
    }
  }

  async function getSingleBook(column,info){
    try{
      if(input.length === 0){
        toast.warning("有必要欄位未輸入")
      }else{
        const {data} = await getSingleBookWithAdmin({
          variables:{
            column:column,
            info:info
          }
        })
        const res = data.SingleBook.data   
        if(res.length === 0){
          setBooks([])
          toast.error('No data')
        }else{
          setBooks(res)
          console.log(res)
        }
      }
    }catch(error){
      console.log(error)
      toast.warning('fail to fetch single book')
    }
  }
  

  return (
    <div className="admin_main_container">
      <Navbar email={user.email} username={user.username} image={adminUserImage} />
      <section className="main_content">
        <AdminTitle title={"Book Managenment"}/>
        <Filter getSingleBookFunc={getSingleBook} selectFunc={selectFunc} editChangeListener={addEditChangeListener} column={column} info={input} />
        <table className="data">
          <thead className="table_head">
            <tr className="column">
              <ColumnTitle
                data={response}
              />
            </tr>
          </thead>
          <tbody className="table_body">
            <BookList data={books} page={pageNumber} />
          </tbody>
        </table>
        <ControlPageBtn reduce={reducePageNumber} add={addPageNumber}/>
      </section>
    </div>
  );
}
export default AdminMainPage;
