const frames = {
  currentIndex : 1,
  maxIndex : 492
};
const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");

var imgLoaded = 0;
var imgsArr = [];
function preloader(){
  for(var i = frames.currentIndex; i <= frames.maxIndex; i++){
      const imageUrl =`/images/compressed_images/frame_${i.toString().padStart(4,"0")}.jpg`;
      // console.log(imageUrl);
      var img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        // console.log("image loaded");
        // alert('hey');
          imgLoaded++;

          if(imgLoaded === frames.maxIndex){
              loadImages(frames.currentIndex);
              startAnimation();
          }
      }
      imgsArr.push(img);
  }
  // console.log(imgsArr);
}
function loadImages(index){
  if(index > 0 && index <= frames.maxIndex){
      const img = imgsArr[index];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      //aspect ratio
      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const aspectRatio = Math.max(scaleX, scaleY);

      const newWidth = img.width * aspectRatio;
      const newHeight = img.height * aspectRatio;

      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingQuality = "high";
      context.imageSmoothingEnabled = true;
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      frames.currentIndex = index;
  }
}
function startAnimation(){
  var tl = gsap.timeline({
      scrollTrigger:{
          trigger: '.parent',
          start: 'top top',
          scrub:2,
      }
  })

  tl.to(frames,{
      currentIndex: frames.maxIndex,
      onUpdate: function(){
          loadImages(Math.floor(frames.currentIndex));
      }
  })


}
preloader();