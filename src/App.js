import './App.css';
import { useState , useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const baseUrl='http://localhost/react_todo/'

function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])


  useEffect(() =>{
    fetchTodos()
  },[])



  const fetchTodos=async()=>{

    const todos=await fetch(baseUrl + 'getTodos.php')
    const response=await todos.json()

    setTodos(response.data)

  }

  const addTodo = async() => {

    var formData=new FormData()

    formData.append('todo',todo)

    const todos=await fetch(baseUrl+'addTodo.php',{
      method:'POST',
      body:formData
    })
    const response=await todos.json()

    if(response.success){
      fetchTodos()

    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    addTodo();

    setTodo('')
    toast.success('Todo added successfully');

  }

  const deleteTodo = async (id) => {
    var formData=new FormData()
    formData.append('id',id)

    const resp=await fetch(baseUrl + 'deleteTodo.php',{
      method:'POST',
      body:formData
    })
    const response=await resp.json()
    if(response.success){
      fetchTodos()
      toast.error('Todo deleted successfully');
    }
  }


  const editTodo = async (id, todo) => {
    var formData=new FormData()
    formData.append('id',id)
    formData.append('todo',todo)

    const resp=await fetch(baseUrl + 'editTodo.php',{
      method:'POST',
      body:formData
    })

    const response=await resp.json()
    if(response.success){
      fetchTodos()
    toast.info('Todo edited successfully');
  }
}



  return (
    <div className='d-flex vh-100 vw-100 justify-content-center align-items-center'>
      <div className='shadow rounded p-3 w-50'>
        <form onSubmit={handleSubmit}>
          <div className='d-flex gap-2'>
            <input value={todo} onChange={(e) => { setTodo(e.target.value); }} className='form-control' />
            <button type='submit' className='btn btn-primary'>Add</button>
          </div>
        </form>
        <div className='mt-3 border p-3' style={{ maxHeight: '45vh', overflow: 'auto' }}>
          {todos.map((item, index) => {
            return <Todo
              key={item.id}
              index={item.id}
              item={item.todo}
              deleteTodo={(id) => { deleteTodo(id) }}
              editTodo={(todo) => {
                editTodo(item.id, todo)
              }}
            />
          })}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

const Todo = ({ item, deleteTodo, index, editTodo }) => {

  const [isEdit, setIsEdit] = useState(false)

  const [todo, setTodo] = useState(item)


  const handleSubmit = (e) => {
    e.preventDefault()
    editTodo(todo)
    setIsEdit(false)

  }
  console.log(todo);

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');

    if (confirmed) {
      deleteTodo(index);
    }
  };


  return <div key={index} className='shadow rounded p-3 mb-3'>
    <div className='d-flex justify-content-between'>
      <div className='d-flex gap-3 align-items-center'>
        <p className='mb-0'>{index})</p>
        {isEdit ?
          <form onSubmit={handleSubmit}>
            <div className='d-flex align-items-center gap-2'>
              <input className='form-control' value={todo} onChange={(e) => { setTodo(e.target.value) }} />
              <button type='submit' className='btn btn-success'>Edit</button>
            </div>
          </form>
          : <p className='mb-0'>{item} </p>
        }
      </div>
      <div className='d-flex gap-3'>
        <button className='btn btn-warning' onClick={() => { setIsEdit(prev => !prev) }}>{isEdit ? 'Cancel' : 'Edit'}</button>
        <button className='btn btn-danger' onClick={() => {
          handleDelete(index)
        }}>Delete</button>
      </div>
    </div>
  </div>
}