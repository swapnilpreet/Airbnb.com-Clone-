import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
    { url: "https://images.unsplash.com/photo-1682685796063-d2604827f7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" },
    { url: "https://images.unsplash.com/file-1682622567683-99f3024cf76bimage?dpr=2&auto=format&fit=crop&w=416&q=60" },
    { url: "https://images.unsplash.com/photo-1691264122434-3b5a1dac81d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" },
    { url: "https://images.unsplash.com/photo-1682686581295-7364cabf5511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { url: "https://images.unsplash.com/photo-1682685797828-d3b2561deef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { url: "https://images.unsplash.com/photo-1682686581218-82326951f4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { url: "https://images.unsplash.com/photo-1682685797898-6d7587974771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  ];

const ImageSlider = () => {
    return (
        <div>
          <SimpleImageSlider
            width={"100%"}
            height={504}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        </div>
      );
}

export default ImageSlider