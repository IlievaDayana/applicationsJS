import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js'


const registerTemplate = (sub) => html `        
<section id="register">
    <div class="container">
        <form  @submit="${sub}" id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`



export async function registerPage(ctx) {
    ctx.render(registerTemplate(sub))
    async function sub(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const username = form.get('username');
        const password = form.get('password');
        const rePass = form.get('repeatPass');
        try {
            if (password && password !== rePass) {
                throw new Error('Passwords don\'t match!')
            } else if (!username && !password) {
                throw new Error('All fields are required!')
            }
            await register(username, password);
            ctx.setUserNav();
            ctx.page.redirect('/listings')
        } catch (err) {
            window.alert(err.message)
        }


    }
}