<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header id="topbar">
    <div class="navBar">
      <div class="container">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">新建试卷</RouterLink>
          <RouterLink to="/about">题库</RouterLink>
          <RouterLink to="/about">我的答卷</RouterLink>
          <RouterLink to="/about">我的题卷</RouterLink>
          <RouterLink to="/about">我的评卷</RouterLink>
          <RouterLink to="/about">小组/班级</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <aside id="sidebar">
    <nav>
      <RouterLink to="/about" class="link">建试题</RouterLink>
      <RouterLink to="/about" class="link">试题</RouterLink>
      <RouterLink to="/" class="link">Home</RouterLink>
    </nav>
  </aside>
  <div id="content" class="has-sideba">
    <div class="body">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#topbar {
  position: relative;
  top: 0;
  left: 0;
  z-index: var(--vp-z-index-nav);
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.body {
  padding: 32px 24px 96px;
}
#sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: var(--vp-z-index-sidebar);
  padding: 0 32px 96px;
  width: calc(100vw - 64px);
  max-width: var(--vp-sidebar-width-mobile);
  opacity: 0;
  background-color: var(--vt-c-bg);
  box-shadow: var(--vt-c-shadow-3);
  overflow-x: hidden;
  overflow-y: auto;
  transform: translate(-100%);
  transition: background-color 0.5s, opacity 0.5s, transform 0.3s ease;
  background: gray;
}

#sidebar nav {
  padding-top: 24px;
}
#sidebar nav .link {
  display: block;
  padding: 6px 0;
}

@media (min-width: 960px) {
  #content {
    padding-top: var(--vt-nav-height);
  }

  #content {
    padding-left: var(--vp-sidebar-width-small);
  }

  #sidebar {
    top: calc(var(--vt-nav-height) + var(--vt-banner-height, 0px));
    z-index: 1;
    border-right: 1px solid var(--vt-c-divider-light);
    width: var(--vp-sidebar-width-small);
    max-width: 100%;
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    transform: translate(0);
    transition: border-color 0.5s, background-color 0.5s;
  }
  .body {
    padding: 64px 64px 96px;
  }
}
#topbar {
  position: fixed;
  top: var(--vt-banner-height, 0px);
  width: 100%;
}
.navBar {
  position: relative;
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 0 12px 0 24px;
  height: var(--vt-nav-height);
  background-color: var(--vt-c-bg);
  white-space: nowrap;
  transition: border-color 0.5s, background-color 0.5s;
}
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--vp-screen-max-width);
}
</style>
