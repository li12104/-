<template>
    <div class="home-view">
      <div class="home-time">
        <div>{{ formattedTime }}</div>
      </div>
      <div></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 使用Date对象作为时间源，而不是字符串
        currentTime: new Date(),
        // 格式化后的时间字符串，用于显示
        formattedTime: "",
      };
    },
    watch: {
      // 监听currentTime的变化，然后格式化并更新formattedTime
      currentTime(newTime) {
        this.formattedTime = this.formatTime(newTime);
      },
    },
    methods: {
      // 格式化时间的方法
      formatTime(date) {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      },
      // 更新时间的方法
      updateTime() {
        this.currentTime = new Date();
      },
    },
    mounted() {
      // 在组件挂载后开始更新时间
      this.updateTime();
      // 使用setInterval来每秒更新时间
      this.interval = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
      // 在组件销毁前清除定时器，避免内存泄漏
      clearInterval(this.interval);
    },
  };
  </script>
  
  <style>
  .home-view {
    background: url(../../public/bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 90%;
  }
  .home-time{
    width: 50%;
    font-size: 80px;
    color: #fc883f;
    margin-top: 20%;
    margin-left: 5%;
    padding: 30px;
  }
  </style>
  