import style from "./Error.module.css"
import errorImage from "../../assets/images/error.svg"
function Error() {
    return <>
   <div className="p-15 flex justify-center items-center"><img src={errorImage} alt="" /></div>
    </>
}

export default Error
