<script>
    import SearchBar from './SearchBar.vue';

    export default {
        components: {
            SearchBar
        },
    }


</script>

<template>

    <div class="container">

        <form>
            <label>Tape something</label>
            <SearchBar/>
        </form>

        
        <form action="">
            <label for=""> Radio </label>
            <input type="radio" name="" id="">
            <label for=""> Radio </label>
            <input type="radio" name="" id="">
            <label for=""> Radio </label>
            <input type="radio" name="" id="">
        </form>

    </div>

</template>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: var(--main-color);
        color: var(--font-color);

        border-radius: 0.5em;
        box-shadow: 0 0 1em #00000033;

        width: 100%;
        height: 565px;

        opacity: 0.8;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>