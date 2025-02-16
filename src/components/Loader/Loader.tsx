import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <DotLottieReact
        src="https://lottie.host/a025363a-67d9-4da6-9e41-fe07d462ac32/xlphIc1i1L.lottie"
        loop
        autoplay
        className="w-72"
        speed={2} // Increases the animation speed
      />
    </div>
  );
};

export default Loader;
