<script>
	import ButtonVue from './Elements/Button.vue';

	export default {
		components: {
				ButtonVue,
		},
		props: ['post', 'handleClick', 'textButton'],
		// Properties returned from data() become reactive state
		// and will be exposed on `this`.
		data() {
			return {
				isOpen: true,
				stateSummary: "Close",
				bookmarkState: 'bookmark_add',
				localPost: undefined,
			};
		},

		// Methods are functions that mutate state and trigger updates.
		// They can be bound as event listeners in templates.
		methods: {
			clicked() {
				this.handleClick(this.post);
			},
			changeSummaryState() {
				this.stateSummary = this.isOpen ? "Open" : "Close";
				this.isOpen = !this.isOpen;
			},
		},

		// Lifecycle hooks are called at different stages
		// of a component's lifecycle.
		// This function will be called when the component is mounted.
		mounted() 
		{
			document.querySelector(`.content${this.post.id}`).innerHTML = this.post.description;
		},
	};
</script>

<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

	<div class="card">
		
		<h2 class="post-title" >{{ post.title }} | <span> {{ post.category }} </span> </h2>

		<details open>
			<summary @click="changeSummaryState" > {{ stateSummary }} description</summary>
			
			<div :class="('content'+post.id)" ></div>

		</details> <br>

		<ButtonVue @click="clicked" text="Read article" icon="chevron_right" />
		
		 <p class="comment" > <span class="material-symbols-outlined"> comment </span> {{ post.nb_comment }} </p>
		<p class="like" > <span class="material-symbols-outlined"> favorite </span> {{ post.nb_like }} </p>

	</div>
	
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

	p.like {
		bottom: 15px;
		right: 25px;
		position: absolute;
		margin: 0;
		align-items: center;
		font-weight: 700;
	}

	p.like span {
		transform: translateY(5px);
	}

	p.comment {
		bottom: 15px;
		left: 25px;
		position: absolute;
		margin: 0;
		align-items: center;
		font-weight: 700;
	}

	p.comment span {
		transform: translateY(5px);
	}

	p.like:hover, p.comment:hover {
		cursor: default;
	}

	.material-symbols-outlined {
		color: var(--font-color);
		font-variation-settings:
			'FILL' 0,
			'wght' 700,
			'GRAD' 0,
			'opsz' 48
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
