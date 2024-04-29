import { useState, useEffect } from "react";
import HomeSongCard from "../components/shared/HomeSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const LoggedInHomeComponent = () => {
const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/mysongs"
            );
            setSongData(response.data);
        }
            getData();
    }, []);

    return(
    <LoggedInContainer curActiveScreen="home">
             <div className="text-white" style={{ overflowX: "hidden" }}>
            <div className="text-2xl mt-5 font-semibold">Tune in, Tune out!</div>
            <div className="w-full flex flex-wrap justify-center space-x-3 h-auto ">
                {
                    songData.map((item)=>{
                        return (
                            <HomeSongCard
                                info = {item} 
                                playSound={() => {}}
                           />
                        );
                    })
                }
            </div>
        </div>
    </LoggedInContainer>
    );
}

export default LoggedInHomeComponent;





