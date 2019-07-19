<template>
  <div>
    <button
      v-on:click="isOpen = !isOpen"
      class="vc-header__navigation-button"
    ></button>
    <nav v-bind:class="{ open: isOpen }" class="vc-header__navigation">
      <g-link
        active-class="vc-header__navigation-item--active"
        exact
        to="/"
        class="vc-header__navigation-item"
        >Главная</g-link
      >
      <g-link
        active-class="vc-header__navigation-item--active"
        to="/news/"
        class="vc-header__navigation-item"
        >Новости</g-link
      >
      <div class="navigation__contacts">
        <span class="contacts__text">У Вас есть вопросы?</span>
        <div class="contacts__links">
          <a class="contacts__email" href="mailto:info@sova.by">info@sova.by</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style lang="scss">
.open {
  display: flex !important;
}

.vc-header__navigation-item--active:before {
  display: block;
  content: " ";
  width: 4px;
  height: 4px;
  padding: 4px;
  border-radius: 100%;
  background-color: #5ca05e !important;
  margin-right: 4px;
}

.vc-header__navigation-item:before {
  display: block;
  content: " ";
  width: 4px;
  height: 4px;
  padding: 4px;
  border-radius: 100%;
  background-color: transparent;
  margin-right: 4px;
}

.vc-header__navigation {
  display: flex;
}

.vc-header__navigation-item {
  display: flex;
  align-items: center;
  margin-right: 30px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
}

.vc-header__navigation-button {
  display: none;
  position: absolute;
  right: 0;
  z-index: 900;
  top: 20px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  background: rgba(125, 125, 125, 0.4) url("../assets/images/hamburger.png")
    no-repeat center / 60% 60%;
  background-color: #ffffff;
}
@media (max-width: 1200px) {
  .vc-header__navigation {
    margin-left: 295px;
  }
}

@media (max-width: 700px) {
  .vc-header__navigation-item {
    margin-right: 0g;
  }
  .vc-header__navigation {
    display: flex;
    margin-left: 0;
    background-color: #f9f9f9;
    height: 100vh;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    position: fixed;
    right: 0;
    top: 91px;
    padding: 30px 0 0 10px;
    box-sizing: border-box;
    z-index: 901;
    overflow-y: auto;
    transition: transform 600ms;
    width: 200px;
    flex-direction: column;
    align-items: center;
    transform: translateX(100%);
    .vc-header__navigation-item {
      color: black;
      margin-bottom: 1em;
    }
  }

  .vc-header__navigation.open {
    transform: translateX(0);
  }

  .vc-header__navigation-button {
    display: block;
    position: absolute;
    border: none;
    cursor: pointer;
  }
}

.navigation__contacts {
  display: none;
}

@media (max-width: 360px) {
  .navigation__contacts {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contacts__text {
    color: #44587d;
  }
  .contacts__links {
    color: #44587d;
  }
  .contacts__email:hover {
    text-decoration: underline;
  }
  .contacts__email {
    color: #44587d;
    padding-left: 23px;
    background: url("../assets/images/call.svg") no-repeat left top/16px 16px;
    background-image: url("../assets/images/envelope-menu.svg");
    text-decoration: none;
  }
}
</style>
