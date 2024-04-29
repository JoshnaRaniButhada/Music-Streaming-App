import { useState } from "react";
import {Icon} from "@iconify/react";
import TuneBud_logo from "../assets/images/TuneBud_logo.png"
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";



const UploadSong = () => {
    const [name, setName] = useState("")
    const [singer, setSinger] = useState("")
    const [duration, setDuration] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [playlistUrl, setPlaylistUrl] = useState("")
    const [uploadedSongFileName, setUploadedSongFileName] = useState()

    const navigate = useNavigate();

    const submitSong = async() => {
        const data = {name, singer, duration, thumbnail, track: playlistUrl}
        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data
        );
        if(response.err){
            alert("Could not upload!");
            return;
        };
        alert("Song Uploaded");
        navigate("/home")
    }

    return (
        <div className='h-full w-full flex'>
            {/* This is for the left side panel */}
            
            <div className="h-full w-1/5 flex flex-col justify-between pb-14" style={{ backgroundColor: '#14051E' }}>
            <div>
                <div className='logoDiv p-6'>
                    <img 
                        src={TuneBud_logo} 
                        alt="TuneBud_logo" 
                        width={100} 
                    />
                </div>

             {/*  home  */}
               <div><IconText 
                    iconName={"material-symbols:home"}
                    displayText={"Home"}
                    
               />
               

             {/*  search  */}
                <IconText 
                    iconName={"material-symbols:search"}
                    displayText={"Search"}
               />
               

             {/*  library  */}
                <IconText 
                    iconName={"icomoon-free:books"}
                    displayText={"Your Library"}
               />
             {/*  My Music  */}
                <IconText 
                    iconName={"material-symbols:library-music-sharp"}
                    displayText={"My Music"}
               />   
               </div>


               <div className="pt-5">
    
               {/*  Create Playlist  */}
                <IconText 
                    iconName={"material-symbols:add-box"}
                    displayText={"Create Playlist"}
               />
               </div>

            {/*  Liked Songs  */}
            <div><IconText 
                    iconName={"mdi:cards-heart"}
                    displayText={"Liked songs"}
               />
               </div>
            </div>

              { /*  Language  */}
              <div className="px-5">
                    <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
            </div>



        {/* This is for the right main panel */}
            
            {/* Navbar */}
            <div className="h-full w-4/5 bg-app-black overflow-auto">
                <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                <div className="w-1/2 flex h-full">
                    <div className="w-2/3 flex justify-around items-center">
                    <TextWithHover displayText={"Premium"} />
                    <TextWithHover displayText={"Support"} />
                    <TextWithHover displayText={"Download"} />
                    <div className="h-1/2 border-r border-white"></div>
                    </div>
                    
                    <div className="1/3 flex justify-around items-center h-full ">
                         <TextWithHover displayText={"Upload Song"} active />
                    
                    <div className="mx-5 bg-white h-10 w-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                    <Icon icon="iconamoon:profile-bold" className="text-2xl "/>
                    </div>
                    </div>
                </div>
                </div>

                 {/* Upload Songs */}
                <div className="content p-8 pt-0 overflow-auto ">
                    <div className="text-3xl font-semibold mb-5 text-white mt-20  flex justify-center">
                        Upload Your Music
                    </div>
                    <div className="w-full flex space-x-3 ">
                        <div className="w-1/3">
                            <TextInput 
                                label="Name" 
                                labelClassName={"text-white"}
                                placeholder="Name"
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-1/3">
                            <TextInput 
                                label="Singer(s)" 
                                labelClassName={"text-white"}
                                placeholder="Singer(s)"
                                value={singer}
                                setValue={setSinger}
                            />
                        </div>

                       
                        <div className="w-1/3">
                            <TextInput 
                                label="Duration"
                                labelClassName={"text-white"}
                                placeholder="duration"
                                value={duration}
                                setValue={setDuration}
                                
                            />
                        </div>
                    </div>
                    <div className="w-full grid place-items-center">
                        <div className="bg-white text-black rounded-md w-1/2  py-1 mt-10 font-semibold">
                            <TextInput 
                                label="Thumbnail"
                                labelClassName={"text-white"}
                                placeholder="Thumbnail"
                                value={thumbnail}
                                setValue={setThumbnail} 
                            />
                        </div>
                    </div>

                    <div className="py-5">
                        {uploadedSongFileName ? (
                            <div className="bg-white rounded-full p-3 w-1/3">
                                {uploadedSongFileName.substring(0,30)}...
                            </div>
                        )  : (

                        <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFileName}/> 
                        )}
                        
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="bg-white w-40 grid place-items-center p-3 rounded-full cursor-pointer font-semibold" onClick={submitSong}>
                            Submit Song
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        
    );
};




export default UploadSong;