<template>
  <div>
  <div class="gallery">
    <div class="img">
      <img
        src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1165,w_2072,x_0,y_159/f_auto,q_auto,w_1100/v1554704045/shape/mentalfloss/istock-810937516.jpg"
        alt="sundim"
        width="50%"
        max-width="500px"
        height="auto"
      />
      <img
        src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1165,w_2072,x_0,y_159/f_auto,q_auto,w_1100/v1554704045/shape/mentalfloss/istock-810937516.jpg"
        alt="sundim"
        width="50%"
        max-width="500px"
        height="auto"
      />
      <img
        src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1165,w_2072,x_0,y_159/f_auto,q_auto,w_1100/v1554704045/shape/mentalfloss/istock-810937516.jpg"
        alt="sundim"
        width="50%"
        max-width="500px"
        height="auto"
      />
      <img
        src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1165,w_2072,x_0,y_159/f_auto,q_auto,w_1100/v1554704045/shape/mentalfloss/istock-810937516.jpg"
        alt="sundim"
        width="50%"
        max-width="500px"
        height="auto"
      />
      <img
        src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1165,w_2072,x_0,y_159/f_auto,q_auto,w_1100/v1554704045/shape/mentalfloss/istock-810937516.jpg"
        alt="sundim"
        width="50%"
        max-width="500px"
        height="auto"
      />
    </div>
    
  </div>
  <div class="controls">
      <span class="prevBtn" @click="prevPhoto">Prev</span
      ><span class="nextBtn" @click="nextPhoto">Next</span>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    nextPhoto() {
      let img = document.querySelector(".img");
      let translateXvalue = window
        .getComputedStyle(img)
        .getPropertyValue("transform")
        .split(",")[4];
      if (translateXvalue) {
        translateXvalue = Number(translateXvalue.trim()) + 195;
        img.style = `transform:translateX(${translateXvalue}px)`;
      } else {
        img.style = `transform:translateX(195px)`;
      }
    },
    prevPhoto() {
      let img = document.querySelector(".img");
      let translateXvalue = window
        .getComputedStyle(img)
        .getPropertyValue("transform")
        .split(",")[4];
      if (translateXvalue) {
        translateXvalue = Number(translateXvalue.trim()) -195;
        img.style = `transform:translateX(${translateXvalue}px)`;
      } else {
        img.style = `transform:translateX(195px)`;
      }
    },
  },
};
</script>
<style scoped>
*{
    overflow: hidden;
}
.gallery{
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    width:30%;
    height: 200px;
    margin:auto;
    overflow: hidden;
    
}
.img{
 display: flex;
    width: 410%;
    height: 100%;
}

.nextBtn,
.prevBtn {
  cursor: pointer;
  padding: 10px;
  margin: 10px;
}
.nextBtn:hover,
.prevBtn:hover {
  color: rgb(39, 11, 11);
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>