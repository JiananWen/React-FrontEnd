import axios from 'axios';

export const userService = {
    login,
    logout
};


function login(username, password) {



    return axios.post('http://localhost:8080/login', {
        userName: username,
        password: password
    }).then(user => {
        console.log('user service');
        console.log(user);
        // localStorage.setItem('user', user.data);
        localStorage.setItem('user', JSON.stringify(user.data));
        return user;
    }).catch(err => {
        handleError(err);
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function handleError(err) {
    const error = err.response;

    const message = error.data.message;
    console.log(message);

    throw new Error(message);




    // return response.data.then(text => {
    //     console.log(text);
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             window.location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
}

