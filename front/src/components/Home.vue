<script>
    import ButtonVue from './Elements/Button.vue';
    import Navbar from './Elements/Navbar.vue';
    import ScrollToUp from './Elements/ScrollToUpBtn.vue';
    import Svg1 from './Elements/Svg1.vue';
    import Svg2 from './Elements/Svg2.vue';
    import ColorPicker from './Elements/ColorPicker.vue';
    import Footer from './Footer.vue';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    import gsap from 'gsap'

    export default {
        components: {
            ButtonVue, Navbar, ScrollToUp, Svg1, Svg2, ColorPicker, Footer
        },
        methods: {
            showAllArticles() {
                this.$router.push({
                    name: 'All-Articles',
                });
                console.log(data.title);
            },
            redirect() {
                this.$router.push({
                    name: 'My-Bookmarks',
                });
                console.log(data.title);
            },
            changeThemeMode() {
                document.body.classList.toggle("dark-theme");
                console.log("dark-theme");
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
                currentTheme: 'light',
                ID: 1
            };
        },
        mounted() {

        },
    }

</script>

<template>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <h1> Welcome to <span> Artikel's </span> </h1>

    <transition-group appear @before-enter="beforeEnter" @enter="enter">
        <div class="container" :data-index="index" :key="1" > <!-- data-aos="zoom-in" -->
            <div class="bloc" id="first">
                <h2> Discover our website 🤯  </h2>
                <p> 
                    Want to read articles on any topic? <br>
                    You are in the right place 👌 
                </p>

                <ButtonVue text="Click here to see articles" icon="chevron_right" @click="showAllArticles" />
            </div>

            <div class="bloc2" id="second" >
                <Svg1/>
            </div>
        </div>
    </transition-group>
    
    <Navbar title="Home" />

    <br><br><br><br>

    
    <div class="container" > <!-- data-aos="zoom-in" -->
        <div class="bloc2">
            <Svg2/>
        </div>
        <div class="bloc">
            <h2> Change the theme of the website ! 🖌️ </h2>
            <p> 
                You want to change the main color of the site ? <br>
                Choose one with the color picker ⬇️ 
            </p>

            <ColorPicker/>
        </div>
    </div>

    <ScrollToUp />
    <Footer/>

</template>

<style scoped> 

    html {
        height: 100vh;
        margin: 0;
        padding: 0;
    }

    h1 {
        font-size: 4em;
        color: var(--main-color);
        margin-top: 80px;
        font-family: var(--font-title);
    }

    h1 span {
        color: var(--bg-color);
        text-shadow: 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color), 0 0 3px var(--main-color);
        font-size: 1.2em;
        border-bottom: 2px solid var(--main-color);
    }

    .container {
        display: flex;
        justify-content: space-around;
    }

    #first {
        width: 350px;
        height: 250px;
    }

    #second {
        margin-right: 0;
        margin-left: 0;
    }

    .bloc {
        width: 700px;
        height: 300px;
        background: var(--bg-color);
        border-radius: 0.5em;
        box-shadow: 0 0 1em #00000033;
        padding: 30px;
        background-color: var(--card-color);
    }

    .bloc p {
        font-size: 1.2em;
        color: var(--font-color);
        text-align: justify;
        letter-spacing: 1px;
        word-spacing: 2px;
        line-height: 30px;

        margin-bottom: 70px;
    }

    .bloc h2 {
        font-size: 2em;
        text-align: left;
        margin: 0;
        font-family: var(--font-title);
    }

    .bloc, .bloc2 {
        margin: 30px;
    }


/*
    .blocFirst {
        width: 350px;
        height: 250px;
        background: var(--bg-color);
        border-radius: 0.5em;
        box-shadow: 0 0 1em #00000033;
        padding: 30px;
    }

    .blocFirst p {
        font-size: 1.2em;
        color: var(--font-color);
        text-align: justify;
        letter-spacing: 1px;
        word-spacing: 2px;
        line-height: 30px;

        margin-bottom: 70px;
    }

    .blocFirst h2 {
        font-size: 2em;
        text-align: left;
        margin: 0;
        font-family: var(--font-title);
    }

    .blocFirst, .blocSecond {
        margin: 30px;
    }*/

</style>