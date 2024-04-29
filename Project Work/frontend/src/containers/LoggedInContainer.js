import {useContext, useState, useLayoutEffect, useRef} from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
import { Link } from "react-router-dom";
import TuneBud_logo from "../assets/images/TuneBud_logo.png"
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers";

// Set the volume to the loudest level
Howler.volume(1.0); 
const LoggedInContainer = ({children, curActiveScreen, playlist}) => {
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);  
    const [shuffleMode, setShuffleMode] = useState(false);
    const [repeatMode, setRepeatMode] = useState(false);

    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        // the following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong && currentSong.track]);

    useLayoutEffect(() => {                 //
      if (!isPaused && soundPlayed) {
        const timer = setInterval(() => {
          setCurrentTime(soundPlayed.seek());
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [isPaused, soundPlayed]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    };

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        sound.on('end', () => {
          setCurrentTime(0); // Reset the current time when the song ends

          if (repeatMode) {
            sound.play();
          } else {
            if (shuffleMode) {
              const randomIndex = Math.floor(Math.random() * playlist.length);
              setCurrentSong(playlist[randomIndex]);
            } else {
              const currentIndex = playlist.findIndex(
                (song) => song.track === currentSong.track
              );
              const nextIndex = (currentIndex + 1) % playlist.length;
              setCurrentSong(playlist[nextIndex]);
            }
          }
        });



        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);

    };

    const pauseSound = () => {
        soundPlayed.pause();
    };
// Function to toggle play/pause
    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };
     // Function to play the next song
     const playNextSong = () => {
        if (!playlist || !currentSong) return;
        const currentIndex = playlist.findIndex(
          (song) => song.track === currentSong.track
        );
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentSong(playlist[nextIndex]);
      };
    
      // Function to play the prev song
      const playPreviousSong = () => {
        if (!playlist || !currentSong) return;
        const currentIndex = playlist.findIndex(
          (song) => song.track === currentSong.track
        );
        const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentSong(playlist[previousIndex]);
      };

      // Function to toggle repeat mode
      const toggleRepeatMode = () => {
        setRepeatMode(!repeatMode);
    };

    // Function to toggle shuffle mode
    const toggleShuffleMode = () => {
        setShuffleMode(!shuffleMode);
    };

    // Function to format time in MM:SS format
  const formatTime = (timeInSeconds) => {       //
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


    return (
        <div className="h-full w-full bg-app-black">
            {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
                {/* This first div will be the left panel */}
                <div className="h-full w-1/5 flex flex-col justify-between pb-10" style={{ backgroundColor: '#14051E' }}>
                    <div>
                        {/* This div is for logo */}
                        <div className="logoDiv p-3">
                            <img
                                src={TuneBud_logo}
                                alt="TuneBud"
                                height={150}
                                width={250}
                                backgroundColor= "#14051E"
                            />
                        </div>
                        <div className="py-3">
                            <IconText
                                iconName={"material-symbols:home"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}
                            />
                            <IconText
                                iconName={"material-symbols:search-rounded"}
                                displayText={"Search"}
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}
                            />
                            <IconText
                                iconName={"icomoon-free:books"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={
                                    "material-symbols:library-music-sharp"
                                }
                                displayText={"My Music"}
                                targetLink="/myMusic"
                                active={curActiveScreen === "myMusic"}
                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"material-symbols:add-box"}
                                displayText={"Create Playlist"}
                                onClick={() => {
                                    setCreatePlaylistModalOpen(true);
                                }}
                            />
                            <IconText
                                iconName={"mdi:cards-heart"}
                                displayText={"Liked Songs"}
                            />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="carbon:earth-europe-africa" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>
                        </div>
                    </div>
                </div>

                {/* This second div will be the right part(main content) */}
                <div className="h-full w-4/5  overflow-auto" >
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end" style={{ backgroundColor: '#21133B' }}>
                        <div className="w-1/2 flex h-full" >
                            <div className="w-2/3 flex justify-around items-center" >
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                            <Link to="/uploadsong">
                                <TextWithHover displayText={"Upload Song"}/>
                              </Link>
                                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                <Icon icon="iconamoon:profile-bold" className="text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto" style={{ backgroundColor: '#231A33' }}>
                        {children}
                    </div>
                </div>
            </div>
            {/* This div is the current playing song */}
            {currentSong && (
                <div className="w-full h-1/10 text-white flex items-center px-4" >
                    <div className="w-1/4 flex items-center">
                        <img
                            src={currentSong.thumbnail}
                            alt="currentSongThumbail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSong.name}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSong.singer}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">

                            {/* controls for the playing song go here */}
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={toggleShuffleMode}
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={playPreviousSong}
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={playNextSong}
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={toggleRepeatMode}
                            />
                        </div>
                        {/* Progress bar */}
                        <div className="flex items-center w-2/3">
                        <input
                          type="range"
                          min={0}
                          max={currentSong.duration}
                          value={currentTime}
                          onChange={(e) => setCurrentTime(e.target.value)}
                          className="w-full mr-3"
                        />
                      <span className="text-gray-500 text-xs">
                        {formatTime(currentTime)}
                      </span>
                     </div>
                   </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInContainer;