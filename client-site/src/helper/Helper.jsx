import toast from "react-hot-toast";

class Helper{
    static companyName="Ward Store";
    static companyLogo="https://worldacademy.uk.com/image/logo/27242.png";

    static SuccessToast(msg){
        toast.success(msg);
    }

    static ErrorToast(msg){
        toast.success(msg);
    }
    static isEmptyValue(value){
        if(value.length===0){
            return true;
        }
        else {
            return false
        }

    }
}
export default Helper