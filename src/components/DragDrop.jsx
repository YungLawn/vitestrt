import React, { useState } from "react";
import Tile from "./Tile";
import { useDrop } from "react-dnd";
import '../styles/dnd.css'
import StringtoImage from "./StringtoImage"
import { elements } from "./Elements";

// const PictureList = elements.map ((element, index) => {
//   {id: element.id; src: StringtoImage(element.id, '#fff', element.mass, element.num)}
// })

const Tiles = [
  {
    id: 1,
    src: StringtoImage('A', '#fff', 'A', 'A'),
  },
  {
    id: 2,
    src: StringtoImage('B', '#fff', 'B', 'B'),
  },
  {
    id: 3,
    src: StringtoImage('C', '#fff', 'C', 'C'),
  },
];

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
    const pictureList = Tiles.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
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
