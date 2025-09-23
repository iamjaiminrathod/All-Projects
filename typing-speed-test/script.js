document.addEventListener('DOMContentLoaded', () => {
            const paragraphs = [
                "The quick brown fox jumps over the lazy dog. A journey of a thousand miles begins with a single step. To be or not to be, that is the question. The early bird catches the worm.",
                "Programming is the art of telling a computer what to do. It involves logic, creativity, and problem-solving. Debugging a tricky problem can be both frustrating and incredibly rewarding.",
                "In a world where information is abundant, the ability to discern fact from fiction is more crucial than ever before. Critical thinking is a skill that must be practiced.",
                "Technology has revolutionized the way we live and work, but it also presents new challenges. Finding a balance between the digital and physical worlds is important for well-being.",
                "The sun rose over the quiet town, casting a golden light on the rooftops. A gentle breeze rustled the leaves, and the day began with a sense of calm and anticipation.",
                "Creativity is intelligence having fun. Imagination is the beginning of creation. You imagine what you desire, you will what you imagine, and at last, you create what you will.",
                "The universe is a vast and mysterious place, full of wonders yet to be discovered. From the smallest atom to the largest galaxy, everything is interconnected in a complex cosmic dance."
            ];

            const textDisplay = document.getElementById('text-display');
            const inputArea = document.getElementById('input-area');
            const startBtn = document.getElementById('start-btn');
            const resetBtn = document.getElementById('reset-btn');
            const stats = document.getElementById('stats');
            const wpmSpan = document.getElementById('wpm');
            const accuracySpan = document.getElementById('accuracy');
            const timerSpan = document.getElementById('timer');

            let timer = null;
            let startTime = null;
            let currentParagraph = '';
            let charactersTyped = 0;

            const setupTest = () => {
                inputArea.disabled = true;
                inputArea.value = '';
                stats.classList.add('hidden', 'opacity-0');
                textDisplay.innerHTML = '<span class="text-gray-400">Click "Start Test" to begin...</span>';
                startBtn.classList.remove('hidden');
                resetBtn.classList.add('hidden');
                wpmSpan.textContent = '0';
                accuracySpan.textContent = '0%';
                timerSpan.textContent = '0s';
                resetState();
            };

            const resetState = () => {
                clearInterval(timer);
                timer = null;
                startTime = null;
                charactersTyped = 0;
            };

            const startTest = () => {
                resetState();
                const randomIndex = Math.floor(Math.random() * paragraphs.length);
                currentParagraph = paragraphs[randomIndex];
                textDisplay.innerHTML = '';
                currentParagraph.split(' ').forEach(word => {
                    const wordSpan = document.createElement('span');
                    wordSpan.textContent = word + ' ';
                    wordSpan.className = 'word inline-block';
                    textDisplay.appendChild(wordSpan);
                });

                inputArea.disabled = false;
                inputArea.focus();
                
                startBtn.classList.add('hidden');
                resetBtn.classList.remove('hidden');
                stats.classList.remove('hidden', 'opacity-0');
                stats.classList.add('flex', 'opacity-100');
            };

            const endTest = () => {
                clearInterval(timer);
                const totalTimeInSeconds = (new Date() - startTime) / 1000;
                
                const typedWords = inputArea.value.trim().split(/\s+/);
                const originalWords = currentParagraph.trim().split(/\s+/);
                
                let correctCharacters = 0;
                let correctWords = 0;
                
                originalWords.forEach((word, index) => {
                    const typedWord = typedWords[index] || '';
                    if (word === typedWord) {
                        correctWords++;
                        correctCharacters += typedWord.length + 1; // +1 for space
                    } else {
                        // Calculate correct characters for partial match
                        for (let i = 0; i < Math.min(word.length, typedWord.length); i++) {
                            if (word[i] === typedWord[i]) {
                                correctCharacters++;
                            }
                        }
                    }
                });

                const wpm = Math.round((correctWords / totalTimeInSeconds) * 60);
                const accuracy = Math.round((correctCharacters / charactersTyped) * 100) || 0;
                
                wpmSpan.textContent = wpm;
                accuracySpan.textContent = `${accuracy}%`;
                
                inputArea.disabled = true;
                startBtn.textContent = 'Restart';
            };

            inputArea.addEventListener('input', (event) => {
                if (!startTime) {
                    startTime = new Date();
                    timer = setInterval(() => {
                        const totalTimeInSeconds = Math.round((new Date() - startTime) / 1000);
                        timerSpan.textContent = `${totalTimeInSeconds}s`;
                    }, 1000);
                }

                charactersTyped = event.target.value.length;
                const typedText = event.target.value;
                const typedWords = typedText.split(' ');
                
                const wordsSpans = textDisplay.querySelectorAll('.word');
                wordsSpans.forEach((wordSpan, wordIndex) => {
                    const typedWord = typedWords[wordIndex] || '';
                    const originalWord = wordSpan.textContent.trim();
                    const isLastWord = wordIndex === wordsSpans.length - 1;

                    // Update character colors
                    wordSpan.innerHTML = '';
                    for (let i = 0; i < originalWord.length; i++) {
                        const charSpan = document.createElement('span');
                        charSpan.textContent = originalWord[i];
                        if (typedWord.length > i) {
                            charSpan.className = typedWord[i] === originalWord[i] ? 'text-green-600' : 'text-red-600';
                        }
                        wordSpan.appendChild(charSpan);
                    }
                    // Add space
                    const spaceSpan = document.createElement('span');
                    spaceSpan.textContent = ' ';
                    wordSpan.appendChild(spaceSpan);

                    // Underline for current word
                    if (wordIndex === typedWords.length - 1 && !isLastWord) {
                        wordSpan.style.textDecoration = 'underline';
                        wordSpan.style.textDecorationColor = '#3b82f6';
                    } else {
                        wordSpan.style.textDecoration = 'none';
                    }
                });

                // End of test logic
                const allWordsTyped = typedWords.length === wordsSpans.length && typedText.endsWith(' ');
                if (allWordsTyped) {
                    endTest();
                }
            });

            startBtn.addEventListener('click', startTest);
            resetBtn.addEventListener('click', startTest);

            setupTest();
        });
