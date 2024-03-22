const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const player = require('play-sound')(); // Import the play-sound library


const app = express(); //object of express
const port = process.env.PORT || 3001;

app.use(cors()); //Enables Cross-Origin Resource Sharing.
app.use(bodyParser.json()); //Parses incoming JSON request bodies.
app.use(express.static(path.join(__dirname, 'public'))); //Serves static files from the 'public' directory.


function audioPlay(file, options, callback) {
    player.play(file, options, callback);
}

function playAudioAndAnimateServer(buttonClass) {
    console.log('Received button class:', buttonClass);
    const audioFile = path.join(__dirname, 'sounds', `drum${buttonClass}.wav`);

    // Play the audio using the 'play' backend
    player.play(audioFile, (err) => {
        if (err) {
            console.error('Error playing audio:', err);
        } else {
            console.log(`Audio for drum${buttonClass} played and animation triggered.`);
        }
    });
}

function playAudioAndAnimateServerPiano(buttonClass) {
    console.log('Received button class:', buttonClass);

    // Map piano button classes to corresponding audio file names
    const pianoSounds = {
        '1': 'C5',
        '2': 'Db5',
        '3': 'D5',
        '4': 'Eb5',
        '5': 'E5',
        '6': 'F5',
        '7': 'Gb5',
        '8': 'Ab5',
        '9': 'A5',
        '0': 'Bb5',
        '+': 'B5',
    };

    const pianoSound = pianoSounds[buttonClass];

    if (!pianoSound) {
        console.error('Invalid button class:', buttonClass);
        return;
    }

    const audioFile = path.join(__dirname, 'sounds', `${pianoSound}.mp3`);
    console.log(audioFile);
    // Play the audio using the 'play' backend
    player.play(audioFile, (err) => {
        if (err) {
            console.error('Error playing audio:', err);
        } else {
            console.log(`Audio for ${pianoSound} played and animation triggered.`);
        }
    });
}


let isAudioPlaying = false; // Track the playback state
let audioInstance; // Track the audio instance to enable stopping

function toggleAnimation(buttonId) {
    //console.log(isAudioPlaying);
    console.log(`Toggle animation for button with ID: ${buttonId}`);
    try {
        const audioFile = path.join(__dirname, 'sounds', `${buttonId}.wav`);

        // Check the playback state
        if (isAudioPlaying) {
            // If audio is playing, stop it
            audioInstance.kill();
            isAudioPlaying = false;
            console.log(`Audio for ${buttonId} stopped.`);
        } else {
            // If audio is not playing, start it with looping enabled
            audioInstance = player.play(audioFile, { loop: true, options: ['--no-interactive', '--volume', 50] }, (err) => {
                if (err) {
                    console.error('Error playing audio:', err);
                } else {
                    isAudioPlaying = true;
                    console.log(`Audio for ${buttonId} started and animation triggered.`);
                }
            });
            
        }
    } catch (error) {
        console.error('Error in toggleAnimation function:', error);
        // Send an error response
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}

//app.get() //app.put() //app.delete()
app.post('/api/playAudioAndAnimateServer', (req, res) => {
    // Handle POST requests to '/api/playAudioAndAnimateServer'

    // Extract the 'buttonClass' from the request body
    const buttonClass = req.body.buttonClass;
    playAudioAndAnimateServer(buttonClass);
    res.json({ message: 'Audio and animation triggered.' });
    //res.send() = sends to response
});

app.post('/api/playAudioAndAnimateServerPiano', (req, res) => {
    const buttonClass = req.body.buttonClass;
    playAudioAndAnimateServerPiano(buttonClass);
    res.json({ message: 'Audio and animation triggered.' });
});

app.post('/api/toggleAnimation', (req, res) => {
    const buttonId = req.body.buttonId;
    toggleAnimation(buttonId);
    res.json({ message: 'Animation toggled.' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = { audioPlay };
