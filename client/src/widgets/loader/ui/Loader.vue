<template>
  <div class="loader-overlay">
    <div class="loader">
      <!-- <h1>хэй а я загружаюся :)</h1> -->
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  transition: all 0.2s, opacity 0.02s;
}

.light .loader-overlay {
  animation: light-grader 1s linear infinite;

  .loader span {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background: #010101;
    animation: loader 1.5s linear infinite;
  }
}

.loader-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // animation: grader 1s linear infinite;
  animation: dark-grader 1s linear infinite;
}

.loader {
  width: 100px;
  height: 100px;
}

.loader span {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: #fff;
  animation: loader 1.5s linear infinite;
}

.loader span:last-child {
  animation-delay: -0.9s;
  -webkit-animation-delay: -0.9s;
}

@keyframes loader {
  from {
    transform: scale(0, 0);
    opacity: 0.8;
  }
  to {
    transform: scale(1, 1);
    opacity: 0;
  }
}

@keyframes light-grader {
  from {
    background: #fff;
  }
  to {
    background: #fff;
  }
}

@keyframes dark-grader {
  from {
    background: #09090B;
  }
  to {
    background: #09090B;
  }
}
</style>
