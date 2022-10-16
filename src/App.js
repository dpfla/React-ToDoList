import {useState} from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [modifyMode, setModifyMode] = useState([]);

  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if(todo === ""){
      return ;
    }
    setTodos((curArray) => [todo, ...curArray]);
    setModifyMode((curArray) => [false, ...curArray]);
    setTodo("");
  };
  const onDelete = (index) => {
    setTodos((curArray) => 
      curArray.filter((_, curi) => curi!==index));
  };
  const onModifyMode = (index) => {
    setModifyMode((curArray) => 
      curArray.map((cur, curi) => {
        if(curi === index)
          return !cur;
        return cur;
      })
    )
  };
  const onModify = (event, index) => {
    setTodos((curArray) => 
      curArray.map((cur, curi) => {
        if(curi === index)
          return event.target.value;
        return cur;
      })
    )
  };

  return (
    <div id="wrapper">
      <h1>My Todo List</h1>
      <form onSubmit={onSubmit} className="inputForm">
        <input 
          onChange={onChange} 
          value={todo} 
          type="text" 
          placeholder="Write your to do..." 
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {todos.map((item, index) => (
            <li key={index}>
              <span>
                {modifyMode[index] ? <input value={item} onChange={(event) => onModify(event, index)}></input> : <span>{item}</span>}
              </span>
              <span>
                <button onClick={() => onModifyMode(index)}>수정</button>
                <button onClick={() => onDelete(index)}>삭제</button>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
