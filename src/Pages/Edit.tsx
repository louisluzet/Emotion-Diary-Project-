import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    console.log(id);


    return (
        <div>
            <h1>Edit Page</h1>
            <button onClick={() => {
                navigate('/');
            }}>Home</button>
            <button onClick={() => {
                navigate(-1);
            }}>Back</button>
        </div>
    )
}
export default Edit;