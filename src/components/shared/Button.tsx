interface ButtonProps {
  className: string;
  style?: any;
  type?: any;
  runFunction?: any;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  className,
  style,
  runFunction,
  text,
  type,
}) => (
  <button
    type={type ? type : "button"}
    className={className}
    style={style ? style : {}}
    onClick={runFunction ? runFunction : {}}
  >
    {text}
  </button>
);

export default Button;
