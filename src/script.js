function playAudioAndAnimate(buttonClass) {
    const audio = new Audio(`sounds/drum${buttonClass}.wav`);
    audio.play().then(() => {
        console.log(`Audio for drum${buttonClass} played successfully.`);
    }).catch(error => {
        console.error(`Error playing audio for drum${buttonClass}:`, error);
    });

    triggerAnimation(`drum${buttonClass}`);
}

// Function to trigger animation
function triggerAnimation(buttonClass) {
    const drumButton = document.querySelector(`.${buttonClass}`);
    if (drumButton) {
        drumButton.classList.add('pressed');
        setTimeout(() => {
            drumButton.classList.remove('pressed');
        }, 100);
    }
}


function numberToAlphabetic(num) {
    if (num < 1 || num > 26) {
        return "Invalid number";
    }
    return String.fromCharCode(64 + parseInt(num));
}

// Event listener for keypress from '1' to '9'
document.addEventListener('keydown', event => {
    const key = event.key;
    if (key >= '1' && key <= '9') {
        playAudioAndAnimate(key); // Play audio and trigger animation for druma to drumi
    }
});


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired.');
    const drumButtons = document.querySelectorAll('[class^="drum"]');
    for (i in drumButtons)
        print(i)
    drumButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault(); // Prevent the default behavior
            const buttonClass = event.target.classList[0].slice(-1);
            console.log('Drum button clicked:', buttonClass);
            playAudioAndAnimate(buttonClass);
        });
    });
    const trackButtons = document.querySelectorAll('[class^="track"]');
    trackButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior
            console.log('Track button clicked:', button.id);
            toggleAnimation(button);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired.');
    const trackButtons = document.querySelectorAll('[class^="track"]');

    trackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = button.id; // Get the button ID (should be the same as the audio element ID)
            const audioElement = document.getElementById(audioId);

            if (!audioElement) {
                console.error('Audio element not found for button:', button);
                return;
            }

            if (audioElement.paused) {
                audioElement.play().catch(error => console.error('Error playing audio:', error));
            } else {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        });
    });
});

function toggleAnimation(button) {
    button.classList.toggle('pressedA'); // Toggle the 'pressedA' class

    if (button.classList.contains('pressedA')) {
        // Add animation properties when the class is present
        button.style.backgroundImage = "url(https://i.kym-cdn.com/photos/images/original/000/945/952/283.gif)";
        button.style.backgroundPosition = "center";
    } else {
        // Reset styles when the class is not present
        button.style.backgroundImage = "";
    }
}
