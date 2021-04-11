import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../api/data.js'


const loginTemplate = (sub) => html `
<section id="login">
    <div class="container">
        <form @submit="${sub}" id="login-form" action="" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`



export async function loginPage(ctx) {
    ctx.render(loginTemplate(sub))
    async function sub(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const username = form.get('username');
        const password = form.get('password');
        try {
            if (!username && !password) {
                throw new Error('All fields are required!')
            }
            await login(username, password);
            ctx.setUserNav();
            ctx.page.redirect('/listings')
        } catch (err) {
            window.alert(err.message)
        }
    }
}