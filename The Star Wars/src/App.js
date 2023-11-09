import React, { useEffect, useState } from "react";

import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);



  const { isLoading, error , sendRequest:fetchTasks } = useHttp();;


  useEffect(() => {

    const transformTasks = (myTasksObj) => {
      const loadedTasks = [];
  
      for (const taskKey in myTasksObj) {
        loadedTasks.push({ id: taskKey, text: myTasksObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };
    
    fetchTasks({
      url: "https://react-http-f7799-default-rtdb.firebaseio.com/tasks.json",
    },transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
