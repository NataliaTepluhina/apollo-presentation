<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand to="/">Rick & Morty</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" :active="$route.path === '/'">Characters</b-nav-item>
        <b-nav-item to="/favorites" :active="$route.path === '/favorites'"
          >Favorites</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<style>
.spinner {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
