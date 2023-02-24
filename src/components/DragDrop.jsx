import React, { useState } from "react";
import Tile from "./Tile";
import { useDrop } from "react-dnd";
import '../styles/dnd.css'
import StringtoImage from "./StringtoImage"
import { nuclides } from "./Nuclides";

function DragDrop( {elementIndex} ) {

  let Isotopes = [];
  for(let i=1;i<nuclides.length;i++) {
    if(elementIndex === nuclides[i].y) {
      Isotopes.push(nuclides[i])
    }
  }

  const Tiles = Array.from({ length: Isotopes.length }, (_, i) => ({
    id: Isotopes[i].id + (parseInt(Isotopes[i].x,10) + 1),
    src: StringtoImage(Isotopes[i].id, Isotopes[i].col, ( parseInt(Isotopes[i].y,10) + parseInt(Isotopes[i].x,10)), Isotopes[i].y),
  }))

  const [board, setBoard] = useState([]);
  const [unsortedTiles, setUnsortedTiles] = useState(Tiles);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const tiles = unsortedTiles.filter((picture) => id === picture.id);
    setBoard((board) => {
      const newBoard = [...board, tiles[0]];
      return newBoard.filter((item, index) => newBoard.indexOf(item) === index);
    });
    setUnsortedTiles((unsortedTiles) => unsortedTiles.filter((picture) => id !== picture.id));
  };

  return (
    <div className="sortingActivity">
      <div className="unsorted">
        {unsortedTiles.map((picture) => {
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
