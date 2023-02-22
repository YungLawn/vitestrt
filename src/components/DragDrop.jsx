import React, { useState } from "react";
import Tile from "./Tile";
import { useDrop } from "react-dnd";
import '../styles/dnd.css'
import StringtoImage from "./StringtoImage"

const PictureList = [
  {
    id: 1,
    url:
      StringtoImage('A', '#fff', 'A', 'A'),
  },
  {
    id: 2,
    url:
    StringtoImage('B', '#fff', 'B', 'B'),
  },
  {
    id: 3,
    url:
    StringtoImage('C', '#fff', 'C', 'C'),
  },
  {
    id: 4,
    url:
    StringtoImage('D', '#fff', 'D', 'D'),
  },
  {
    id: 5,
    url:
    StringtoImage('E', '#fff', 'E', 'E'),
  },
  {
    id: 6,
    url:
    StringtoImage('F', '#fff', 'F', 'F'),
  },
  {
    id: 7,
    url:
    StringtoImage('G', '#fff', 'G', 'G'),
  },
  {
    id: 8,
    url:
    StringtoImage('H', '#fff', 'H', 'H'),
  },
  {
    id: 9,
    url:
      StringtoImage('A', '#fff', 'A', 'A'),
  },
  {
    id: 10,
    url:
    StringtoImage('B', '#fff', 'B', 'B'),
  },
  {
    id: 11,
    url:
    StringtoImage('C', '#fff', 'C', 'C'),
  },
  {
    id: 12,
    url:
    StringtoImage('D', '#fff', 'D', 'D'),
  },
  {
    id: 13,
    url:
    StringtoImage('E', '#fff', 'E', 'E'),
  },
  {
    id: 14,
    url:
    StringtoImage('F', '#fff', 'F', 'F'),
  },
  {
    id: 15,
    url:
    StringtoImage('G', '#fff', 'G', 'G'),
  },
  {
    id: 16,
    url:
    StringtoImage('H', '#fff', 'H', 'H'),
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
    const pictureList = PictureList.filter((picture) => id === picture.id);
    console.log(id)
    setBoard((board) => [...board, pictureList[0]]);
  };
  return (
    <div className="sortingActivity">
      <div className="unsorted">
        {PictureList.map((picture) => {
          return <Tile url={picture.url} id={picture.id} key={picture.id}/>;
        })}
      </div>
      <div className="sorted" ref={drop}>
        {board.map((picture) => {
          return <Tile url={picture.url} id={picture.id} key={picture.id}/>;
        })}
      </div>
    </div>
  );
}

export default DragDrop;
