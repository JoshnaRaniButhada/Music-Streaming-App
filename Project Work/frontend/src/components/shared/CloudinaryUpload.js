import {openUploadWidget} from "../../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../config";


const CloudinaryUpload = ({setUrl, setName}) => {                  
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "drj0an0on",
                uploadPreset: cloudinary_upload_preset,
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <div  className="w-full grid place-items-center">
        <button
            className="bg-white text-black rounded-md w-1/2  py-1 mt-10 font-semibold"
            onClick={uploadImageWidget}
        >
            Select Track
        </button>
        </div>
    );
};

export default CloudinaryUpload;