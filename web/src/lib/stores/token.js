import { writable } from 'svelte/store'
import { browser } from '$app/environment'

const generate = (length=32) => {
    let symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
    let token = []
    for (let i=0; i<length; i++) {
        let j = (Math.random() * (symbols.length-1)).toFixed(0)
        token[i] = symbols[j]
    }
    return token.join('')
}

export const token = writable(
    browser
    ? localStorage.token || generate()
    : null
)

if (browser) {
    token.subscribe((value) => localStorage.token = value)
}
