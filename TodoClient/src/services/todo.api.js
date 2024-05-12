import axios from 'axios';
import TLinkApi from './tlink.api';

export const fetchTodos = async () => {
    try {
      const data = await TLinkApi.get(`/todo/list`);
      return data.data; 
    } catch (err) {
      console.error(err, 'err');
      throw err; 
    }
  };

export const addTodo = async(todo) => {
try{
  const data=  await TLinkApi.post(`/todo/`, todo);
  return data;
}catch(err){
  console.error(err,'err');
}
}

export const updateTodo = (id, todo) => {
  try{
    const data=  TLinkApi.put(`/todo/${id}`, todo);
    return data;
  }
  catch(err){
    console.error(err,'err');
  }
};

export const deleteTodo = (id) => {
  try{
    const data=  TLinkApi.delete(`/todo/${id}`);
    return data;
  }
  catch(err){
    console.error(err,'err');
  }
};