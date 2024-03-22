import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';

function Home() {
    const [buttonClass, setButtonClass] = useState('');


    const playAudioAndAnimateServer = async (buttonClass) => {
        try {
          // Use the appropriate API endpoint for your requirement
          const response = await fetch('http://localhost:3001/api/playAudioAndAnimateServer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ buttonClass }),
          });
    
          setButtonClass('pressed');
          setTimeout(() => setButtonClass(''), 500);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const toggleAnimationServer = async (buttonId) => {
        try {
            const response = await fetch('http://localhost:3001/api/toggleAnimation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ buttonId }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleButtonClick = (buttonClass) => {
        playAudioAndAnimateServer(buttonClass);
    };

    const handleTrackButtonClick = (buttonId) => {
        toggleAnimationServer(buttonId);
        playBacktrack(buttonId);
    };

    const playBacktrack = (buttonId) => {
        try {
            const audioFile = `sounds/${buttonId}.wav`;
            const options = { options: ['--no-interactive', '--volume', 100, '--repeat', -1] };
            audioPlay(audioFile, options, (err) => {
                if (err) {
                    console.error('Error playing audio:', err);
                } else {
                    console.log(`Audio for ${buttonId} started and looping.`);
                }
            });
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    function numberToAlphabetic(num) {
    if (num < 1 || num > 26) {
        return "Invalid number";
    }
    return String.fromCharCode(64 + parseInt(num));
}

    const handleKeyPress = (event) => {
        const key = event.key.toUpperCase();
        if (key >= '1' && key <= '9') {
            playAudioAndAnimateServer(numberToAlphabetic(key));
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const toggleSidebar = () => {
        const sidebar = document.getElementById("sidebar");
        const content = document.getElementById("content");
        if (sidebar.style.left === "0%") {
            sidebar.style.left = "-20%";
            content.style.marginLeft = "0";
        } else {
            sidebar.style.left = "0%";
            content.style.marginLeft = "20%";
        }
    };

    const location = useLocation();


    return (
        <div className="body">
            <div className="sidebar" id="sidebar">
                <h2 className="h2">BEATS.IO</h2>
                <p className="para">Select:</p>
                <br />
                <br />
                <Link to="/piano" className="painoLink">
                    Piano
                </Link>
                <br />
                <br />
                <Link to="/Home" className="drumLink">
                    Drums
                </Link>
            </div>

            <div className="content" id="content">
                <div>
                    <div>
                        <h1 className="beatz">beats.io</h1>
                    </div>
                    <h2 className="caption">create beats effortlessly</h2>
                    <button className="sidebarButton" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
                </div>

                <div className="set-left">
                    <br /><br />
                    {/* <h1 className='hello'>Hello {location.state.id} :) Welcome to beats.io</h1> */}
                    <h1 className='drums'>Drums</h1>
                    {/* <!-- Drum buttons --> */}
                    <button className="druma" onClick={() => handleButtonClick('A')}>1</button>
                    <button className="drumb" onClick={() => handleButtonClick('B')}>2</button>
                    <button className="drumc" onClick={() => handleButtonClick('C')}>3</button>
                    <br />
                    <button className="drumd" onClick={() => handleButtonClick('D')}>4</button>
                    <button className="drume" onClick={() => handleButtonClick('E')}>5</button>
                    <button className="drumf" onClick={() => handleButtonClick('F')}>6</button>
                    <br />
                    <button className="drumg" onClick={() => handleButtonClick('G')}>7</button>
                    <button className="drumh" onClick={() => handleButtonClick('H')}>8</button>
                    <button className="drumi" onClick={() => handleButtonClick('I')}>9</button>
                </div>

                <div className="set-right">
                    <br /><br />
                    <h2 className="backing-track">Select backing track: </h2>
                    <br /><br /><br />
                    <button className="trackA" id="audioTrackA" onClick={() => handleTrackButtonClick('trackA')}>1</button>
                    <button className="trackB" id="audioTrackB" onClick={() => handleTrackButtonClick('trackB')}>2</button>
                    <button className="trackC" id="audioTrackC" onClick={() => handleTrackButtonClick('trackC')}>3</button>
                    <br/>
                    <button className="trackD" id="audioTrackD" onClick={() => handleTrackButtonClick('trackD')}>4</button>
                    <button className="trackE" id="audioTrackE" onClick={() => handleTrackButtonClick('trackE')}>5</button>
                    <button className="trackF" id="audioTrackF" onClick={() => handleTrackButtonClick('trackF')}>6</button>
                </div>
            </div>
        </div>
    );
}

export default Home;





