<script>
    import ThemeMode from './DarkModeBtn.vue';
    import SearchBar from './SearchBar.vue';
    import NavbarBtn from './NavbarBtn.vue';

    import gsap from "gsap";

    export default {
        components: {
            ThemeMode, SearchBar, NavbarBtn
        },
        props: {
            title: {
                type: String,
                default: "Artikel's"
            }
        },
        data() {
            return {
                isConnected: false,
                isAdmin: false,
            }
        },
        methods: {
            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.transform = "translateY(-80px)";
            },
            enter(el) {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    delay: el.dataset.index * 0.2,
                });
            },
        },
        mounted() {
            this.isConnected = localStorage.getItem('isConnected');
            console.log('isConnected : ', this.isConnected);

            const storage = localStorage.getItem('userInfos');

            if (this.isConnected === 'true') {  
                if (JSON.parse(storage).roles[0] === 'ROLE_ADMIN') {
                    this.isAdmin = 'true';    
                }
            }
            
        },
    }

</script>


<template>
    
    <nav>
        <div class="container-right">
            <NavbarBtn routeName="Home" icon="cottage" />
            <NavbarBtn routeName="All-Articles" icon="newspaper" />
        </div>  

        <transition-group appear @before-enter="beforeEnter" @enter="enter">
            <h2 :data-index="index" :key="1"> {{ title }} </h2> 
        </transition-group>

        <div class="container-right">
            <ThemeMode/>
            <!--<Btnlogin/>-->
            <NavbarBtn routeName="Login" icon="person" />

            <!-- Si l'utilisateur est connecté on affiche le bouton -->
            <div v-if="isConnected === 'true'" > 
                <NavbarBtn routeName="Profil" icon="account_box" />
            </div>


            <!-- <div class="menu" >
                <NavbarBtn routeName="Profil" icon="account_box" />
                <div class="menu-deroulant" >
                    <ul>
                        <li> <router-link to="/Home" class="router-link" > Profil </router-link> </li>
                        <li> <router-link to="/Home" class="router-link" > Bookmarks </router-link> </li>
                        <li> <router-link to="/Home" class="router-link" > Admin </router-link> </li>
                    </ul>
                </div>
            </div> -->


            <!-- Si l'utilisateur est ADMIN on affiche le bouton -->
            <div v-if="isAdmin === 'true'" >
                <NavbarBtn routeName="Admin" icon="admin_panel_settings" />
            </div>

        </div>

    </nav>

</template>


<style scoped>

    ul {
        list-style: none;
    }

    .menu {
        position: relative;
        display: inline-block;
    }

    .menu-deroulant {
        position: absolute;
        list-style: none;
        margin-top: 25px;
        box-shadow: 0 0 1em #0033;
        border-radius: 0.5em;
    }

    .router-link  {
        color: var(--bg-color);
    }
    .router-link:hover  {
        color: var(--main-color);
    }

    nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1em;
        background-color: var(--main-color);
        color: var(--font-color);
        box-shadow: 0 0 3px var(--font-color);
        opacity: 0.9;

        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        z-index: 100;
    }

    h2 {
        font-family: var(--font-title);
        font-size: 3em;
        margin: 0;
        transition: 0.5s ease;
    }

    h2:hover {
        transform: scale(1.1);
        transition: 0.5s ease;
    }

    .container-right {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 200px;
    }


</style>