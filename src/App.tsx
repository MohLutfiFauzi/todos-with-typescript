import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [complitedTodos, setComplitedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination} = result

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add;
    let active = todos;
    let complete = complitedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setComplitedTodos(complete);
    setTodos(active);
  } 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='app'>
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos} complitedTodos={complitedTodos} setComplitedTodos={setComplitedTodos}/>
      </div>
    </DragDropContext>
  );
}

export default App;
