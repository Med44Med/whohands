"use client";

import { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa";
import { timer } from '../../utilis/timer';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleCheck = (e, todo, item) => {
    setTodos((perv) =>
      perv.map((section) =>
        section.name === todo
          ? {
              ...section,
              todo: section.todo.map((todo) =>
                todo.name === item ? { ...todo, value: e.target.checked } : todo
              ),
            }
          : section
      )
    );
  };

  return (
    <>
      <main className="w-full p-5 flex flex-col justify-start items-center gap-5">
        <h1 className=" py-3 text-text text-5xl font-medium font-playfair">
          Todos List
        </h1>
        {todos.map((todo, index) => (
          <div
            key={index}
            className="w-11/12 rounded-xl bg-surface shadow p-3  flex flex-col justify-start items-start gap-3"
          >
            <h1 className="text-text text-xl font-medium font-poppins capitalize">
              {todo.name} :
            </h1>
            <div className="w-full flex flex-col justify-start items-start gap-1">
              {todo.todo.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="w-full flex justify-start items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={item.value}
                    onChange={(e) => handleCheck(e, todo.name, item.name)}
                  />
                  <label className="text-text text-base font-poppins capitalize">
                    {item.name}
                  </label>
                </div>
              ))}
              <div className="group mt-1 cursor-pointer w-full flex justify-start items-center gap-2">
                <FaPlus className="text-text-secondary text-base font-poppins capitalize group-hover:text-primary" />
                <p className="text-text-secondary text-base font-poppins capitalize group-hover:text-primary">add a todo</p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Todo;
