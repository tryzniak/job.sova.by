<template>
  <g-link
    exact
    to="/"
    tag="div"
    class="vc-header__logo"
    activeClass="vc-header__logo--floating"
  >
    <a
      ><img
        src="@/assets/images/logo.png"
        alt="Job Sova"
        width="116"
        height="60"
    /></a>
  </g-link>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<style lang="scss">
.vc-header__logo--floating {
  position: fixed !important;
}

.vc-header__logo {
  left: 0;
  top: 0;
  width: 295px;
  height: 90px;
  box-sizing: border-box;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  background: #3f5880;
  padding-left: 24px;
  z-index: 1100;
  position: absolute;
}

@media (max-width: 1200px) {
  .vc-header__logo {
    position: absolute;
    padding-left: 0;
    width: 150px;
    z-index: 1;
  }

  .vc-header__logo--floating {
    position: absolute !important;
  }
}
</style>
