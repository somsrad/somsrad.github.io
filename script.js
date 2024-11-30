function generateFlavorTable() {
    // Classificazione degli ingredienti in base ai sapori
    const categories = {
    dolce: [
        "cioccolato", "vaniglia", "fragola", "banana", "miele", "zucchero", 
        "panna", "burro", "crema pasticcera", "mascarpone", "mirtillo", 
        "ciliegia", "pesca", "albicocca", "uva", "melograno", "ananas", 
        "cocco", "melone", "anguria", "nocciola", "mandorla", "datteri", 
        "fichi", "prugne secche", "uvetta", "gelato", "caramello", 
        "crema di nocciole", "torrone", "panettone", "pandoro", 
        "marzapane", "croissant", "cioccolato bianco", "cioccolato gianduia", 
        "cioccolato ruby", "granella di zucchero", "granella di nocciole", 
        "brioche", "cacao", "tè al gelsomino", "latte", "yogurt dolce", 
        "frutta candita", "miele millefiori", "zabaione", "crema chantilly", 
        "yogurt alla vaniglia", "macarons", "tiramisu", "meringa"
    ],
    salato: [
        "formaggio", "gorgonzola", "parmigiano", "prosciutto", "salame", 
        "pane", "pasta", "riso", "pollo", "manzo", "agnello", "maiale", 
        "salsiccia", "bacon", "tonno", "gamberi", "scampi", "aragosta", 
        "crostacei", "pesce spada", "calamari", "cozze", "vongole", 
        "alici", "sarde", "acciughe", "polpo", "salmone", "trota", 
        "zuppa di pesce", "uova", "tuorlo d'uovo", "ricotta", 
        "mozzarella", "stracciatella", "provola", "emmental", 
        "fontina", "gruyère", "cheddar", "brie", "camembert", 
        "taleggio", "pecorino", "pecorino romano", "piadina", 
        "focaccia", "gnocco fritto", "baguette", "cracker", 
        "pancetta", "tartine salate", "pizzette", "salatini", 
        "grissini", "polenta", "gnocchi", "ravioli", "lasagne", 
        "torta salata", "quiche", "soia", "tempeh", "tofu", 
        "hamburger", "sashimi", "sushi", "miso", "wasabi", 
        "salsa di soia", "aceto balsamico", "capperi"
    ],
    acido: [
        "arancia", "limone", "lime", "pompelmo", "melagrana", 
        "uva spina", "ribes", "mirtillo rosso", "fragola acerba", 
        "mela verde", "ananas", "kiwi", "aceto", "aceto di mele", 
        "yogurt", "yogurt greco", "succo di limone", "salsa di limone", 
        "pomodoro", "salsa di pomodoro", "sugo di pomodoro fresco", 
        "capperi", "olive verdi", "peperoni", "peperoncini piccanti", 
        "mostarda", "senape", "lime pickled", "sottaceti", 
        "ravanello", "cetriolo sottaceto", "salsa agrodolce", 
        "salsa tartara", "acqua tonica", "tè al limone", "sorbetto al limone", 
        "granita al limone", "frullato tropicale", "succo d'arancia", 
        "succo di mela verde", "zuppa di pomodoro", "gazpacho", 
        "pesto al limone", "salsa yogurt", "lime zest", "insalata di cetrioli"
    ],
    amaro: [
        "caffè", "cioccolato fondente", "cacao amaro", "radicchio", 
        "rucola", "pepe nero", "pepe verde", "pepe rosa", "pepe bianco", 
        "curry", "curcuma", "zafferano", "paprika", "cumino", 
        "timo", "rosmarino", "origano", "salvia", "basilico", 
        "menta", "alloro", "erba cipollina", "prezzemolo", "cavolo nero", 
        "bietola", "spinaci", "asparagi", "broccoli", "cavolfiore", 
        "carciofo", "melanzane", "zucchine", "olive nere", 
        "funghi porcini", "champignon", "porro", "cipolla", 
        "scalogno", "sedano", "rapa", "tartufo", "olio al tartufo", 
        "whisky", "rum", "cognac", "amaro", "birra", "tequila", 
        "vodka", "gin", "spumante", "champagne", "campari", 
        "aperol", "soda al pompelmo", "vermuth", "negroni", 
        "amaro alle erbe", "aperitivo alle erbe", "grappa", 
        "amaro al caffè", "fernet", "chinotto", "cicoria", 
        "radice di tarassaco"
    ]
};


    // Unisci tutti gli ingredienti in una lista unica
    const allIngredients = Object.values(categories).flat();

    // Funzione per calcolare l'abbinamento basato sulla compatibilità di categoria
    function calculateScore(cat1, cat2) {
        if (cat1 === cat2) return Math.random() * 40 + 60; // Stessa categoria: 60-100
        if ((cat1 === "dolce" && cat2 === "salato") || (cat1 === "salato" && cat2 === "dolce")) return Math.random() * 30 + 50; // Dolce-salato: 50-80
        if ((cat1 === "acido" && cat2 === "dolce") || (cat1 === "dolce" && cat2 === "acido")) return Math.random() * 20 + 40; // Dolce-acido: 40-60
        if ((cat1 === "amaro" && cat2 === "dolce") || (cat1 === "dolce" && cat2 === "amaro")) return Math.random() * 10 + 30; // Dolce-amaro: 30-40
        return Math.random() * 20 + 20; // Altri: 20-40
    }

    const flavorTable = {};

    // Genera abbinamenti per ogni ingrediente
    for (const ingredient1 of allIngredients) {
        flavorTable[ingredient1] = {};
        const category1 = Object.keys(categories).find(cat => categories[cat].includes(ingredient1));

        for (const ingredient2 of allIngredients) {
            if (ingredient1 === ingredient2) continue; // Evita auto-abbinamenti

            const category2 = Object.keys(categories).find(cat => categories[cat].includes(ingredient2));
            flavorTable[ingredient1][ingredient2] = Math.round(calculateScore(category1, category2));
        }
    }

    return flavorTable;
}


// Genera una flavorTable simulata
const flavorTable = generateFlavorTable();

// Funzione per calcolare la distanza di Levenshtein
function levenshteinDistance(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Cancellazione
                matrix[i][j - 1] + 1, // Inserzione
                matrix[i - 1][j - 1] + cost // Sostituzione
            );
        }
    }

    return matrix[a.length][b.length];
}

// Funzione per trovare l'ingrediente più simile
function findClosestIngredient(input, ingredientList) {
    let closest = null;
    let minDistance = Infinity;

    for (const ingredient of ingredientList) {
        const distance = levenshteinDistance(input, ingredient);
        if (distance < minDistance) {
            closest = ingredient;
            minDistance = distance;
        }
    }

    return closest;
}

// Gestore per il calcolo degli abbinamenti
document.getElementById("check-button").addEventListener("click", () => {
    const ingredient1Input = document.getElementById("ingredient1").value.toLowerCase();
    const ingredient2Input = document.getElementById("ingredient2").value.toLowerCase();
    const result = document.getElementById("result");

    const ingredientList = Object.keys(flavorTable);

    const ingredient1 = flavorTable[ingredient1Input] ? ingredient1Input : findClosestIngredient(ingredient1Input, ingredientList);
    const ingredient2 = flavorTable[ingredient2Input] ? ingredient2Input : findClosestIngredient(ingredient2Input, ingredientList);

    if (!ingredient1 || !ingredient2) {
        result.textContent = `Non sono riuscito a trovare ingredienti simili a "${ingredient1Input}" o "${ingredient2Input}".`;
        return;
    }

    if (flavorTable[ingredient1] && flavorTable[ingredient1][ingredient2] !== undefined) {
        const score = flavorTable[ingredient1][ingredient2];
        result.textContent = `L'abbinamento tra ${ingredient1} e ${ingredient2} ha un punteggio di ${score}%.`;
    } else if (flavorTable[ingredient2] && flavorTable[ingredient2][ingredient1] !== undefined) {
        const score = flavorTable[ingredient2][ingredient1];
        result.textContent = `L'abbinamento tra ${ingredient2} e ${ingredient1} ha un punteggio di ${score}%.`;
    } else {
        result.textContent = `Non esistono dati per l'abbinamento tra ${ingredient1} e ${ingredient2}.`;
    }
});
