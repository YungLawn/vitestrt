import StringtoImage from "./StringtoImage"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./DragDrop";
import { nuclides } from "./Nuclides";

export default function Testing() {
  const elementIndex = 1;

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
  console.log(Tiles)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="activityWrapper">
        <DragDrop Tiles={Tiles}/>
      </div>
    </DndProvider>
  )
}
