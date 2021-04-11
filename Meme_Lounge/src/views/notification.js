import { html, render } from "../../node_modules/lit-html/lit-html.js"




const container = document.querySelector('#errorBox');

export function notify(msg) {

    container.innerHTML = `<span>${msg}</span>`;
    container.style.display = 'block';
    setTimeout(() => {
        container.style.display = 'none';
    }, 3000)
}