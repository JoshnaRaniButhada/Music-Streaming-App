import {useContext} from "react";
import songContext from "../../contexts/songContext";

const HomeSongCard = ({info, playSound}) => {
    const {setCurrentSong} = useContext(songContext);
    
    return (
        <div
            className="w-1/5 p-4 flex justify-between"
            onClick={() => {
                setCurrentSong(info);
            }}
        >
            <div className="p-7 hover:bg-gray-800 mt-10 rounded-lg " style={{ backgroundColor: '#403653' }}>
                <div className=" bg-cover bg-center rounded-xl " 
                style={{
                    backgroundImage: `url("${info.thumbnail}")`,
                    width: "150px",
                    height: "180px",
                
                }}
                >
                </div>
                <div className="text-white hover:text-blue-200 text-center text-sm py-2"
                    style={{
                        width: "150px",
                        height: "30px",
                    }}
                >
                    {info.name}
                </div>

            </div>

        </div> 
    );
};
   


export default HomeSongCard;
