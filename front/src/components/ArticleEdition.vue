<script>
  import Quill from "quill";
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.bubble.css";
  import "quill/dist/quill.snow.css";
  import Navbar from './Elements/Navbar.vue';

  import instance from '../axios-infos';
  import axios from 'axios';

  import gsap from "gsap";

  export default {
    props: {
      modelValue: {
        type: String,
        default: "",
      },
    },
    components: {
      Navbar
    },
    data() {
      return {
        editor: null,
        authors: null,
        categories: null,
        title: '',
        content: '',
        category: '',
        token: '',
        nbPosts: '',
      };
    },
    mounted() {

      // On récupère le token
      this.token = localStorage.getItem('token');

      this.editor = new Quill(this.$refs.editor, {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'header': '2' }, { 'header': '3' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image']
          ],
        },
        //theme: 'bubble',
        theme: "snow",
        formats: ["bold", "underline", "header", "italic", "link"],
        placeholder: "Type something in here !",
      });
      this.editor.root.innerHTML = this.modelValue;
    },

    methods: {
      // Creattion of JSON Object + POST in DB when button is clicked
      SaveArticle: function () {
        var selectCategory = document.getElementById("Category");

        var article = {
            content: this.editor.root.innerHTML
          }
        axios.post('http://192.168.165.250:3000/articles', article)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      confirmationArticleCreated() {
          // On vide les inputs
          this.title = '';
          this.category = '';
          this.editor.root.innerHTML = '';

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
          
          if(this.category === '' || this.title === '' || this.editor.root.innerHTML === '') {
              alert('Veuillez remplir tous les champs');
          } 
          else {
              const URL = `${instance.defaults.baseURL}/api/articles`;
              
              console.log(this.editor.root.innerHTML);

              axios.post(URL, {
                  title: this.title,
                  description: this.editor.root.innerHTML,
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
  };
</script>

<template>
  <Navbar title="Admin" /> <br> <br>

  <transition-group appear @before-enter="beforeEnter" @enter="enter">
    <div :data-index="index" :key="1" >
      <form @submit.prevent="submit">

        <div class="container-input">
            <label for="titleInput">Title</label>
            <input type="text" name="titleInput" placeholder="Enter the title" v-model="title">
        </div>

          <!-- Choix catégorie -->
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

      </form>

      <!-- Quill Editor -->
      <div ref="editor" class="quillEditor"></div>

      <div class="pushArticle">
        <button class="PushButton" @click="createArticle">Publier l'article</button>
        <p id="Errors"></p>
      </div>
    </div>
  </transition-group>


</template>


<style scoped>
  .quillEditor {
    height: 300px;
    width: 700px;
    margin: 20px 0;
  }

  .ArticleInfos {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
  }

  .form-control-LargeInput {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
  }

  .form-control-smallInput {
    width: 30%;
    height: 50px;
    margin: 10px 0;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
  }

  .PushButton {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    background-color: #2c3e50;
    color: white;
  }

  .pushArticle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
  }



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
