<script>

    export default {
        methods: {
            searchPost() {
                console.log(research.value);
            }
        },
    }

</script>


<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <div class="search-bar">
        <span class="material-symbols-outlined"> search </span>
        <input type="text" placeholder="Tap to search" v-model="research" @input="searchPost" > 
    </div>

</template>


<style scoped>

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

</style>