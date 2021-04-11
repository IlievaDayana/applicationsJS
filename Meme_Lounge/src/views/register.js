import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js'
import { notify } from './notification.js';

const registerTemplate = (sub) => html `
<section id="register">
    <form @submit = ${sub} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`



export async function registerPage(ctx) {
    ctx.render(registerTemplate(sub));
    async function sub(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const username = form.get('username');
        const password = form.get('password');
        const repass = form.get('repeatPass');
        const gender = form.get('gender');

        if (!email || !password || !gender || password != repass) {
            notify('All fields are required!')
            ctx.page.redirect('/register');
        } else {
            await register(email, username, password, gender);
            ctx.setUserNav();
            ctx.page.redirect('/memes');
        }

    }


}