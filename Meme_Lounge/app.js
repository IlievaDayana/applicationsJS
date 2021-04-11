import { render } from './node_modules/lit-html/lit-html.js'
import page from './node_modules/page/page.mjs'
import { createPage } from './src/views/create.js'
import { loginPage } from './src/views/login.js'
import { registerPage } from './src/views/register.js'
import { editPage } from './src/views/edit.js'
import { detailsPage } from './src/views/details.js'
import { memesPage } from './src/views/memes.js'
import { homePage } from './src/views/home.js'
import { userPage } from './src/views/userProfile.js'
import { logout as logoutUser } from './src/api/api.js'


setUserNav()
const main = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click', logout)

page('/', middle, homePage);
page('/login', middle, loginPage);
page('/user-profile', middle, userPage);
page('/memes', middle, memesPage);
page('/create', middle, createPage);
page('/login', middle, loginPage);
page('/register', middle, registerPage);
page('/details/:id', middle, detailsPage);
page('/edit/:id', middle, editPage);

page.start()

async function middle(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav
    next();
}



function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email !== null) {
        document.querySelector('.profile>span').textContent = `Welcome, ${email}`
        document.querySelector('.user').style.display = "";
        document.querySelector('.guest').style.display = "none";
    } else {
        document.querySelector('.user').style.display = "none";
        document.querySelector('.guest').style.display = "";
    }
}


async function logout() {
    await logoutUser()
    page.redirect('/')
    setUserNav();
}