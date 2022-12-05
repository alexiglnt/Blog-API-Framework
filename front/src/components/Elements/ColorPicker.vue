<script>

    export default {
        data() {
            return {
                colorPicker: '#4f78ff',
            }
        },
        methods: {
            onPickColor() {
                document.body.style.setProperty('--main-color', this.colorPicker);

                // Pour changer la couleur du SVG mais ca ne fonctionne pas
                document.querySelector(".svgClass").style.fill = this.colorPicker;
            },
        }
    }

</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <div class="input-group">
        <label for="color1" id="labelPicker">
            <span class="material-symbols-outlined"> colorize </span>
            {{ colorPicker }} </label>
        <input type="color" id="color1" v-model="colorPicker" @change="onPickColor" >
    </div>

</template>

<style scoped>
    .container {
        max-width: 400px;
        margin-inline: auto;
    }
    .input-group {
        display: flex;
        width: 100%;
        border-radius: 15px;
        outline: 5px solid var(--font-color);
        margin: 15px 0;
        font-weight: bold;
        position: relative;
        transition: 0.3s ease;
    }

    .input-group:hover {
        box-shadow: 0 0 1em #000;
        transition: 0.3s ease;
    }
    .input-group input {
        outline: none;
        cursor: pointer;
    }
    .input-group label {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 22px;
        padding: 20px;
        font-weight: bold;
        border-radius: 15px;
        border: none;
        cursor: pointer;
        background: var(--main-color);
    }
    input[type="color"]{
        position: absolute;
        right: 0;
        visibility: hidden;
    }

    span {
        color: var(--font-color);
    }
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
    }

</style>