import { useState, useRef, useEffect } from "react";
import Category from "./components/Category";
import Functions from "./components/Functions";
import Button from "./components/shared/Button";
import TrashCan from "./components/shared/TrashCan";
import { useWindowSize } from "react-use";

const App = () => {
  console.log("\n\npage refreshed\n\n\n");
  const [td3tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("td3tasks")) || []
  );
  const td3id = useRef(parseInt(localStorage.getItem("td3id")) || 0);
  const [hideShow, setHideShow] = useState("visible");
  const [screenSize, setScreenSize] = useState(useWindowSize());

  const { setStorage, resetStorage, goHideShow, rmTasks, taskResize } =
    Functions();

  const quadrants = [
    "Urgent/Important",
    "Not Urgent/Important",
    "Urgent/Not Important",
    "Not Urgent/Not Important",
  ];

  useEffect(() => {

    if (td3tasks) {
      rmTasks(td3tasks, setTasks);
      taskResize(screenSize, setScreenSize, setTasks);
      setStorage(td3tasks, td3id, screenSize);
    }
  }, [
    setStorage,
    td3tasks,
    td3id,
    setTasks,
    rmTasks,
    screenSize,
    taskResize,
    setScreenSize,
  ]);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-56 justify-center align-center h-full">
        <div className="p-3 w-full h-full flex flex-col space-between bg-yellow-50 m-auto">
          <div className="h-full gap-5 left-0 text-blue-800 right-0 m-auto">
            <div className="bg-white inconsolata border border-dotted border-blue-400 p-7 m-3 h-30 font-medium tracking-wider text-2xl text-center  text-blue-800 w-auto">
              Matrix To-Do
            </div>
            <div className="inconsolata border border-dotted border-blue-400 p-10 m-3 h-30 font-light text-md text-center align-center   w-auto">
              Plot out your tasks in order of <b>necessity</b> and{" "}
              <b>urgency</b> - <br />
              <br />
              Based on the <b>Eisenhower Matrix</b>.
            </div>
            <Button
              className="border border-blue-400 border-dotted font-xs font-light inconsolata block m-auto mt-6 bg-white shadow-sm w-4/5 p-2"
              runFunction={() => resetStorage(setTasks, td3id)}
              text="Reset"
            />
            <Button
              className=" top-12  border z-50 border-blue-400 border-dotted font-light inconsolata font-xs bg-white p-2 shadow-sm w-4/5 text-center block m-auto mt-3 "
              runFunction={() => goHideShow(hideShow, setHideShow)}
              text={hideShow === "visible" ? "Hide" : "Show"}
            />
          </div>
          <div className="m-auto p-4">
            <TrashCan setTasks={setTasks} />
          </div>
        </div>
      </div>
      <div
        style={{ width: screenSize.width, height: screenSize.height }}
        className="text-center w-full h-full  p-5 justify-center align-center bg-blue-300"
      >
        <div className="flex w-full h-full shadow-lg left-0 right-0 top-0 bottom-0 justify-center m-auto   divide-x-2 divide-blue-800 divide-dotted border-blue-600 bg-gray-50">
          <div className="flex w-full flex-col divide-y-2  divide-blue-800 divide-dotted ">
            <Category
              name={quadrants[0]}
              setTasks={setTasks}
              td3id={td3id}
              td3tasks={td3tasks}
              hideShow={hideShow}
              screenSize={screenSize}
            />
            <Category
              name={quadrants[1]}
              setTasks={setTasks}
              td3id={td3id}
              td3tasks={td3tasks}
              hideShow={hideShow}
              screenSize={screenSize}
            />
          </div>
          <div className="w-full flex  flex-col divide-y-2 divide-blue-800 divide-dotted">
            <Category
              name={quadrants[2]}
              setTasks={setTasks}
              td3id={td3id}
              td3tasks={td3tasks}
              hideShow={hideShow}
              screenSize={screenSize}
            />
            <Category
              name={quadrants[3]}
              setTasks={setTasks}
              td3id={td3id}
              td3tasks={td3tasks}
              hideShow={hideShow}
              screenSize={screenSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
