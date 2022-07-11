type buttonProp = {
  text: string;
  type: string;
  onClick: any;
};
const MyButton = ({ text, type, onClick }: buttonProp) => {
    const btnType = ['positive', 'negative', 'head'].includes(type) ? type: 'default';
  return (
    <button
      className={["MyButton", `MyButton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
