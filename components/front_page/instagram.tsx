import React, { useEffect } from "react";

const InstagramPosts = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      src="//lightwidget.com/widgets/06b958f4d2bd526e891de4723a5bea15.html"
      scrolling="no"
      allowTransparency="true"
      className="lightwidget-widget w-full border-0 overflow-hidden"
    />
  );
};

export default InstagramPosts;
