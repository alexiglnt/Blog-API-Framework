import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PostDetail from './components/PostDetail.vue';
import ListPost from './components/ListPost.vue';
import Home from './components/Home.vue';
import NotFound from './components/404NotFound.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';
import CreateArticle from './components/CreateArticle.vue';
import ProfilUser from './components/ProfilUser.vue';
import PageAdmin from './components/PageAdmin.vue';
import Bookmarks from './components/Bookmarks.vue';
import ArticleBookmark from './components/ArticleBookmark.vue';

import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://127.0.0.1:8000/',
	timeout: 1000,
	headers: {'Content-type': 'application/json; charset=UTF-8'}
});

const routes = [
	{ path: '/', component: Home, name: 'Home' },
	{ path: '/list-posts', component: ListPost, name: 'All-Articles'},
	{ path: '/articles/:id', component: PostDetail, name: 'Article', props: true },
	{ path: '/:pathMatch(.*)', component: NotFound, name: '404-Not-Found' },
	{ path: '/login', component: Login, name: 'Login' },
	{ path: '/Registration', component: Registration, name: 'Registration' },
	{ path: '/ProfilUser', component: ProfilUser, name: 'Profil' },
	{ path: '/Admin', component: PageAdmin, name: 'Admin' },
	{ path: '/MyBookmarks', component: Bookmarks, name: 'My-Bookmarks' },
	{ path: '/ArticleBookmark/:id', component: ArticleBookmark, name: 'Bookmark-Article', props: true },
];

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
});

// Pour nomer la page selon le nom de la route
router.beforeEach((to, from, next) => {
	document.title = to.name;
	next();
  });

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
