import StringtoImage from "./StringtoImage"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./DragDrop";
import { elements } from "./Elements";

export default function Testing() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="activityWrapper">
        <DragDrop />
      </div>
    </DndProvider>
  )
}
