import {
  editTask,
  hideShow,
  setHideShow,
  setStorage,
  setTasks,
  task,
  td3id,
  td3tasks,
} from "./Types";
import "./Types.d.ts";

const Functions = () => {
  const rotateOnOff = (setRotate, rotate) => {
    setRotate(!rotate);
  };

  const setStorage: setStorage = (td3tasks, td3id, screenSize) => {
    window.localStorage &&
      window.localStorage.setItem("td3tasks", JSON.stringify(td3tasks));
    window.localStorage &&
      window.localStorage.setItem("td3id", JSON.stringify(td3id.current));
    window.localStorage &&
      window.localStorage.setItem("screenSize", JSON.stringify(td3id.current));
  };

  const taskResize = (screenSize, setScreenSize, setTasks) => {
    let parseTasks = JSON.parse(window.localStorage.getItem("td3tasks"));
    // console.log(parseTasks);
    if (parseTasks) {
      if (
        screenSize.width !== window.innerWidth ||
        screenSize.height !== window.innerHeight
      ) {
        parseTasks.forEach((task) => {
          let oldSizeX = task.screenSize[0];
          let oldSizeY = task.screenSize[1];
          let oldTaskX = task.x;
          let oldTaskY = task.y;

          if (
            oldSizeX === window.innerWidth &&
            oldSizeY === window.innerHeight
          ) {
            // console.log("they are the same size", oldSizeX, window.innerWidth);
            return;
          } else {
            task.x = Math.round(
              ((oldTaskX - 230) / (oldSizeX - 230)) *
                (window.innerWidth - 230) +
                230
            );

            task.y = Math.round(
              ((oldTaskY - 20) / (oldSizeY - 20)) * (window.innerHeight - 20) +
                20
            );

            task.screenSize[0] = window.innerWidth;
            task.screenSize[1] = window.innerHeight;
          }
        });
        setTasks(parseTasks);
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      }
    }
  };
  const resetStorage = (setTasks: setTasks, td3id: td3id) => {
    // console.log("storage reset");

    td3id.current = 0;
    setTasks([]);

    window.localStorage && window.localStorage.setItem("td3tasks", "[]");
    window.localStorage && window.localStorage.setItem("td3id", "0");
  };

  const incrementID = (td3id: td3id) => {
    td3id.current++;
    localStorage.setItem("td3id", JSON.stringify(td3id.current));
  };

  const goHideShow = (hideShow: hideShow, setHideShow: setHideShow) => {
    // console.log("hideshow run!");
    if (hideShow === "visible") {
      setHideShow("hidden");
    } else setHideShow("visible");
    return hideShow;
  };

  const editTask: editTask = (
    adjusted: task,
    setTasks: setTasks,
    hasClicked: any,
    td3tasks
  ) => {
    console.log(td3tasks);
    let newTasks = td3tasks.map((task) => {
      if (task.id === adjusted.id) {
        task.title = adjusted.title;
        task.editing = false;
      }
      return task;
    });
    setTasks(newTasks);
    hasClicked.current = false;
  };

  const findQuad = (name) => {
    let quad;
    switch (name) {
      case "Urgent/Important":
        quad = 1;
        break;
      case "Not Urgent/Important":
        quad = 2;
        break;
      case "Urgent/Not Important":
        quad = 3;
        break;
      case "Not Urgent/Not Important":
        quad = 4;
        break;
      default:
        break;
    }
    return quad;
  };

  const createTask = (
    e,
    name: string,
    setTasks: setTasks,
    td3id: td3id,
    td3tasks: td3tasks,
    screenSize: any
  ) => {
    incrementID(td3id);

    let newTask = {
      id: td3id.current,
      screenSize: [screenSize.width, screenSize.height],
      x: e.pageX,
      y: e.pageY,
      title: "",
      description: "",
      created: e.timeStamp,
      quadrant: findQuad(name),
      editing: true,
    };

    setTasks([...td3tasks, newTask]);

    // console.log("create Task was run", newTask);
  };

  const updateTask = (e, adjusted: task, setAdjusted: any) => {
    adjusted.title = e.target.value;
    setAdjusted(adjusted);
  };

  const setFillColor = (quadrant: number) => {
    let fillColor;
    switch (quadrant) {
      case 1:
        fillColor = " #ff1700 ";
        break;
      case 2:
        fillColor = " #d6d600 ";
        break;
      case 3:
        fillColor = " #f59c00 ";
        break;
      case 4:
        fillColor = " #b2dab0 ";
        break;
    }

    return fillColor;
  };

  const rmTasks = (td3tasks: td3tasks, setTasks: setTasks) => {
    // console.log('Rm Tasks Run!')

    let taskCounter = 0;
    let newTasks = td3tasks;
    let delID = [];

    // console.log(td3tasks.length, (td3tasks.length > 1))

    if (td3tasks.length > 1) {
      td3tasks.forEach((task) => {
        if (task.title === "") {
          taskCounter++;
          if (taskCounter > 0) {
            delID.push(task.id);
          }
        }
      });

      delID.forEach((id, index) => {
        if (index !== delID.length - 1) {
          newTasks = newTasks.filter((task) => task.id !== id);
        }
      });

      taskCounter = 0;
      setTasks(newTasks);
    }
  };

  const delTasks = (id: number, td3tasks: td3tasks, setTasks: setTasks) => {
    let updatedTasks = td3tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return {
    setStorage: setStorage,
    resetStorage: resetStorage,
    incrementID: incrementID,
    goHideShow: goHideShow,
    createTask: createTask,
    editTask: editTask,
    updateTask: updateTask,
    setFillColor: setFillColor,
    rmTasks: rmTasks,
    delTasks: delTasks,
    taskResize: taskResize,
    findQuad: findQuad,
    rotateOnOff: rotateOnOff,
  };
};

export default Functions;
