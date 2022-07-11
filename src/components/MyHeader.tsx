type headerProp = {
    headText: string,
    leftChild: any,
    rightChild: any
}
const MyHeader = ({headText, leftChild, rightChild}: headerProp) => {
    return (
        <header>
            <div className="head_btn_left">
                {leftChild}
            </div>
            <div className="head_text">
                {headText}
            </div>
            <div className="head_btn_right">
                {rightChild}
            </div>
        </header>
    )
}
export default MyHeader;