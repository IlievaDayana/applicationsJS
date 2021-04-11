export let settings = {
    host: ''
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok == false) {
            const error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }
        try {
            return await response.json();
        } catch (error) {
            return response;
        }
    } catch (error) {
        return alert(error.message)
        throw error;
    }
}

function createOperation(method = "get", data) {
    const result = { method, headers: {} }
    if (data) {
        result.headers['Content-Type'] = 'application/json';
        result.body = JSON.stringify(data)
    }
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        result.headers['X-Authorization'] = token
    }
    return result;
}

export async function get(url) {
    return request(url, createOperation());
}

export async function post(url, data) {
    return request(url, createOperation('post', data));
}
export async function del(url) {
    return request(url, createOperation('delete'));
}
export async function put(url, data) {
    return request(url, createOperation('put', data));
}

export async function login(email, password) {
    const response = await post(settings.host + '/users/login', { email, password })
    console.log(response);
    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('username', response.username);
    sessionStorage.setItem('gender', response.gender);
    sessionStorage.setItem('email', response.email);
    sessionStorage.setItem('userId', response._id);
    return response;
}
export async function register(email, username, password, gender) {
    const response = await post(settings.host + '/users/register', { email, username, gender, password })
    sessionStorage.setItem('username', response.username);
    sessionStorage.setItem('gender', response.gender);
    sessionStorage.setItem('email', response.email);
    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
    return response;
}

export async function logout() {
    const response = await get(settings.host + '/users/logout')
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('gender');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    return response;
}