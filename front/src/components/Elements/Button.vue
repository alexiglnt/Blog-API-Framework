<script>

    export default {
        name: 'ButtonVue',
        props: ['text', 'icon'],
    };

</script>

<template>
    
    <button type="button" > 
        {{ text }} 
        <span class="material-symbols-outlined"> {{ icon }} </span>
    </button>
    
</template>

<style scoped>

    button {
        background-color: var(--bg-color);
        border: 4px solid var(--main-color);
        border-radius: 2em;
        color: var(--font-color);

        font-family: var(--font-title);
        letter-spacing: 1px;

        padding-top: 2px;
        padding-right: 10px;

        transition: all 0.3s ease;
    }

    button:hover {
        background-color: var(--main-color-hover);
        border: 4px solid var(--main-color-hover);
        transform:skew(-15deg);
        transition: all 0.3s ease;
    }

    button:disabled {
        background-color: #999;
        border: 4px solid rgb(85, 116, 255);
        cursor: not-allowed;
    }

    .material-symbols-outlined {
        color: var(--font-color);
        transform: translateY(6px);
        padding: 0;
        margin: 0;
    }

</style>
