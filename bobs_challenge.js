const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

const MOD = 1e9 + 7;
const MAX = 200005;

let fact = new Array(MAX).fill(1);
let invFact = new Array(MAX).fill(1);

function modPow(base, exp, mod) {
    let result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return result;
}

for (let i = 1; i < MAX; i++) {
    fact[i] = (fact[i - 1] * i) % MOD;
}
invFact[MAX - 1] = modPow(fact[MAX - 1], MOD - 2, MOD);
for (let i = MAX - 2; i >= 0; i--) {
    invFact[i] = (invFact[i + 1] * (i + 1)) % MOD;
}

function nCk(n, k) {
    if (k < 0 || k > n) return 0;
    return (((fact[n] * invFact[k]) % MOD) * invFact[n - k]) % MOD;
}

let idx = 0;
let t = parseInt(input[idx++]);

for (let test = 0; test < t; test++) {
    let [n, k] = input[idx++].split(' ').map(Number);
    let s = input[idx++].split(' ').map(Number);

    let ones = s.filter(x => x === 1).length;
    let zeros = n - ones;
    let minOnes = Math.floor(k / 2) + 1;
    let result = 0;

    for (let oneCount = minOnes; oneCount <= Math.min(k, ones); oneCount++) {
        let zeroCount = k - oneCount;
        if (zeroCount > zeros) continue;

        let count = (nCk(ones, oneCount) * nCk(zeros, zeroCount)) % MOD;
        result = (result + count) % MOD;
    }

    console.log(result);
}
