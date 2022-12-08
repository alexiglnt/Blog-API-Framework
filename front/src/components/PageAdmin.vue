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
        methods: {
            confirmationArticleCreated() {
                // On vide les inputs
                this.title = '';
                this.content = '';
                this.image = '';

                // On confirme la création de l'article
                alert( 'Article créé ! 👌');

            },
            nbArticles() {
                const URL_articles = `${instance.defaults.baseURL}/api/articles`;
                axios.get(URL_articles)
                    .then((response) => {
                        this.nbPosts = response.data['hydra:member'].length;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            createArticle() {
                
                if(this.category === '' || this.title === '' || this.content === '') {
                    alert('Veuillez remplir tous les champs');
                } 
                else {
                    const URL = `${instance.defaults.baseURL}/api/articles`;
                    
                    axios.post(URL, {
                        title: this.title,
                        description: this.content,
                        category: this.category,
                        nbLike: 0,
                        nbComment: 0,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                    .then(response => {
                        console.log(response);
                        this.confirmationArticleCreated();
                    })
                    .catch(error => {
                        console.log(error);
                    })

                }
            },
            goTo() {
                this.$router.push({ name: 'ArticleEdition' });
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
        data() {
            return {
                title: '',
                content: '',
                category: '',
                token: '',
                nbPosts: '',
            }
        },
        mounted() {
            this.token = localStorage.getItem('token');
            this.nbArticles();
        }
    }

</script>


<template>
    
    <Navbar title="Admin"/>

    <transition-group appear @before-enter="beforeEnter" @enter="enter">
        <div :data-index="index" :key="1">
            <h1> Create Article </h1>

            <button type="button" @click="goTo" > Article Edition </button>

            <div class="container">

                <form>
                    <div class="container-input">
                        <label for="titleInput">Title</label>
                        <input type="text" name="titleInput" placeholder="Enter the title" v-model="title">
                    </div>

                    <div class="container-input">
                        <label for="categoryInput">Category</label>
                        <select name="pets" id="pet-select" v-model="category" >
                            <option value=""> Please choose an option </option>
                            <option value="General">General 🃏 </option>
                            <option value="Food">Food 🍔 </option>
                            <option value="Science">Science 🧪 </option>
                            <option value="Music">Music 🎵 </option>
                            <option value="Sport">Sport ⚽ </option>
                            
                        </select>
                    </div>

                    <div class="container-input">
                        <label for="descriptionInput">Description</label>
                        <textarea name="descriptionInput" placeholder="Enter the description" id="" cols="30" rows="10" v-model="content" ></textarea>
                    </div> <br>

                    <ButtonVue text="Create Article" icon="add_circle" @click="createArticle" />
                </form>
            </div>
        </div>
    </transition-group>

</template>


<style scoped >

    h1 {
        margin-top: 80px;
        font-family: var(--font-title);
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 0px;
        border-radius: 0.5em;
        box-shadow: 0 0 1em #00000033;
        background: var(--card-color);
    }
    .container-input {
        margin: 50px;
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

    input, textarea, select {
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

    option {
        background: var(--bg-color);
    }

    input:focus, textarea:focus, select:focus {
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

    .confirmation-msg {
        width: 350px;
        height: 150px;
        background: var(--font-color);
        color: var(--bg-color);
        border-radius: 0.5em;
        border-left: var(--main-color) 10px solid;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .close-confirmation-msg {
        color: red;
        background: transparent;
        

        position: relative;
    }
    .close-confirmation-msg:hover {
        outline: none;
        border: none;
        top: 2px;
        right: 2px;
        margin: 0;
        padding: 0;

        position: absolute;
    }

</style>