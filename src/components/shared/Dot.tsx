const Dot = ({ fill, task }) => {
  return (
    <svg
      className="text-3xl text-blue-900 monospace fixed cursor-move"
      style={{
        left: `${task.x}px`,
        top: `${task.y}px`,
      }}
      width="9px"
      height="9px"
    >
      <path
        fillRule="evenodd"
        fill={fill}
        d="M1.0,0.0 L1.0,1.0 L0.0,1.0 L0.0,3.999 L1.0,3.999 L1.0,5.0 L3.999,5.0 L3.999,3.999 L5.0,3.999 L5.0,1.0 L3.999,1.0 L3.999,0.0 L1.0,0.0 Z"
      />
    </svg>
  );
};

export default Dot;
