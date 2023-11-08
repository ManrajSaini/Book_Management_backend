
function generateISBN() {
    const prefix = "978";
    const randomDigits = Math.random().toString().slice(2, 15);
    
    const isbn = prefix + randomDigits;
    return isbn;
}

module.exports = generateISBN;