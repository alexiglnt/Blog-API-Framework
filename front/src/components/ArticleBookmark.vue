<script>
    import { usePiniaStore } from '../stores/bookmarksStore';
    import Navbar from './Elements/Navbar.vue';
    import ButtonVue from './Elements/Button.vue';

	import instance from '../axios-infos';
	import axios from 'axios';

    export default {
        components: {
            Navbar, ButtonVue
        },
        data() {
            return {
                bookmark: undefined,
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
            };
        },
        methods: {
            backToMyBookmarks() {
                this.$router.push({
					name: 'My-Bookmarks',
			    });
            },
			backToHome() {
				this.$router.push({
					name: 'Home',
				});
			},
            changeDesignBookmark() {
                const bookmarkBtn = document.querySelector('.bookmark-span');

                bookmarkBtn.classList.toggle('added');
                this.bookmarkState = this.bookmarkState === 'bookmark_add' ? 'bookmark' : 'bookmark_add';
		    },
			changeDesignLike() {
				const likeBtn = document.querySelector('.like-span');
				likeBtn.classList.toggle('liked');
			},
            isBookmarksChecked() {
                const bookmarkStore = usePiniaStore();
                this.bookmark = bookmarkStore.getBookmark(this.$route.params.id);

                // Si l'article est déjà bookmarké, on change l'icone
                const URL_get = `${instance.defaults.baseURL}/api/bookmarks`;

                axios.get(URL_get)
                .then((response) => {
                    const bookmarks = response.data['hydra:member'];

                    bookmarks.forEach((bookmark) => {
                        if(localStorage.getItem('isConnected') === 'true') 
                        {
                            if (bookmark.articleID === this.bookmark.id && bookmark.userID === JSON.parse(localStorage.getItem('userInfos')).id) 
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
							if (like.articleId === this.bookmark.id && like.userId === JSON.parse(localStorage.getItem('userInfos')).id) 
							{
								this.isLiked = true;
								this.changeDesignLike();
							}
						}
					});
				})
			},
			removeFromBookmarks() {

				// On définis les valeurs que l'on va utiliser pour la requête
				let storage = '';
				let userId = 0;
				if (localStorage.getItem('isConnected') === 'true') {
					storage = localStorage.getItem('userInfos');
					userId = JSON.parse(storage).id;
				}

				// On définis l'url de la requête
				const URL = `${instance.defaults.baseURL}/api/bookmarks`;

				// On récupère les bookmarks et on supprime celui qui correspond à l'article et à l'utilisateur
				axios.get(URL)
				.then((response) => {
					const bookmarks = response.data['hydra:member'];

					bookmarks.forEach((bookmark) => {
						if(localStorage.getItem('isConnected') === 'true') 
						{
							if (bookmark.articleID === this.bookmark.id && bookmark.userID === JSON.parse(localStorage.getItem('userInfos')).id) 
							{
								axios.delete(`${URL}/${bookmark.id}`);
							}
						}
					});
				});

				// On retourne sur la page des bookmarks
				this.backToHome();
			},
			addLike() {
				const URL = `${instance.defaults.baseURL}/api/articles/${this.bookmark.id}`;

				let nbLike = this.bookmark.nb_like + 1;

				axios.put(URL, {
					nbLike: nbLike
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				})
			},
			removeLike() {
				const URL = `${instance.defaults.baseURL}/api/articles/${this.bookmark.id}`;

				let nbLike = this.bookmark.nb_like - 1;

				axios.put(URL, {
					nbLike: nbLike
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				})
			},
			addInfosLike() {
				const URL = `${instance.defaults.baseURL}/api/likes`;

				axios.post(URL, {
					articleId: this.bookmark.id,
					userId: JSON.parse(localStorage.getItem('userInfos')).id
				})
			},
			removeInfosLike() {
				const URL = `${instance.defaults.baseURL}/api/likes`;

				axios.get(URL)
				.then((response) => {
					const likes = response.data['hydra:member'];

					likes.forEach((like) => {
						if (like.articleId === this.bookmark.id && like.userId === JSON.parse(localStorage.getItem('userInfos')).id) 
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

				const postID = this.bookmark.id;

				if (this.isLiked === true) {
					this.removeLike();
					this.removeInfosLike();
				}
				else {
					this.addLike();
					this.addInfosLike();
				}
				
			},
        },
        mounted() {
            const bookmarkStore = usePiniaStore();
            this.bookmark = bookmarkStore.getBookmark(this.$route.params.id);


			this.isConnected = localStorage.getItem('isConnected');

			this.isBookmarksChecked();
			this.isLikeChecked();
        }
    }

</script>


<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <Navbar title="Article from Bookmarks" /> <br> <br>
    <div class="container">
		<h1 v-if="bookmark">{{ bookmark.title }}</h1>

		<button type="button" class="bookmark-btn" @click="removeFromBookmarks" > 
			<span class="material-symbols-outlined bookmark-span"> {{ bookmarkState }} </span> 
		</button>

		<hr>

		<p id="description" v-if="bookmark" > {{ bookmark.description }} </p>

		<div class="end-article" >
			<div class="btn-vue">
				<ButtonVue text="Back to articles" icon="undo" @click="backToMyBookmarks" />
			</div>
			<div class="category-like" >
				<p class="like" v-if="bookmark && this.isConnected == 'true'" >
					<span class="material-symbols-outlined like-span" @click="recupInfosLike" > favorite </span> {{ bookmark.nb_like }} 
				</p>
				<p class="category" v-if="bookmark" > {{ bookmark.category }} </p>
			</div>
		</div>
	</div>

</template>


<style scoped >

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

</style>