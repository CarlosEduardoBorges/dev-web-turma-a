const meuAppVue = {
    data() {
        return {
            nome: "Carlos",
            idade: 22,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");