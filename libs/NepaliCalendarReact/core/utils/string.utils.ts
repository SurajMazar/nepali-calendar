export const returnLimitedLetters = (word: number | string, limit = 3) => {
    word = word.toString()
    if (word.length > limit) {
        return word.slice(0, limit)
    }

    return word
}
