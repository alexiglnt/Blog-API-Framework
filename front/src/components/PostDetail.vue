<script>
import { usePiniaStore } from '../stores/postsStore';
import ButtonVue from './Elements/Button.vue';
import Navbar from './Elements/Navbar.vue';
import ScrollToUpBtn from './Elements/ScrollToUpBtn.vue';
import CommentItem from './CommentItem.vue';
import AddComment from './Elements/AddComment.vue';

import instance from '../axios-infos';
import axios from 'axios';

export default {
	components: {
		ButtonVue, Navbar, ScrollToUpBtn, CommentItem, AddComment
	},
	props: ['id', 'postItem'],
	// Properties returned fsrom data() become reactive state
	// and will be exposed on `this`.
	data() {
		return {
			post: undefined,
			comments: [],
			bookmarkState: 'bookmark_add',
			isChecked: {
				type: Boolean,
				default: false
			},
			isLiked: {
				type: Boolean,
				default: false
			},
			isConnected: false,
			comeFrom: 'listPosts',
			currentPost: '',
			numberOfLike : 0,
		};
	},

	// Methods are functions that mutate state and trigger updates.
	// They can be bound as event listeners in templates.
	methods: {
		showAllArticles() {
			this.$router.push({
				name: 'All-Articles',
			});
		},
		showProfil() {
			this.$router.push({
				name: 'Profil',
			});
		},
		// Change la couleur/icone du bouton bookmark
		changeDesignBookmark() {
			const bookmarkBtn = document.querySelector('.bookmark-span');

			bookmarkBtn.classList.toggle('added');
			this.bookmarkState = this.bookmarkState === 'bookmark_add' ? 'bookmark' : 'bookmark_add';
		},
		changeDesignLike() {
			const likeBtn = document.querySelector('.like-span');
			likeBtn.classList.toggle('liked');
		},
		isBookmarkChecked() {
			// Si l'article est déjà bookmarké, on change l'icone
			const URL_get = `${instance.defaults.baseURL}/api/bookmarks`;

			axios.get(URL_get)
			.then((response) => {
				const bookmarks = response.data['hydra:member'];

				bookmarks.forEach((bookmark) => {
					if(localStorage.getItem('isConnected') === 'true') 
					{
						if (bookmark.articleID === this.post.id && bookmark.userID === JSON.parse(localStorage.getItem('userInfos')).id) 
						{
							this.isChecked = true;
							this.changeDesignBookmark();
						}
					}
				});
			})
		},
		isLikeChecked() {
			// Si l'article est déjà liké, on change l'icone
			const URL_get = `${instance.defaults.baseURL}/api/likes`;

			axios.get(URL_get)
			.then((response) => {
				const likes = response.data['hydra:member'];

				likes.forEach((like) => {
					if(localStorage.getItem('isConnected') === 'true') 
					{
						if (like.articleId === this.post.id && like.userId === JSON.parse(localStorage.getItem('userInfos')).id) 
						{
							this.isLiked = true;
							this.changeDesignLike();
						}
					}
				});
			})
		},
		recupInfosBookmark() {
			this.changeDesignBookmark();

			let storage = '';
			let userId = 0;

			if (localStorage.getItem('isConnected') === 'true') {
				storage = localStorage.getItem('userInfos');
				userId = JSON.parse(storage).id;
			}

			const postID = this.post.id;

			if (this.isChecked === true) {
				this.removeFromBookmarks(userId, postID);
			}
			else {
				this.addToBookmarks(userId, postID);
			}
			
		},
		addLike() {
			const URL2 = `${instance.defaults.baseURL}/api/likes`;

			axios.get(URL2)
			.then((response) => {
				const likes = response.data['hydra:member'];
				let cpt=0
				likes.forEach((like) => {
					if (like.articleId === this.post.id)
					{
						cpt++;
					}
				});
				this.numberOfLike = cpt;
			})


			const URL = `${instance.defaults.baseURL}/api/articles/${this.post.id}`;

			let nbLike = this.numberOfLike;

			axios.put(URL, {
				nbLike: nbLike
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})

			// On rajoute 1 au nombre de like de l'article (seulement pour l'affichage sur la page pour l'actualisation)
			this.post.nb_like++;
		},
		removeLike() {
			const URL2 = `${instance.defaults.baseURL}/api/likes`;

			axios.get(URL2)
			.then((response) => {
				const likes = response.data['hydra:member'];
				let cpt=0
				likes.forEach((like) => {
					if (like.articleId === this.post.id)
					{
						cpt++;
					}
				});
				this.numberOfLike = cpt;
			})

			const URL = `${instance.defaults.baseURL}/api/articles/${this.post.id}`;

			let nbLike = this.numberOfLike;

			axios.put(URL, {
				nbLike: nbLike
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})

			// On enleve 1 au nombre de like de l'article (seulement pour l'affichage sur la page pour l'actualisation)
			this.post.nb_like--;
		},
		addInfosLike() {
			const URL = `${instance.defaults.baseURL}/api/likes`;

			axios.get(URL)
			.then((response) => {
				const likes = response.data['hydra:member'];
				likes.forEach((like) => {
					if (like.articleId === this.post.id && like.userId === JSON.parse(localStorage.getItem('userInfos')).id) 
					{
						
					}
					else
					{
						axios.post(URL, {
							articleId: this.post.id,
							userId: JSON.parse(localStorage.getItem('userInfos')).id
						})
					}
				});
			})

			
		},
		removeInfosLike() {
			const URL = `${instance.defaults.baseURL}/api/likes`;

			axios.get(URL)
			.then((response) => {
				const likes = response.data['hydra:member'];
				likes.forEach((like) => {
					if (like.articleId === this.post.id && like.userId === JSON.parse(localStorage.getItem('userInfos')).id) 
					{
						const URL_delete = `${instance.defaults.baseURL}/api/likes/${like.id}`;
						axios.delete(URL_delete);
					}
				});
			})
			
		},
		recupInfosLike() {
			this.changeDesignLike();

			let storage = '';
			let userId = 0;

			if (localStorage.getItem('isConnected') === 'true') {
				storage = localStorage.getItem('userInfos');
				userId = JSON.parse(storage).id;
			}

			const postID = this.post.id;
			

			if (this.isLiked === true) {
				this.isLiked = false;
				this.removeInfosLike();
				this.removeLike();
			}
			else {
				this.isLiked = true;
				this.addInfosLike();
				this.addLike();
			}
			
		},
		removeFromBookmarks(userId, postID) {

			const URL = `${instance.defaults.baseURL}/api/bookmarks`;

			axios.get(URL)
			.then((response) => {
				const bookmarks = response.data['hydra:member'];

				bookmarks.forEach((bookmark) => {
					if(localStorage.getItem('isConnected') === 'true') 
					{
						if (bookmark.articleID === this.post.id && bookmark.userID === JSON.parse(localStorage.getItem('userInfos')).id) 
						{
							axios.delete(`${URL}/${bookmark.id}`);
							this.isChecked = false;
						}
					}
				});
			});
		},
		addToBookmarks(userId, postID) {
			const URL = `${instance.defaults.baseURL}/api/bookmarks`;

			axios.post(URL, {
				userID: userId,
				articleID: postID,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		},
		getComments() {
			const URL = `${instance.defaults.baseURL}/api/comments`;

			axios.get(URL)
			.then((response) => {
				const comments = response.data['hydra:member'];

				comments.forEach((comment) => {
					if (comment.articleId === this.post.id) {
						this.comments.push(comment);
					}
				});
			})
		},
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
        },
	},
	// Lifecycle hooks are called at different stages
	// of a component's lifecycle.
	// This function will be called when the component is mounted.
	mounted() {
		this.isConnected = localStorage.getItem('isConnected');

		/* const postStore = usePiniaStore();
		this.post = postStore.getPost(this.$route.params.id); */

		// On récupère le post placé au préalable dans le localStorage
		this.post = JSON.parse(localStorage.getItem('currentPost'));

		// Si l'article est déjà bookmarké, on change l'icone
		this.isBookmarkChecked();

		// Si l'article est déjà liké, on change l'icone
		this.isLikeChecked();

		// On récupère les commentaires de l'article
		this.getComments();

		// On remonte en haut de la page
		this.scrollToTop();

		this.comeFrom = localStorage.getItem('comeFrom');

	},
};
</script>

<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

	<Navbar title="Article Details" />

	<div class="container">
		<h1 v-if="post">{{ post.title }}</h1>

		<button v-if="this.isConnected == 'true'" type="button" class="bookmark-btn" @click="recupInfosBookmark" > 
			<span class="material-symbols-outlined bookmark-span"> {{ bookmarkState }} </span> 
		</button>

		<hr>

		<p id="description" v-if="post">{{ post.description }}</p>

		<div class="end-article" >
			<!-- Si on vient de la page Profil -->
			<div class="btn-vue" v-if="this.comeFrom === 'ProfilUser'" >
				<ButtonVue text="Back to your Profil" icon="undo" @click="showProfil" />
			</div>
			<!-- Sinon -->
			<div class="btn-vue" v-else >
				<ButtonVue text="Back to articles" icon="undo" @click="showAllArticles" />
			</div>
			<div class="category-like" >
				<p class="like" v-if="post && this.isConnected == 'true'" >
					<span class="material-symbols-outlined like-span" @click="recupInfosLike" > favorite </span> {{ post.nb_like }} 
				</p>
				<p class="category" v-if="post" > {{ post.category }} </p>
			</div>
		</div>

		<div v-if="this.post && this.isConnected === 'true'" id="addcomment" >
			<hr class="separation-comments">
			<AddComment :articleID="this.post.id" :nbComment="this.comments.length" />
		</div>

		<!-- Comments -->
		<div class="comments-container" v-if="this.comments.length !== 0" >
			<center> <h1>Comments</h1> </center>

			<div class="comments" v-for="comment in comments" >
				<CommentItem :post="comment" />
			</div>
		</div>

	</div>

	<ScrollToUpBtn/>

</template>

<style scoped>

	body {
		color : var(--font-color) ;
		margin: 0;
		box-sizing: border-box;
		padding: 0;
	}

	h1 {
		margin:0;
		font-family: var(--font-title);
		text-align:left;
		margin-bottom: 50px;
		margin-top: 100px;
		max-width: 900px;
		margin-right: 40px;
	}

	hr {
		border: 0;
		height: 3px;
		background-color: var(--font-color);
	}

	p {
		text-align:justify;
		margin-top: 50px;
		margin-bottom: 25px;
		max-width: 900px;
		word-wrap: break-word;
	}

	.end-article {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: var(--font-title);
	}

	.category-like {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 120px;
	}

	.btn-vue {
		text-align: left;
		margin: 0;
		padding: 0;
	}

	.category {
		text-align: right;
		color: var(--main-color);
		font-size: 1em;
	}

	.container {
		position: relative;
	}

	.bookmark-btn {
		background-color: transparent;
		border: none;
		color: var(--font-color);
		padding: 0;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;

		position: absolute;
		top: 10px;
		right: 10px;
		user-select: none;
	}

	.material-symbols-outlined:hover {
		color: #efc000;
	}

	p.like span {
		cursor: pointer;
		user-select: none;
	}
	p.like span:hover {
		color: #f91880;
	}

	.material-symbols-outlined {
		color: var(--font-color);
		font-size: 2em;
	}
	.added {
		color: #efc000;
		font-variation-settings:
		'FILL' 1,
		'wght' 700,
		'GRAD' 0,
		'opsz' 48
	}
	.liked {
		color: #f91880;
		font-variation-settings:
		'FILL' 1,
		'wght' 700,
		'GRAD' 0,
		'opsz' 48
	}

	.separation-comments {
		margin-top: 100px;
		margin-bottom: 50px;
		background-color: grey;
		height: 2px;
		width: 50%;
	}

	#addcomment {
		margin: 100px auto;
	}

	.comments-container h1 {
		display: flex;
		justify-content: center;
		margin: 0;
	}

</style>
