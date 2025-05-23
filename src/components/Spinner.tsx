import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => {
    return (
        <div>
            <h1>Creating <span className="animate-spin"><AiOutlineLoading3Quarters /></span></h1>
        </div>
    );
};

export default Spinner;