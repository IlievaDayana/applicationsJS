import { render } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';
import { homePage } from './src/views/home.js';
import { createPage } from './src/views/create.js';
import { detailsPage } from './src/views/details.js';
import { editPage } from './src/views/edit.js';
import { listingsPage } from './src/views/listings.js';
import { loginPage } from './src/views/login.js';
import { myListingsPage } from './src/views/myListings.js';
import { registerPage } from './src/views/register.js';
import { searchPage } from './src/views/search.js';
import { logout } from './src/api/data.js';


const main = document.querySelector('main');

page('/', middle, homePage);
page('/create', middle, createPage);
page('/edit/:id', middle, editPage);
page('/details/:id', middle, detailsPage);
page('/listings', middle, listingsPage);
page('/login', middle, loginPage);
page('/register', middle, registerPage);
page('/my-listings', middle, myListingsPage);
page('/search', middle, searchPage);

setUserNav();
page.start();




function middle(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next()
}


function setUserNav() {
    const username = sessionStorage.getItem('username')
    if (username !== null) {
        document.querySelector('.welcomeUser').textContent = `Welcome ${username}`
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#logoutBtn').addEventListener('click', async(e) => {
            e.preventDefault();
            await logout();
            page.redirect('/')
        })
    } else {
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#profile').style.display = 'none';
    }
}