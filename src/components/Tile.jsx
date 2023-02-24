import React from "react";
import { useDrag } from "react-dnd";

function Tile({ id, src }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      src={src}
      width="150px"
      style={{ border: isDragging ? "2px solid #fff" : "0px" }}
    />
  );
}

export default Tile;
