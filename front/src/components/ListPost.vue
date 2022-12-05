<script>
	import { usePiniaStore } from '../stores/postsStore';
	import PostItem from './PostItem.vue';
	import NavBar from './Elements/Navbar.vue';
	import ScrollToUpBtn from './Elements/ScrollToUpBtn.vue';
	import OptionsListPost from './Elements/OptionsListPost.vue';
	import SearchBar from './Elements/SearchBar.vue';

	import instance from '../axios-infos';
	import gsap from "gsap";

	export default {
		props: ['msg'],
		components: {
			PostItem, NavBar, ScrollToUpBtn, OptionsListPost, SearchBar
		},
		// Properties returned fsrom data() become reactive state
		// and will be exposed on `this`.
		data() {
			return {
				posts: [],
				research: '',
				researchPosts: [],
				tabCategory: ['All', 'General', 'Food', 'Science', 'Music', 'Sport'],
				categoryPosts: 'All',
			};
		},

		// Methods are functions that mutate state and trigger updates.
		// They can be bound as event listeners in templates.
		methods: {
			readArticle(data) 
			{
				// On place le post dans le local storage
				localStorage.setItem('currentPost', JSON.stringify(data));

				this.$router.push({
					name: 'Article',
					params: { id: data.id },
				});
			},
			researchQuery() 
			{
				this.researchPosts = [];

				if (this.categoryPosts === 'All')
					// On parcourt le tableau des posts et on regarde si la recherche est inclus dans un titre
					this.posts.forEach((post) => 
					{
						
						let postTitle = post.title.toLowerCase();
						let researchLower = this.research.toLowerCase();

						// Si la recherche est incluse dans le titre du post (on convertit en minuscule)
						if (postTitle.includes(researchLower)) 
						{
							// Si le post n'est pas déjà dans le tableau des posts recherchés on l'ajoute
							if(!this.researchPosts.includes(post))
							{
								this.researchPosts.push(post);
								console.log("LISTE POSTS", this.researchPosts);
							}
							/*else {
								this.researchPosts.splice(this.researchPosts.indexOf(post), 1);
							}*/
						}
						else {
							console.log("Aucun résultat - LISTE POSTS", this.researchPosts); 
						}
					});
				else {
					this.posts.forEach((post) => 
					{
						let postTitle = post.title.toLowerCase();
						let researchLower = this.research.toLowerCase();

						// Si la recherche est incluse dans le titre du post (on convertit en minuscule)
						if (postTitle.includes(researchLower) && post.category === this.categoryPosts) 
						{
							// Si le post n'est pas déjà dans le tableau des posts recherchés on l'ajoute
							if(!this.researchPosts.includes(post))
							{
								this.researchPosts.push(post);
								console.log("LISTE POSTS", this.researchPosts);
							}
							/*else {
								this.researchPosts.splice(this.researchPosts.indexOf(post), 1);
							}*/
						}
						else { 
							console.log("Aucun résultat - LISTE POSTS", this.researchPosts); 
						}
					});
				}
			},
			emptyInput() {
				this.research = '';
				this.researchPosts = [];
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

		// Lifecycle hooks are called at different stages
		// of a component's lifecycle.
		// This function will be called when the component is mounted.
		mounted() {
			const posts = usePiniaStore();
			const URL = `${instance.defaults.baseURL}/api/articles`;

			fetch(URL)   // https://jsonplaceholder.typicode.com/posts
				.then((res) => {
					res.json().then((data) => {
						posts.setPosts(data['hydra:member']);
						this.posts = data['hydra:member'];
					});
				})
				.catch(e => {
					console.log(e);
				})
				
				
			// On précise que l'utilisateur vient de la page Profil (pour le bouton "Retour" dans PostDetails)
            localStorage.setItem('comeFrom', 'listPost');
		},
	};
</script>

<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


	<NavBar title="Articles" />

	<div class="container" >

		<!-- Bloc  de gauche -->
		<div class="container-post">
			<h1> List of Articles </h1>
			
			<!-- Si researchPosts est vide (le tableau contenant les post recherchés), alors on affiche tout les posts -->
			
			
			<div v-if="research !== ''" >
				<transition-group appear @before-enter="beforeEnter" @enter="enter">
					<div v-for="post in researchPosts" >
						<PostItem :post="post" textButton="Lire l'article" :handleClick="this.readArticle" />
					</div>
				</transition-group>
			</div>
			<div v-if="research == ''" >
				<div v-if ="categoryPosts === 'All'"> 
					<transition-group appear @before-enter="beforeEnter" @enter="enter">
						<div v-for="post in posts" :data-index="index" :key="post.id">
							<PostItem :post="post" textButton="Lire l'article" :handleClick="this.readArticle" />
						</div>
					</transition-group>
				</div>
				<div v-else >
					<div v-for="post in posts" >
						<transition-group appear @before-enter="beforeEnter" @enter="enter">
							<div v-if="post.category === categoryPosts" >
								<PostItem :post="post" textButton="Lire l'article" :handleClick="this.readArticle" />
							</div>
						</transition-group>
					</div>
				</div>
			</div>

			<ScrollToUpBtn/>
		</div>

		<!-- Bloc  de droite -->
		<div class="container-option" > <!-- data-aos="zoom-in" -->

			<h1 id="optionTitle">Options</h1>

			<div class="option-bloc">

				<!-- CODE EN COMMENTAIRE DONC NE MARCHE POUR L'INSTANT PAS -->
				<h2> Search some articles </h2>
				<div class="search-bar">
					<span class="material-symbols-outlined"> search </span>
					<input type="text" name="searchbar" placeholder="Tap to search" v-model="research" @input="researchQuery" > 
				</div> <br> <br>

				<h2> Sort by category </h2>

				<div class="category-btn">
					<div>
						<input type="radio" class="btn-radio" name="btnradio" v-model="categoryPosts" :value="tabCategory[0]" @click="emptyInput" checked>
						<label> All </label>
					</div>

					<div>
						<input type="radio" class="btn-radio" name="btnradio" v-model="categoryPosts" :value="tabCategory[1]" @click="emptyInput" >
						<label> General </label>
					</div>
					<div>
						<input type="radio" class="btn-radio" name="btnradio" v-model="categoryPosts" :value="tabCategory[2]" @click="emptyInput" >
						<label> Food </label>
					</div>
					<div>
						<input type="radio" class="btn-radio" name="btnradio" v-model="categoryPosts" :value="tabCategory[3]" @click="emptyInput" >
						<label> Science </label>
					</div>
					<div>
						<input type="radio" class="btn-radio" name="btnradio" v-model="categoryPosts" :value="tabCategory[4]" @click="emptyInput" >
						<label> Music </label>
					</div>
					<div>
						<input type="radio" class="btn-radio" name="btnradio" v-model="categoryPosts" :value="tabCategory[5]" @click="emptyInput">
						<label> Sport </label>
					</div>
				</div>

			</div>



			<!--<OptionsListPost/>-->
		</div>

	</div>
	
	

</template>

<style scoped>

	h1 {
		margin-top: 100px;
		font-family: var(--font-title);
	}

	h2 {
		font-family: var(--font-title);
	}

	#optionTitle {
		margin-top: 65px;
	}

	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}

	.container-option {
		width: 400px;
		height: 400px;
		margin : 0;
		margin-top: 3em;
	}

	.search-bar {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 200px;
        max-width: 500px;
        padding: 0.5em;
        border: none;
        border-radius: 0.5em;
        box-shadow: 0 0 1em #00000033;
        text-align: center;
        background-color: var(--font-color);
        opacity: 0.8;
        color: var(--bg-color);
		margin: 0 auto;
    }

    input {
        background-color: none;
        border: none;
        background: none;
        color: var(--bg-color);
    }

    input:focus {
        outline: none;
    }

	.option-bloc {
        align-items: center;

        background-color: var(--main-color);
        color: var(--font-color);

        border-radius: 0.5em;
        box-shadow: 0 0 1em #00000033;

        width: 100%;
        height: 565px;

        opacity: 0.8;
		padding-top: 30px;
		margin: 0;
	}

	.category-btn div {
		display: flex;
		width: 100%;
		margin: 0 37%;
	}

	input[type='radio'] {
		width: 50px;
	}
	
</style>
