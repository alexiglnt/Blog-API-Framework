<script>
    import instance from '../../axios-infos';
	import axios from 'axios';

    export default {
        props: ['articleID', 'nbComment'],
        data() {
            return {
                content: '',
            };
        },
        methods: {
            addInfosComment() {

                const URL = `${instance.defaults.baseURL}/api/comments`;

                axios.post(URL, {
                    content: this.content,
                    userId: JSON.parse(localStorage.getItem('userInfos')).id,
                    articleId: this.articleID,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            incrementComment() {
                const URL = `${instance.defaults.baseURL}/api/articles/${this.articleID}`;

                axios.put(URL, {
                    nbComment: this.nbComment + 1,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });

            },
            addComment() 
            {
                if (this.content !== '') 
                {
                    this.addInfosComment();
                    this.incrementComment();
                    alert('Your comment will be added !');
                    document.getElementById('textarea').value = '';
                }
                else {
                    alert('You cannot send an empty comment');
                }
            }
        },
    }

</script>


<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

    <div class="container">
        <textarea placeholder="Write a comment..." cols="30" rows="10" id="textarea" v-model="content" ></textarea>
        <button @click="addComment">
            <span class="material-symbols-outlined"> send </span>
        </button>
    </div>

</template>


<style scoped >

    .container {
        position: relative;
    }

    textarea {
        width: 90%;
        border-radius: 10px;
        border: none;
        padding: 10px;
        font-size: 1.2em;
        background: var(--card-color);
        box-shadow: 0 0 1em #00000033;
        border: var(--main-color) 5px solid;
        color: var(--font-color);
        resize: none;
    }

    textarea:focus {
        outline: none;
    }

    button {
        background-color: var(--main-color);
        border: none;
        color: var(--font-color);
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 10px;
        margin-top: 10px;
        margin-left: 10px;

        width: 50px;

        position: absolute;
        bottom: 25px;
        right: 55px;

        transition: all 0.3s ease;
    }

    button:hover {
        box-shadow: 0 0 0.5em var(--main-color);
        transition: all 0.3s ease;
    }

    .material-symbols-outlined {
        transform: translateY(2px);
    }

</style>