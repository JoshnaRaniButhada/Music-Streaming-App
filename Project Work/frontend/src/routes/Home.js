import {Icon} from "@iconify/react";
import { Link } from "react-router-dom";
import TuneBud_logo from "../assets/images/TuneBud_logo.png"
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";



const focusData = [{
    title:"Peaceful Piano",
    description:"Relax and indulge with beautiful piano.", 
    imgUrl:"https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6"
}, {
    title:"Deep Focus",
    description:"Keep calm and focus with ambient and post-rock music.",
    imgUrl:"https://i.scdn.co/image/ab67706f000000035551996f500ba876bda73fa5"
}, {
    title:"Instrumental Study",
    description:"Focus with soft study music in the background.", 
    imgUrl:"https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c"
}, {
    title:"Focus Flow", 
    description:"Uptempo instrumental hip hop beats.",
    imgUrl:"https://i.scdn.co/image/ab67706f00000003724554ed6bed6f051d9b0bfc"
}, {
    title:"Beats to think to", 
    description:"Focus with deep techno and tech house.", 
    imgUrl:"https://i.scdn.co/image/ab67706f0000000396e08a91ef3c7a6e7bfaa9a6"
}];

const spotifyPlaylistData = [{
    title:"Peaceful Piano",
    description:"Relax and indulge with beautiful piano.", 
    imgUrl:"https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6"
}, {
    title:"Deep Focus",
    description:"Keep calm and focus with ambient and post-rock music.",
    imgUrl:"https://i.scdn.co/image/ab67706f000000035551996f500ba876bda73fa5"
}, {
    title:"Instrumental Study",
    description:"Focus with soft study music in the background.", 
    imgUrl:"https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c"
}, {
    title:"Focus Flow", 
    description:"Uptempo instrumental hip hop beats.",
    imgUrl:"https://i.scdn.co/image/ab67706f00000003724554ed6bed6f051d9b0bfc"
}, {
    title:"Beats to think to", 
    description:"Focus with deep techno and tech house.", 
    imgUrl:"https://i.scdn.co/image/ab67706f0000000396e08a91ef3c7a6e7bfaa9a6"
}];


const soundsOfIndiaData = [{
    title:"Peaceful Piano",
    description:"Relax and indulge with beautiful piano.", 
    imgUrl:"https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6"
}, {
    title:"Deep Focus",
    description:"Keep calm and focus with ambient and post-rock music.",
    imgUrl:"https://i.scdn.co/image/ab67706f000000035551996f500ba876bda73fa5"
}, {
    title:"Instrumental Study",
    description:"Focus with soft study music in the background.", 
    imgUrl:"https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c"
}, {
    title:"Focus Flow", 
    description:"Uptempo instrumental hip hop beats.",
    imgUrl:"https://i.scdn.co/image/ab67706f00000003724554ed6bed6f051d9b0bfc"
}, {
    title:"Beats to think to", 
    description:"Focus with deep techno and tech house.", 
    imgUrl:"https://i.scdn.co/image/ab67706f0000000396e08a91ef3c7a6e7bfaa9a6"
}];



const HomeComponent = () => {
    return (
        <div className='h-full w-full flex'>
            {/* This is for the left side panel */}
            
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-14"
                style={{
                    backgroundColor: "#14051E"
                }}
                
            >
            <div>
                <div className='logoDiv p-5'>
                    <img src={TuneBud_logo} 
                    alt="TuneBud" 
                    width={150}
                    height={250} />
                </div>

             {/*  home  */}
               <div><IconText 
                    iconName={"material-symbols:home"}
                    displayText={"Home"}
                    active
               />
               </div>

             {/*  search  */}
               <div><IconText 
                    iconName={"material-symbols:search"}
                    displayText={"Search"}
                    targetLink="/search"
               />
               </div>

             {/*  library  */}
             <div><IconText 
                    iconName={"icomoon-free:books"}
                    displayText={"Your Library"}
                    targetLink="/library"
               />
               </div>

               
            {/*   MyMusic  */}

               <div className="pt-5">
               <IconText
                    iconName={"material-symbols:library-music-sharp"}
                    displayText={"My Music"}
                    targetLink="/myMusic"
                    
                 />
                {/*  Create Playlist  */}
                <IconText 
                    iconName={"material-symbols:add-box"}
                    displayText={"Create Playlist"}
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
            <div className="h-full w-4/5  overflow-auto">
                <div className="navbar w-full h-1/10  flex items-center justify-end" style={{ backgroundColor: '#21133B' }}>
                <div className="w-1/2 flex h-full">
                    <div className="w-3/5 flex justify-around items-center">
                    <TextWithHover displayText={"Premium"} />
                    <TextWithHover displayText={"Support"} />
                    <TextWithHover displayText={"Download"} />
                    <div className="h-1/2 border-r border-white"></div>
                    </div>
                    
                    <div className="w-2/5 flex justify-around items-center h-full">

                    <Link to="/signup">
                        <TextWithHover displayText={"Sign Up"}/>
                    </Link>
                    <div className=" ml-10 bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                        <Link to="/login" className="text-black">Log in</Link>
                    </div>
                    </div>
                </div>
                </div>

                 {/* Playlist/Albums/Songs in the home page */}
                <div className="content p-8 pt-0 overflow-auto" style={{ backgroundColor: '#231A33' }}>

                    <PlaylistView titleText="Focus" cardsData={focusData}/>
                    <PlaylistView titleText="TuneBud Playlists" cardsData={spotifyPlaylistData}/>
                    <PlaylistView titleText="Sound of India" cardsData={soundsOfIndiaData}/>
                </div>
            
            </div>
        </div>
        
    );
};


//Home Page View

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
           
            <div className="w-full flex justify-between space-x-4">

            {
                cardsData.map((item) => {
                    return (
                        <Card 
                        title={item.title}
                        description={item.description}
                        imgUrl={item.imgUrl}
                        />
                    )
                })
            }
                
            </div>
        </div>
    );
};


//Card Components
const Card = ({title, description, imgUrl}) => {
    return (
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="py-4">
                <img className="w-full rounded-md"
                src={imgUrl}
                alt="label"
                />
            </div>
            <div className="text-white text-center font-semibold">{title}</div>
            <div className="text-gray-500 text-xs text-center">{description}</div>
        </div>
    );
};


export default HomeComponent;