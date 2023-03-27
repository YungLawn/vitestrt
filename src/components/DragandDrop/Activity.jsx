import { useState, useEffect } from 'react'
import { Container } from './Container';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { nuclides } from '../data/Nuclides';
import StringtoImage from './StringtoImage';
import IsotopeActivityTEST from '../IsotopeActivityTEST';
import './app.css'

const generateTiles = (num) => {

  let Isotopes = [];
  for (let i = 1; i < nuclides.length; i++) {
    if (num + 1 === nuclides[i].y) {
      Isotopes.push(nuclides[i]);
    }
  }

  const Tiles = Array.from({ length: Isotopes.length }, (_, i) => ({
    id: Isotopes[i].id + " " + (parseInt(Isotopes[i].x, 10) + 1),
    src: StringtoImage(
    Isotopes[i].id,
    Isotopes[i].col,
    parseInt(Isotopes[i].y, 10) + parseInt(Isotopes[i].x, 10),
    Isotopes[i].y
    )
  }));

  return Tiles
}

export default function Acivity( { sortedKey, setSortedKey, elementIndex } ) {
// console.log(elementIndex)

const [sorted, setSorted] = useState(false)

useEffect(() => {
  if(sorted) {
    sortedKey.forEach((key) => {
      const tmp = [...sortedKey]
      tmp[elementIndex] = true;
      // console.log(tmp)
      setSortedKey(tmp)
    });
  }
}, [sorted]);


return (
  <div className="Activity">
      <DndProvider backend={HTML5Backend}>
          <Container Tiles={generateTiles(elementIndex)} sorted={sorted} setSorted={setSorted}/>
      </DndProvider>
      <IsotopeActivityTEST elementData={sortedKey}/>
  </div>
);
}

