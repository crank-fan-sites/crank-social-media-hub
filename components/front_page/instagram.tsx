import React, { useEffect } from "react";

// What lightwidget.js gave <!-- LightWidget WIDGET --><script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script><iframe src="//lightwidget.com/widgets/4009c8ca96185db498257afcb4269552.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width:100%;border:0;overflow:hidden;"></iframe>
const InstagramPosts = ({ lightwidgetHtml }) => {
  const source = "//lightwidget.com/widgets/" + lightwidgetHtml + ".html";
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
      src={source}
      scrolling="no"
      className="lightwidget-widget w-full border-0 overflow-hidden bg-indigo-500"
    />
  );
};

export default InstagramPosts;
