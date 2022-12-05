<script>

    export default {
        methods: {
            changeThemeMode() {
                console.log('isDark avant : ', this.isDark);
                

                if (this.darkMode === 'light_mode')
                {
                    this.darkMode = 'dark_mode';
                    this.isDark = true;
                }
                else
                {
                    this.darkMode = 'light_mode';
                    this.isDark = false;
                }
                console.log('isDark aprés : ', this.isDark);
                
                localStorage.setItem('isDark', this.isDark);
                

                const body = document.body;
                body.classList.toggle("dark-theme");       
            },
        },
        data() {
            return {
                isDark: 'false',
                darkMode: 'light_mode',
            };
        },
        mounted() {
            this.isDark = localStorage.getItem('isDark');

            if (this.isDark === 'true')
            {
                this.darkMode = 'dark_mode';
                const body = document.body;
                body.classList.add("dark-theme");  
            }
            else
            {
                this.darkMode = 'light_mode';
            }
            
        },
    }

</script>


<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

    <button @click="changeThemeMode"> 
        <span id="toggleIcon" class="material-symbols-outlined ico1 active"> {{ darkMode }} </span>
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

    .ico1 {
        display: none;
        color: var(--font-color);

        transition: 0.5s ease;
    }

    .ico2 {
        display: none;
        color: var(--font-color);

        transition: 0.5s ease;
    }

    .active {
        display: block;
    }

    span {
        color: var(--font-color);
        font-size: 2em;
        margin: 0;

        transition: 0.3s ease;
    }

    span:hover {
        transform: rotate(45deg);
        transition: 0.8s ease;
    }

</style>