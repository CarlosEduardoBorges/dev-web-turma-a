<template>
    <div>
        <footer class="footer">
            <p>BEM VINDO: {{ nome }} OLÁ MUNDO DO <b>VUE COM CLI</b></p>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "HomeComponent",
        data() {
            return {
                nome: "CARLOS EDUARDO RODRIGUES BORGES GONÇALVES",
            };
        },
    };
</script>