<script>
import NavBar from './Elements/NavBar.vue';
import ButtonVue from './Elements/Button.vue';
import Navbar from './Elements/NavBar.vue';

import axios from 'axios';
import instance from '../axios-infos';

export default {
    components: { NavBar, ButtonVue, Navbar },
    data() {
        return {
            title: '',
            body: '',
        }
    },
    methods: {
        redirect() {
            this.$router.push({
                name: 'All-Articles',
            });
        },
        async createArticle() 
        {
            const URL = `${instance.defaults.baseURL}/api/articles`;

            axios.post(URL, {
                title: this.title,
                description: this.body
            })
            .then(response => {
                console.log(response);
                this.redirect();
            })
        },
    }
}

</script>


<template>

    <div class="container">

        <Navbar title="Create Article"/>

        <form>
            <div class="container-input">
                <label for="titleInput">Title</label>
                <input type="text" name="titleInput" placeholder="Enter the title" v-model="title">
            </div>

            <div class="container-input">
                <label for="descriptionInput">Description</label>
                <textarea name="descriptionInput" placeholder="Enter the description" id="" cols="30" rows="10" v-model="body" ></textarea>
            </div> <br>

            <ButtonVue text="Create Article" @click="createArticle" />
        </form>

    </div>

</template>


<style scoped >

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

    input, textarea {
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