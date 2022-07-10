import { useParams } from "react-router-dom";

const Diary = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <div>
            <h1>Diary Detail Page</h1>
        </div>
    )
}
export default Diary;