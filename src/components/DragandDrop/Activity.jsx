import { useState, useEffect } from 'react'
import { Container } from './Container';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { nuclides } from '../data/Nuclides';
import IsotopeActivity from '../IsotopeActivity';
import './app.css'

export const generateTiles = (num) => {

  let Isotopes = [];
  for (let i = 1; i < nuclides.length; i++) {
    if (num + 1 === nuclides[i].y) {
      Isotopes.push(nuclides[i]);
    }
  }

  let tiles = Array.from({ length: Isotopes.length }, (_, i) => ({
    id: Isotopes[i].id + " " + (parseInt(Isotopes[i].x, 10) + 1),
    num: Isotopes[i].y,
    mass: parseInt(Isotopes[i].y, 10) + parseInt(Isotopes[i].x, 10),
    lbl: Isotopes[i].id,
    col: Isotopes[i].col
  }));

  return tiles
}

export default function Activity( { sortedKey, setSortedKey, elementIndex } ) {
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
    {/* <div className='SortingActivity'> */}
    <div className={sortedKey[elementIndex] ? 'SortingActivity hidden' : 'SortingActivity'}>
      <DndProvider options={HTML5toTouch}>
        <Container Tiles={generateTiles(parseInt(elementIndex, 10))} sorted={sorted} setSorted={setSorted}/>
      </DndProvider>
    </div>
    <IsotopeActivity elementData={sortedKey}/>
  </div>
);
}

