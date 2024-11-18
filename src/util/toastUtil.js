import { toast } from "react-toastify";

const getSuccessToast = message => {
    return toast(message, { type: "success" });
};

const getErrorToast = message => {
    return toast(message, { type: "error" });
};

const toastUtil = {
    getSuccessToast,
    getErrorToast,
};

export default toastUtil;
