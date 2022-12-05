import { defineStore } from 'pinia';

export const usePiniaStore = defineStore('user', {
	state: () => {
		return { 
            user: [],
            token: null,
            isAuth: false,
        };
	},
	getters: {
		getUser: (state) => {
            return state.user;
        },
        getToken: (state) => {
            return state.token;
        },
        getAuth: (state) => {
            return state.isAuth;
        },
        getUserEmail: (state) => {
            return state.user.email;
        },
        getUserId: (state) => {
            return state.user.id;
        },
        getUserRole: (state) => {
            return state.user.role;
        },
        getUserPrenom: (state) => {
            return state.user.prenom;
        },
        getUserNom: (state) => {
            return state.user.nom;
        },
	},
	// could also be defined as
	// state: () => ({ count: 0 })
	actions: {
        setUser(data) {
            this.user = data;
        },
        setToken(data) {
            this.token = data;
        },
        setAuth(data) {
            this.isAuth = data;
        }
	},
});
