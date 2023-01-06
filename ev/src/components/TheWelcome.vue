<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
  <div>input:<input type="file" @change="upload($event)" /></div>

  <div ref="imageTofile" class="zone">
    <div v-for="img in imgs" :key="img">
      <img crossorigin="anonymous" :src="img" alt="img" />
    </div>
  </div>

  <img :src="htmlUrl" v-show="isShow" />
  <button @click="toImage">截取</button>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener"
      >official documentation</a
    >
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
      rel="noopener"
      >Vite</a
    >. The recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener"
      >VSCode</a
    >
    +
    <a
      href="https://github.com/johnsoncodehk/volar"
      target="_blank"
      rel="noopener"
      >Volar</a
    >. If you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>
    and
    <a href="https://on.cypress.io/component" target="_blank"
      >Cypress Component Testing</a
    >.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener"
      >Vue Router</a
    >,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener"
      >Vue Test Utils</a
    >, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener"
      >Vue Dev Tools</a
    >. If you need more resources, we suggest paying
    <a
      href="https://github.com/vuejs/awesome-vue"
      target="_blank"
      rel="noopener"
      >Awesome Vue</a
    >
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a
    >, our official Discord server, or
    <a
      href="https://stackoverflow.com/questions/tagged/vue.js"
      target="_blank"
      rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener"
      >our mailing list</a
    >
    and follow the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
      >@vuejs</a
    >
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its
    sustainability. You can help us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener"
      >becoming a sponsor</a
    >.
  </WelcomeItem>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      imgs: localStorage.getItem("imgs")
        ? JSON.parse(localStorage.getItem("imgs"))
        : [],
      htmlUrl: "",
      isShow: false,
    };
  },
  methods: {
    toImage() {
      html2canvas(this.$refs.imageTofile, {
        backgroundColor: null,
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        let url = canvas.toDataURL("image/png");
        this.htmlUrl = url;
        if (this.htmlUrl) {
          this.isShow = true;
        }
      });
    },
    upload(event) {
      let file = event.target.files[0];
      (async () => {
        let content = await this.getPictureBase64(file);
        // console.log(content);
        this.imgs.length = 0;
        // this.imgs.push(content);
        // localStorage.setItem("imgs", JSON.stringify(this.imgs));

        fetch("img" + this.imgs.length, { method: "put", body: content })
          .then((e) => e.json())
          .then((e) => {
            console.log(e);
            this.imgs.push(e.path);
            localStorage.setItem("imgs", JSON.stringify(this.imgs));
          });
        /*fetch(content)
          .then((r) => r.blob())
          .then((b) => b.arrayBuffer())
          .then((buff) =>
            console.log(new Int8Array(buff)
          )
          .catch((e) => console.log(e));*/
      })();
    },
    getPictureBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
  },
};
</script>

<style scoped>
.zone {
  width: 100%;
}
.zone :deep(img) {
  max-width: 100%;
}
</style>
