 const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        const newQuoteBtn = document.getElementById('new-quote-btn');
        const tweetQuoteBtn = document.getElementById('tweet-quote-btn');

        const quotes = [
            {
                quote: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                quote: "Believe you can and you're halfway there.",
                author: "Theodore Roosevelt"
            },
            {
                quote: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                quote: "It is during our darkest moments that we must focus to see the light.",
                author: "Aristotle"
            },
            {
                quote: "The best way to predict the future is to create it.",
                author: "Peter Drucker"
            },
            {
                quote: "What we think, we become.",
                author: "Buddha"
            },
            {
                quote: "The journey of a thousand miles begins with a single step.",
                author: "Lao Tzu"
            },
            {
                quote: "Imagination is more important than knowledge.",
                author: "Albert Einstein"
            },
            {
                quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                author: "Winston Churchill"
            },
            {
                quote: "Strive not to be a success, but rather to be of value.",
                author: "Albert Einstein"
            }
        ];

        function getRandomQuote() {
            return quotes[Math.floor(Math.random() * quotes.length)];
        }

        function displayQuote() {
            const { quote, author } = getRandomQuote();
            
            quoteText.style.opacity = '0';
            quoteAuthor.style.opacity = '0';

            setTimeout(() => {
                quoteText.textContent = `"${quote}"`;
                quoteAuthor.textContent = `- ${author}`;
                quoteText.style.opacity = '1';
                quoteAuthor.style.opacity = '1';

                const tweetUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quote)}" - ${encodeURIComponent(author)}`;
                tweetQuoteBtn.href = tweetUrl;
            }, 500);
        }

        newQuoteBtn.addEventListener('click', displayQuote);

        // Initial quote display
        window.onload = displayQuote;
