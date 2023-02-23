import React, { useState } from "react";
import Tile from "./Tile";
import { useDrop } from "react-dnd";
import '../styles/dnd.css'
import StringtoImage from "./StringtoImage"
import { elements } from "./Elements";
import { nuclides } from "./Nuclides";

// const PictureList = elements.map ((element, index) => {
//   {id: element.id; src: StringtoImage(element.id, '#fff', element.mass, element.num)}
// })

// const Tiles = Array.from({ length: elements.length - 100 }, (_, i) => ({
//   id: elements[i].id,
//   src: StringtoImage(elements[i].id, '#fff', elements[i].mass, elements[i].num),
// }))

const Tiles = Array.from({ length: nuclides.length - 3042 }, (_, i) => ({
    id: nuclides[i].id + nuclides[i].x,
    src: StringtoImage(nuclides[i].id, nuclides[i].col, ( parseInt(nuclides[i].y,10) + parseInt(nuclides[i].x,10)), nuclides[i].y),
}))

console.log(elements[1].x);

function DragDrop() {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const tiles = Tiles.filter((picture) => id === picture.id);
    setBoard((board) => [...board, tiles[0]]);
  };
  return (
    <div className="sortingActivity">
      <div className="unsorted">
        {Tiles.map((picture) => {
          return <Tile src={picture.src} id={picture.id} key={picture.id}/>;
        })}
      </div>
      <div className="sorted" ref={drop}>
        {board.map((picture) => {
          return <Tile src={picture.src} id={picture.id} key={picture.id}/>;
        })}
      </div>
    </div>
  );
}

export default DragDrop;
