<script>
    import Navbar from './Elements/Navbar.vue';

    export default {
    name: '404NotFound',
    data() {
        return {
        message: 'Page Not Found'
        }
    },
    components: { Navbar }
    }

</script>

<template>
    <Navbar title="" />
    <img src="../assets/404_notfound.svg" alt="">
    <h1> {{message}} </h1>
    
    <!--
    <iframe src="https://chromedino.com/" frameborder="0" scrolling="no" width="100%" height="100%" loading="lazy"></iframe>
    -->
        
</template>

<style scoped>

    img {
        width: 700px;
        height: 500px;
        margin-top: 30px;
    }

    h1 {
        font-family: var(--font-title);
        margin-top: 0;
    }

    iframe { 
        position: absolute; width: 100%; height: 100%; z-index: 999; 
    }

</style>