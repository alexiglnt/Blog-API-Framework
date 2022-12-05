<script>
    import { usePiniaStore } from '../stores/userStore';
    import Navbar from './Elements/Navbar.vue';
    import ButtonVue from './Elements/Button.vue';

    import instance from '../axios-infos';
    import axios from 'axios';

    import gsap from "gsap";

    export default {
        setup() {
            const userStore = usePiniaStore();

            return { userStore }
        },
        components: {   
            Navbar, ButtonVue
        },
        data() {
            return {
                mail: '',
                password: '',
                isConnected: false,
                token: '',
                usersData: [''],
                userInfos: '',
                visibilityMode: 'visibility_off',
                badRequest: false,
            }
        },
        methods: {
            // Envoi vers la page d'inscription
            goToRegistration() {
                this.$router.push({
                    name: 'Registration',
                });
            },
            // Envoi vers la page d'accueil
            redirect(routeName) {
                this.$router.push({
                    name: routeName,
                });
            },
            changeVisibility() {
                const password = document.getElementById('password');

                if (password.type === 'password') {
                    password.type = 'text';
                    this.visibilityMode = 'visibility';
                } else {
                    password.type = 'password';
                    this.visibilityMode = 'visibility_off';
                }
            },
            async getUserInformation() {
                const URL_users = `${instance.defaults.baseURL}/api/users`;

                // Requete GET pour récupérer les infos de tous les utilisateurs
                axios.get(URL_users, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                .then(res => {
                    
                    this.usersData = res.data['hydra:member'];
                    console.log('USERS : ', this.usersData);
					
                })
                .then(() => {
                    // Parcours de tous les utilisateurs pour trouver l'utilisateur connecté
                    for (let i = 0; i < this.usersData.length; i++) 
                    {
                        // Si l'utilisateur connecté est trouvé, on récupère ses infos
                        if (this.usersData[i].email == this.mail) 
                        {
                            // On stocke les infos de l'utilisateur connecté dans une variable userInfos
                            this.userInfos = this.usersData[i];
                            console.log('USER INFOS : ', this.userInfos);

                            // On enregistre les infos de l'utilisateur connecté dans le localStorage
                            localStorage.setItem('userInfos', JSON.stringify(this.userInfos));

                            this.userStore.setUser(this.userInfos);
                            console.log('USER STORE : ', this.userStore.user.email);
                            this.redirect('Profil');

                            /* 
                            // on accede a l'email du user connecté
                            console.log('TEST : ', JSON.parse(test).email);
                            */
                        }
                    }
                })
            },
            // Permet à l'utilisateur de se connecter
            async connectUser() 
            {
                const URL_login = `${instance.defaults.baseURL}/api/login_check`;

                // Requete POST pour se connecter
                axios.post(URL_login, {
                    username: this.mail,
                    password: this.password
                })
                // On récupère le token
                .then(response => {
                    this.isConnected = true;
                
                    this.token = response.data.token;
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('isConnected', true);

                    this.userStore.setToken(this.token);
                    this.userStore.setAuth(this.isConnected);


                    // On va chercher les informations de l'utilisateur (nom, prenom, mail, etc...)
                    this.getUserInformation();
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        this.badRequest = true;
                    }
                })
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
        },
        mounted() {   
            const input = document.getElementById('password');

            input.addEventListener('keyup', (event) => {
                if (event.code === 'Enter') {
                    this.connectUser();
                }
            });
        },
    }

</script>


<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <Navbar title="Login"/>

    <transition-group appear @before-enter="beforeEnter" @enter="enter">
        <div class="container" :data-index="index" :key="1">

            <form>
                <div class="container-input">
                    <label for="mailInput">Mail</label>
                    <input type="email" name="mailInput" placeholder="Enter your email" v-model="mail">
                </div>

                <div class="container-input">
                    <label for="passwordInput">Password</label>
                    <input type="password" id="password" name="passwordInput" placeholder="Enter your password"  v-model="password">
                    <button type="button" @click="changeVisibility" > <span class="material-symbols-outlined "> {{ visibilityMode }} </span> </button>
                </div> <br>

                <div v-if="badRequest == true" class="form-error">
                    <p> Incorrect username or password </p>
                </div>

                <ButtonVue @click="connectUser" text="Sign in" icon="login" />
            </form>
            <hr>
            
            <p> You do not have an account ? <a @click="goToRegistration" > Click here </a> </p>
            
        </div>
    </transition-group>

</template>


<style scoped>
    .btn-profil {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;

        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 10000;
    }

    .btn-profil:hover {
        background-color: #3e8e41;
    }

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