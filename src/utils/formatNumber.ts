
export default function formatNumber(x: number) {

    x = Number(x);
    if (x == 0) {
        return 0;
    }

    if (x >= 1) {
        return x.toFixed(2)
    }

    const digits = x.toString().split(".")[1];
    let index = 0;

    while (index < digits.length && digits[index] === '0') {
        index += 1
    }

    return "0." + "0".repeat(index) + digits.slice(index, Math.min(digits.length, index + 4))



}