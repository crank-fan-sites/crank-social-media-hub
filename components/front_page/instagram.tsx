import React from "react";

const Instagram = () => {
  // Replace the `src` value with the URL provided by LightWidget after generating your widget
  const src = "https://lightwidget.com/widgets/your-widget-id.html";

  return (
    <iframe
      src={src}
      scrolling="no"
      allowtransparency="true"
      className="lightwidget-widget"
      style={{
        width: "100%",
        border: 0,
        overflow: "hidden",
      }}
    ></iframe>
  );
};

export default Instagram;
