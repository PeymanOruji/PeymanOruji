import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../src/index.css";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      fetchTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(
      tasks.filter((task) => {
        return task.id != id;
      })
    );
  };

  //add Task
  const onAddTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();

    setTasks([...tasks, data]);
  };

  //toggle Reminder
  const toggleReminder = async (id) => {
    const task = await fetchTask(id);
    const updTask = { ...task, reminder: !task.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((t) =>
        t.id == data.id ? { ...t, reminder: data.reminder } : t
      )
    );
  };
  const onAdd = () => {
    setShowAddTask(!showAddTask);
  };
  return (
    <Router>
      <div className="container ">
        <Header
          title="Task Tracker"
          showAddTask={onAdd}
          showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAddTask={onAddTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  toggleReminder={toggleReminder}
                  deleteTask={deleteTask}
                  tasks={tasks}
                />
              ) : (
                "No Tasks To Show"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
