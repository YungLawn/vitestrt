import { DndProvider } from 'react-dnd-multi-backend'
import React, { useState, useEffect } from "react";
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { usePreview } from 'react-dnd-preview';
import StringtoImage from '../Utilities+Helpers/StringtoImage';
import DragDrop from "./DragDrop";
import { nuclides } from '../data/Nuclides';
import IsotopeActivity from './IsotopeActivity';
import '../../styles/dnd.css'

export default function SortingActivity( {elementIndex} ) {
  const [isSorted, setIsSorted] = useState(false);

  let Isotopes = [];
  for (let i = 1; i < nuclides.length; i++) {
    if (elementIndex === nuclides[i].y) {
      Isotopes.push(nuclides[i]);
    }
  }

  const Tiles = Array.from({ length: Isotopes.length }, (_, i) => ({
    id: Isotopes[i].id + (parseInt(Isotopes[i].x, 10) + 1),

    src: StringtoImage(
      Isotopes[i].id,
      Isotopes[i].col,
      parseInt(Isotopes[i].y, 10) + parseInt(Isotopes[i].x, 10),
      Isotopes[i].y
    ),
    x: parseInt(Isotopes[i].x, 10),
  }));

  for (let i = 0; i < 2; i++) {
    Tiles.sort(() => Math.random() - 0.5);
  }

  return (
    <div className='IsotopeSortingWrapper'>
      <DndProvider options={HTML5toTouch}>
          <DragDrop Tiles={Tiles} isSorted={isSorted} setIsSorted={setIsSorted}/>
      </DndProvider>
      <IsotopeActivity selectedElement={elementIndex} isSorted={isSorted}/>
    </div>
  )
}
