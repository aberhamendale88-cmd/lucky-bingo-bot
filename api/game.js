let calledNumbers = [];
let gameActive = false;

export default function handler(req, res) {
    if (req.method === 'GET') {
        // በአሁኑ ሰዓት የወጡ ቁጥሮችን ለማወቅ
        res.status(200).json({ numbers: calledNumbers, active: gameActive });
    }
}

// ቁጥሮችን በየ 3 ሰከንዱ የማውጣት ሎጂክ (ይህ ለሙከራ ነው)
function startBingo() {
    calledNumbers = [];
    gameActive = true;
    const interval = setInterval(() => {
        if (calledNumbers.length >= 75) {
            clearInterval(interval);
            gameActive = false;
        } else {
            let n = Math.floor(Math.random() * 75) + 1;
            if (!calledNumbers.includes(n)) calledNumbers.push(n);
        }
    }, 3000);
}