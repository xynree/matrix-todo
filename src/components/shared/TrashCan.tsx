import { useDrop } from "react-dnd";
import { animated, useSpring } from "@react-spring/web";
import Functions from "../Functions";

const TrashCan = ({ setTasks }) => {
  const onDrop = (item) => {
    let id = item.id;
    let td3tasks = JSON.parse(window.localStorage.getItem("td3tasks"));
    Functions().delTasks(id, td3tasks, setTasks);
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  }));

  const props = useSpring({
    top: canDrop ? "-12px" : "0px",
    transform: canDrop ? "rotate(-45deg)" : "rotate(0deg)",
    left: canDrop ? "-12px" : "0px",
    config: { duration: 180 },
  });

  return (
    <div
      ref={drop}
      style={{ border: isOver ? "1px dotted red" : "0px" }}
      className="relative z-50 w-auto flex flex-col"
    >
      <animated.svg
        className="absolute"
        style={props}
        name="lid"
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="8"
        viewBox="0 0 21.73 4.61"
      >
        <polygon
          points="0.37 4.36 21.34 4.36 20.28 2.08 9.49 2.08 1.28 2.08 0.37 4.36"
          fill="white"
          stroke="#1b45c9"
          stroke-miterlimit="10"
          stroke-width="0.5"
        />
        <polygon
          points="8.12 0.26 13.59 0.41 13.59 2.08 8.12 2.08 8.12 0.26"
          fill="white"
          stroke="#1b45c9"
          stroke-miterlimit="10"
          stroke-width="0.5"
        />
      </animated.svg>

      <svg
        name="can"
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="58"
        viewBox="0 0 21.58 23.75"
      >
        <polygon
          points="0.3 0.25 4.43 23.5 16.65 23.5 21.27 0.4 0.3 0.25"
          fill="white"
          stroke="#1b45c9"
          stroke-miterlimit="10"
          stroke-width="0.5"
        />
        <line
          x1="4.86"
          y1="4.66"
          x2="6.53"
          y2="16.82"
          fill="none"
          stroke="#1b45c9"
          stroke-miterlimit="10"
          stroke-width="0.5"
        />
        <line
          x1="10.33"
          y1="4.51"
          x2="10.79"
          y2="16.51"
          fill="none"
          stroke="#1b45c9"
          stroke-miterlimit="10"
          stroke-width="0.5"
        />
        <line
          x1="15.95"
          y1="4.66"
          x2="14.58"
          y2="16.21"
          fill="none"
          stroke="#1b45c9"
          stroke-miterlimit="10"
          stroke-width="0.5"
        />
      </svg>
    </div>
  );
};

export default TrashCan;
