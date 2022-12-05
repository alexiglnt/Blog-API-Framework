<script></script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <hr>

    <p> 
        Made by 
        <a href="https://github.com/alexiglnt" target="_blank" >
             Alexi GALLONET  <span class="material-symbols-outlined"> open_in_new </span> 
        </a> 
        and 
        <a href="https://github.com/lucaswagames" target="_blank" > 
            Lucas CHARBONNIER <span class="material-symbols-outlined"> open_in_new </span>
        </a> 
    </p>

    <hr id="separator2">

    <p> See GitHub repository  <a href="https://github.com/alexiglnt/Blog-API-Framework" target="_blank"> <i style="font-size:24px" class="fa">&#xf09b;</i> </a> </p>

</template>

<style scoped >

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    hr {
        margin: 50px auto;

        width: 50%;
        height: 4px;
        background-color: var(--main-color);
        border: none;
    }

    #separator2 {
        margin: 20px auto;

        width: 5%;
        height: 3px;
        background-color: var(--font-color);
        border: none;
    }

    a {
        color: var(--main-color);
        text-decoration: none;
    }

    a span {
        font-size: 1.2em;
        color: var(--main-color);
        transform: translateY(3px);
    }

    a i {
        color: var(--font-color);
        transform: translateY(3px);
        margin-left: 5px;
        transition: 0.5s ease;
    }

    a i:hover {
        transform: scale(1.1);
        transition: 0.5s ease;
    }

</style>
