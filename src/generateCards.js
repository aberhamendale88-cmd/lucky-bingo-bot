const fs = require('fs');
const path = require('path');

/**
 * ለአንድ ካርድ የቢንጎ ቁጥሮችን በህጉ መሰረት ያመነጫል
 * B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
 */
const generateBingoNumbers = () => {
    const card = { B: [], I: [], N: [], G: [], O: [] };
    const ranges = {
        B: [1, 15],
        I: [16, 30],
        N: [31, 45],
        G: [46, 60],
        // O: [61, 75]
    };

    // ለእያንዳንዱ ፊደል 5 ልዩ ቁጥሮችን መምረጥ
    for (let column in ranges) {
        const [min, max] = ranges[column];
        const nums = new Set();
        while (nums.size < 5) {
            nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        card[column] = Array.from(nums).sort((a, b) => a - b);
    }

    // የ "O" ረድፍን ለብቻው መስራት (ምክንያቱም ከ 61-75 ስለሆነ)
    const oNums = new Set();
    while (oNums.size < 5) {
        oNums.add(Math.floor(Math.random() * (75 - 61 + 1)) + 61);
    }
    card.O = Array.from(oNums).sort((a, b) => a - b);

    // በቢንጎ ህግ መሰረት መሃል ላይ ያለችው ቁጥር (N ረድፍ 3ኛው ቁጥር) FREE መሆን አለባት
    card.N[2] = "FREE"; 

    return card;
};

// 500 ካርዶችን ማዘጋጀት
const allCards = [];
console.log("⏳ 500 ካርዶችን በማዘጋጀት ላይ...");

for (let i = 1; i <= 500; i++) {
    allCards.push({
        id: i,
        card: generateBingoNumbers(),
        createdAt: new Date().toISOString()
    });
}

// ውጤቱን ወደ cards.json ፋይል መጻፍ
const outputPath = path.join(__dirname, 'cards.json');

try {
    fs.writeFileSync(outputPath, JSON.stringify(allCards, null, 2));
    console.log("✅ ስኬት! 500 ካርዶች በ 'src/utils/cards.json' ውስጥ ተፈጥረዋል።");
} catch (error) {
    console.error("❌ ፋይሉን መጻፍ አልተቻለም:", error);
}