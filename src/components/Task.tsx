import { useState } from "react";
import { useDrag } from "react-dnd";
import Functions from "./Functions";
import Dot from "./shared/Dot";
import Button from "./shared/Button";
import { hideShow, setTasks, task, td3tasks } from "./Types";

interface TaskProps {
  task: task;
  td3tasks: td3tasks;
  setTasks: setTasks;
  hideShow: hideShow;
  hasClicked: any;
}

const Task: React.FC<TaskProps> = ({
  task,
  td3tasks,
  setTasks,
  hideShow,
  hasClicked,
}) => {
  const { editTask, setFillColor, delTasks } = Functions();
  const [adjusted, setAdjusted] = useState(task);

  const updateTask = (e) => {
    setAdjusted({...adjusted, title: e.target.value});
  };

  const fill = setFillColor(task.quadrant);

  const [{ isDragging}, drag, dragPreview] = useDrag(() => ({
    type: "task",
    item: {
      id: task.id,
      quadrant: task.quadrant,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  const adjustEdit = (task, setTasks, td3tasks) => {
    let newTasks = td3tasks.map((item) => {
      if (task.id === item.id) {
        item.editing = true;
        return item;
      } else return item;
    });
    setTasks(newTasks);
  };

  return (
    <div>
      {task.editing ? (
        <form
          onSubmit={() => editTask(adjusted, setTasks, hasClicked, td3tasks)}
        >
          <div
            className=" z-50 h-10 w-32 absolute m-2 font-mono text-xs flex-col text-left"
            style={{ left: `${task.x}px`, top: `${task.y}px` }}
          >
            <input
              type="text"
              onChange={updateTask}
              className="p-2 bg-gray-50 focus:outline-white  border z-50 text-blue-800 border-blue-800 bg-transparent mb-1"
            />

            <Button
              type="submit"
              runFunction={(e) =>
                editTask(adjusted, setTasks, hasClicked, td3tasks)
              }
              className="border bg-white p-1 pl-2 pr-2 text-xs z-50 border-blue-500 mt-2"
              text={task.title === 'Enter Title' ? "new" : "update"}
              style={{ fontSize: "10.5px" }}
            />

            <Button
              type="submit"
              className="border p-1 pl-2 pr-2 bg-white ml-1  border-blue-500 mt-2"
              runFunction={() => delTasks(task.id, td3tasks, setTasks)}
              text="delete"
              style={{ fontSize: "10.5px" }}
            />
          </div>
        </form>
      ) : (
        ""
      )}
      <div ref={drag}>
        <div>
          <Dot fill={fill} task={task} />
          <button
            ref={dragPreview}
            type="button"
            className={`absolute text-xs ${hideShow} cursor-click text-blue-800 z-50 p-2 0 w-auto h-auto`}
            onDoubleClick={() => {
              hasClicked.current = true;
              adjustEdit(task, setTasks, td3tasks);
            }}
            style={{
              left: `${task.x + 12.5}px`,
              top: `${task.y + 13}px`,
              border: isDragging ? "1px dotted red" : "",
              opacity: isDragging ? "50%" : "",
            }}
          >
            {!task.editing ? task.title : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
