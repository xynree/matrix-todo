import Functions from "./Functions";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useRef } from "react";

const Category = ({
  name,
  setTasks,
  td3id,
  td3tasks,
  hideShow,
  screenSize,
}) => {
  const hasClicked = useRef(false);
  const createTask = Functions().createTask;

  const onDrop = (item, monitor) => {
    console.log(monitor, item)
    let coordinates = {
      x:
        monitor.getInitialClientOffset().x +
        monitor.getDifferenceFromInitialOffset().x ,
      y:
        monitor.getInitialClientOffset().y +
        monitor.getDifferenceFromInitialOffset().y ,
    };

    let td3tasks = JSON.parse(window.localStorage.getItem("td3tasks"));
    let adjusted = td3tasks.filter((td3task) => td3task.id === item.id)[0];
    adjusted.quadrant = Functions().findQuad(name);
    adjusted.x = coordinates.x;
    adjusted.y = coordinates.y;
    Functions().editTask(adjusted, setTasks, hasClicked, td3tasks);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item, monitor) => onDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className="font-mono text-center text-sm w-full h-full cursor-pointer"
      key={name}
      ref={drop}
      style={{ border: isOver ? "1px dotted blue" : "" }}
      onDoubleClick={(e) => {
        if (hasClicked.current === false) {
          createTask(e, name, setTasks, td3id, td3tasks, screenSize);
        }
      }}
    >
      {td3tasks
        ? td3tasks.map((task) => (
            <Task
              hasClicked={hasClicked}
              task={task}
              key={task.id}
              td3tasks={td3tasks}
              setTasks={setTasks}
              hideShow={hideShow}
            />
          ))
        : ""}

      <h1 className="text-blue-500 names ic font-light p-2 border border-dotted border-blue-300 bg-yellow-50">
        {name}
      </h1>
    </div>
  );
};

export default Category;
