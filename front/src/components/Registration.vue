<script>
    import Navbar from './Elements/Navbar.vue';
    import ButtonVue from './Elements/Button.vue';

    import instance from '../axios-infos';
    import axios from 'axios';

    import gsap from "gsap";

    export default {
        components: {
            Navbar, ButtonVue
        },
        data() {
            return {
                name: '',
                surname: '',
                mail: '',
                password: '',
                confirmPassword: '',
                visibilityMode: 'visibility_off',
                visibilityModeConfirm: 'visibility_off',
                errorEntry: '',
                isBlankInput: false,
                isConfirmedPassword: false,
            }
        },
        methods: {
            goToLogin() {
                this.$router.push({
                    name: 'Login',
                });
            },
            redirect() {
                this.$router.push({
                    name: 'Home',
                });
            },
            changeVisibility(idName) {
                const password = document.getElementById(idName);

                if (password.type === 'password') 
                {
                    password.type = 'text';

                    if (idName === 'password') {
                        this.visibilityMode = 'visibility';
                    } else {
                        this.visibilityModeConfirm = 'visibility';
                    }
                } 
                else 
                {
                    password.type = 'password';

                    if (idName === 'password') {
                        this.visibilityMode = 'visibility_off';
                    } else {
                        this.visibilityModeConfirm = 'visibility_off';
                    }
                }
            },
            async createUser() 
            {
                if (this.name === '' || this.surname === '' || this.mail === '' || this.password === '' || this.confirmPassword === '') {
                    this.errorEntry = 'Please complete all fields';
                } 
                else if (this.password !== this.confirmPassword) {
                    this.errorEntry = 'Passwords do not match';
                }
                else {
                    this.errorEntry = '';

                    const URL = `${instance.defaults.baseURL}/api/users`;

                    axios.post(URL, {
                        email: this.mail,
                        password: this.password,
                        nom: this.surname,
                        prenom: this.name
                    })
                    .then(response => {
                        console.log(response);
                        this.goToLogin();
                    })
                    .catch(error => {
                        if (error.response.status == 500) {
                            this.errorEntry = 'This email is already used';
                        }
                    })
                }
            },
            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.transform = "translateY(-80px)";
            },
            enter(el) {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: el.dataset.index * 0.2,
                });
            },
        }
    }

</script>


<template>

    <Navbar title="Registration"/>

    <transition-group appear @before-enter="beforeEnter" @enter="enter">
        <div class="container" :data-index="index" :key="1">

            <form >
                <div class="name">
                    <div class="container-input">
                        <label for="prenomInput">Name</label>
                        <input type="text" name="prenomInput" placeholder="John" v-model="name">
                    </div>

                    <div class="container-input">
                        <label for="nomInput">Surname</label>
                        <input type="text" name="nomInput" placeholder="Doe" v-model="surname">
                    </div>
                </div>

                <div class="container-input">
                    <label for="mailInput">Mail</label>
                    <input type="email" name="mailInput" placeholder="johndoe@gmail.com" v-model="mail">
                </div>

                <div class="container-input">
                    <label for="passwordInput">Password</label>
                    <input type="password" id="password" name="passwordInput" placeholder="Enter your password" v-model="password">
                    <button type="button" @click="() => { changeVisibility('password') }" >
                        <span class="material-symbols-outlined "> {{ visibilityMode }} </span>
                    </button>
                </div> 

                <div class="container-input">
                    <label for="confirmPasswordInput">Confirm Password</label>
                    <input type="password" id="confirmPass" name="confirmPasswordInput" placeholder="Confirm your password" v-model="confirmPassword">
                    <button type="button" @click="() => { changeVisibility('confirmPass') }" >
                        <span class="material-symbols-outlined "> {{ visibilityModeConfirm }} </span>
                    </button>
                </div> <br>

                <div v-if="errorEntry !== ''" class="form-error">
                    <p> {{ errorEntry }} </p>
                </div>

                <ButtonVue @click="createUser" text="Sign up" icon="app_registration" />
            </form>

            <hr>

            <p> Already have an account ? <a @click="goToLogin" > Click here </a> </p>

        </div>
    </transition-group>

</template>


<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 130px;
        border-radius: 0.5em;
        box-shadow: 0 0 1em #00000033;
        background: var(--card-color);
    }
    .container-input {
        margin: 50px;
        position: relative;
    }

    .container-input button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        position: absolute;
        right: 10px;
        bottom: 15px;
        padding: 0;
        margin: 0;
    }

    .container-input button span {
        color: var(--font-color);
        padding: 0;
        margin: 0;
    }

    .name {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .name .container-input {
        margin: 50px;
        margin-bottom: 0;
    }

    .name .container-input input {
        width: 150px;
    }

    form {
        margin-bottom: 40px;
    }

    label {
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        margin: 0;
        padding: 0;
    }

    input {
        width: 400px;
        height: 50px;
        background: transparent;
        border: none;
        border-bottom: 2px solid var(--font-color);
        padding: 5px;
        letter-spacing: 1px;
        font-size: 1.3em;
        margin-top: 0;
        color: var(--font-color);
    }

    input:focus {
        outline: none;
        border-bottom: 2px solid var(--main-color);
    }

    hr {
        width: 40px;
        margin: 0;
        padding: 0;
        border:none;
        border-bottom: 2px solid var(--font-color);
    }

    a {
        color: var(--main-color);
        text-decoration: none;
        cursor: pointer;
    }

    
</style>