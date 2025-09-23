const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        const startButton = document.getElementById('start-button');
        const gameOverMessage = document.getElementById('game-over-message');
        const mobileControls = document.querySelector('.mobile-controls');

        const gridSize = 20;
        const canvasSize = 400;
        canvas.width = canvas.height = canvasSize;

        let snake, food, score, direction, gameLoop, isPaused;

        function initializeGame() {
            snake = [{ x: 10, y: 10 }];
            food = {};
            score = 0;
            direction = 'right';
            isPaused = false;
            scoreElement.textContent = score;
            gameOverMessage.style.display = 'none';
            placeFood();
        }

        function placeFood() {
            const randomX = Math.floor(Math.random() * (canvasSize / gridSize));
            const randomY = Math.floor(Math.random() * (canvasSize / gridSize));
            food = { x: randomX, y: randomY };
        }

        function draw() {
            // Clear the canvas
            ctx.fillStyle = '#34495e';
            ctx.fillRect(0, 0, canvasSize, canvasSize);

            // Draw the snake
            ctx.fillStyle = '#27ae60';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
                ctx.strokeStyle = '#2c3e50';
                ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            });

            // Draw the food
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        function update() {
            if (isPaused) return;

            const head = { x: snake[0].x, y: snake[0].y };

            switch (direction) {
                case 'up': head.y--; break;
                case 'down': head.y++; break;
                case 'left': head.x--; break;
                case 'right': head.x++; break;
            }

            // Collision detection with walls
            if (head.x < 0 || head.x >= canvasSize / gridSize || head.y < 0 || head.y >= canvasSize / gridSize) {
                endGame();
                return;
            }

            // Collision with self
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                endGame();
                return;
            }

            snake.unshift(head);

            // Check if snake ate the food
            if (head.x === food.x && head.y === food.y) {
                score++;
                scoreElement.textContent = score;
                placeFood();
            } else {
                snake.pop();
            }

            draw();
        }

        function endGame() {
            clearInterval(gameLoop);
            gameOverMessage.style.display = 'block';
            startButton.textContent = 'Play Again?';
            startButton.style.display = 'block';
        }

        function startGame() {
            initializeGame();
            startButton.style.display = 'none';
            gameLoop = setInterval(update, 100);
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
            if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
            if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
            if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
        });

        mobileControls.addEventListener('click', (e) => {
            const newDirection = e.target.dataset.direction;
            if (newDirection) {
                if (newDirection === 'up' && direction !== 'down') direction = 'up';
                if (newDirection === 'down' && direction !== 'up') direction = 'down';
                if (newDirection === 'left' && direction !== 'right') direction = 'left';
                if (newDirection === 'right' && direction !== 'left') direction = 'right';
            }
        });

        startButton.addEventListener('click', startGame);

        initializeGame();
        draw();
