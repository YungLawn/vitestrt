import React, { useState, useEffect } from "react";
// import Tile from "./Tile";
import { useDrop, useDrag } from "react-dnd";

function DragDrop({ Tiles }) {

  const [sortedTiles, setSortedTiles] = useState([]);
  const [unsortedTiles, setUnsortedTiles] = useState(Tiles);
  const [isSorted, setIsSorted] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImage(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImage = (id) => {
    const tiles = unsortedTiles.filter((picture) => id === picture.id);
    setSortedTiles((sortedTiles) => {
      const newBoard = [...sortedTiles, tiles[0]];
      return newBoard.filter((item, index) => newBoard.indexOf(item) === index);
    });
    setUnsortedTiles((unsortedTiles) =>
      unsortedTiles.filter((picture) => id !== picture.id)
    );
  };

  const reset = () => {
    for (let i = 0; i < 2; i++) {
      Tiles.sort(() => Math.random() - 0.5);
    }
    setSortedTiles([]);
    setUnsortedTiles(Tiles);
    setIsSorted(false);
  };

  const checkSorted = () => {
    return (
      sortedTiles.every((tile, index, array) => {
        if (index === 0) {
          return true;
        } else {
          return tile.x >= array[index - 1].x;
        }
      })
    )
  }

  useEffect(() => {
    if (unsortedTiles.length === 0) {
      if (checkSorted()) {
        setIsSorted(true);
      } else {
        reset();
      }
    }
  }, [unsortedTiles, sortedTiles, Tiles]);

  const Tile = ({ id, src }) => {
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

  return (
    <div style={{position: "absolute"}} className="sortingActivity">
      <div className="isSorted">{isSorted ? "Sorted!" : "Unsorted!"}</div>
      <button onClick={reset}>Reset</button>
      <div className="unsorted">
        {unsortedTiles.map((picture) => {
          return <Tile src={picture.src} id={picture.id} key={picture.id} />;
        })}
      </div>
      <div className="sorted" ref={drop}>
        {sortedTiles.map((picture) => {
          return <Tile src={picture.src} id={picture.id} key={picture.id} />;
        })}
      </div>
    </div>
  );
}

export default DragDrop;
