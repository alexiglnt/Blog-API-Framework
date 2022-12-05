<script>
    import { usePiniaStore } from '../stores/bookmarksStore';

    import Navbar from './Elements/Navbar.vue';
    import ButtonVue from './Elements/Button.vue';
	import PostItem from './PostItem.vue';
	import ScrollToUpBtn from './Elements/ScrollToUpBtn.vue';
	import Svg3 from './Elements/Svg3.vue';

    import instance from '../axios-infos';
    import axios from 'axios';

    export default {
        
        components: {
            Navbar, ButtonVue, PostItem, ScrollToUpBtn, Svg3
        },
        data() {
            return {
                listArticlesID: [],
                listBookmarks: [],
            };
        },
        methods: {
            getArticles() {
                const URL = `${instance.defaults.baseURL}/api/articles`;

                axios.get(URL)
                    .then((response) => {
                        const listOfAllArticles = response.data['hydra:member'];

                        listOfAllArticles.forEach((article) => {
                            this.listArticlesID.forEach((articleID) => {
                                if (article.id === articleID) {
                                    this.listBookmarks.push(article);
                                }
                            });
                        });
                        
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            // Récupère les bookmarks de l'utilisateur
            getBookmarks(userId) {
                const URL = `${instance.defaults.baseURL}/api/bookmarks`;

                axios.get(URL)
                    .then((response) => {
                        const bookmarks = response.data['hydra:member'];

                        bookmarks.forEach((bookmark) => {
                            if (bookmark.userID === userId) {
                                this.listArticlesID.push(bookmark.articleID);
                            }
                        });
                        this.getArticles();
                    });
            },
            readArticle(idPost) {
                this.$router.push({
					name: 'Article',
					params: { id: idPost },
				});
            }
        },
        mounted() {
                let storage = '';
                let userID = 0;

                const storeBookmarks = usePiniaStore();

                if(localStorage.getItem('isConnected') === 'true') {
                    storage = localStorage.getItem('userInfos');
                    userID = JSON.parse(storage).id;

                    storeBookmarks.setBookmarks(this.listBookmarks);
                }
                this.getBookmarks(userID);
        },
    }
</script>


<template>

    <!-- <Navbar title="My Bookmarks" /> <br> <br> <br> -->

	<h2 v-if="this.listBookmarks.length === 1" > You have {{ this.listBookmarks.length }} bookmark </h2>
	<div v-else-if="this.listBookmarks.length === 0" >
		<h2> You have {{ this.listBookmarks.length }} bookmark 😥 </h2>
		<Svg3 />
	</div>
	<h2 v-else > You have {{ this.listBookmarks.length }} bookmarks </h2>

    <div v-for="bookmark in listBookmarks" >
		<PostItem :post="bookmark" textButton="Lire l'article" :handleClick="() => { readArticle(bookmark.id) }" />
    </div>

	<!-- <ScrollToUpBtn/> -->

</template>


<style scoped>

    h2 {
		margin-inline: 50px;
	} 

	.read-the-docs {
		color: #888;
	}

	.card {
		background-color: var(--card-color);
		border-radius: 0.5em;
		box-shadow: 0 0 1em #00000033;
		padding: 1em;
		margin: 2em;
		margin-top: 3em;
		margin-bottom: 3em;
		color: var(--font-color);
		width: 700px;

		border-top: var(--main-color) 5px solid;
		word-wrap: break-word;

		position: relative;
	}

	.card p {
		text-align: justify;
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
		top: 25px;
		right: 25px;
	}

	.material-symbols-outlined:hover {
		color: #efc000;
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

	ul {
		list-style-type: none;
	}

	h2 span {
		font-size: 0.7em;
		color: var(--main-color);
	}


	.btn {
		background-color: #00BFA6;
		border: none;
		border-radius: 0.5em;
		color: #fff;
		padding: 0.5em 1em;
		margin: 1em;

		transition: all 0.8s ease;
	}

	.btn:hover {
		background-color: #4a4aff;
		transform: scale(1.1);
		transition: all 0.3s ease;
	}

	.post-title {
		/*text-transform: uppercase;*/
		font-family: var(--font-title);
	}

	.card p {
		white-space: pre-wrap;
		margin: 10px;
	}

	details {
		max-height: 200px;
		border-radius: 4px;
		padding: .5em .5em 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	summary {
		font-weight: bold;
		margin: -.5em -.5em 0;
		padding: .5em;
	}

	details[open] {
		padding: .5em;
	}

	details[open] summary {
		border-bottom: 1px solid #aaa;
		margin-bottom: .5em;
	}

</style>