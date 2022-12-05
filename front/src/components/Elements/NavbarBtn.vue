<script>

    export default {
        props: {
            routeName: {
                type: String,
                default: "Home"
            },
            icon: {
                type: String,
                default: "cottage"
            },
        },
        methods:
        {
            goTo() {
                this.$router.push({
                    name: this.routeName,
                });
            },
        },
    };
    
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <button @click="goTo" >
        <span class="material-symbols-outlined"> {{ icon }} </span>
    </button>

</template>


<style scoped>

    button {
        background-color: var(--main-color);
        cursor: pointer;
        border: none;

        transition: all 0.5s ease;
    }

    button:hover {
        transition: all 0.5s ease;
    }

    span {
        color: var(--font-color);
        font-size: 2em;
        margin: 0;

        transition: 0.4s ease;
    }

    span:hover {
        transform: scale(1.1);
        transition: 0.4s ease;
    }

    
</style>