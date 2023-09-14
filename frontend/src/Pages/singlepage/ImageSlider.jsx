import React from "react";
import SimpleImageSlider from "react-simple-image-slider";


const ImageSlider = ({ singlehome }) => {
  return (
    <div>
      <SimpleImageSlider
        width={"100%"}
        height={504}
        images={singlehome?.photos}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
};

export default ImageSlider;
