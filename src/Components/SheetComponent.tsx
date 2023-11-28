import React, {useEffect, useState} from "react";

import Cell from "../Engine/Cell";

import "./SheetComponent.css";
import { getMutableClone } from "typescript";

// a component that will render a two dimensional array of cells
// the cells will be rendered in a table
// the cells will be rendered in rows
// a click handler will be passed in

interface SheetComponentProps {
  cellsValues: Array<Array<string>>;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentCell: string;
  getCellsBeingEdited: () => Promise<Map<string, string>>;
} // interface SheetComponentProps




function SheetComponent({ cellsValues, onClick, currentCell, getCellsBeingEdited}: SheetComponentProps) {

  const [cellsBeingEdited, setCellsBeingEdited] = useState<Map<string, string>>(new Map<string, string>());

  useEffect(() => {
      getCellsBeingEdited().then(setCellsBeingEdited);
      //setFiles(f);
  }, [getCellsBeingEdited]);
  /**
   * 
   * @param cell 
   * @returns the class name for the cell
   * 
   * if the cell is the current cell and the sheet is in edit mode
   * then the cell will be rendered with the class name "cell-editing"
   * 
   * if the cell is the current cell and the sheet is not in edit mode
   * then the cell will be rendered with the class name "cell-selected"
   * 
   * otherwise the cell will be rendered with the class name "cell"
   */
  function getCellClass(cell: string) {
    if (cellsBeingEdited.has(cell)) {
      return "cell-editing";
    }
    if (cell === currentCell) {
      return "cell-selected";
    }
    return "cell";
  }

  function checkEditorInfo(cell: string) {
    if (cellsBeingEdited.has(cell)) {
      return (<div className="editor-info">{cellsBeingEdited.get(cell)}</div>);
    }
  }

  return (
    <table className="table">
      <tbody>
        {/*add a row with column cellsValues */}
        <tr>
          <th></th>
          {cellsValues[0].map((col, colIndex) => (
            <th key={colIndex}>
              {Cell.columnNumberToName(colIndex)}
            </th>
          ))}
        </tr>
        {cellsValues.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td> {Cell.rowNumberToName(rowIndex)}</td>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                {checkEditorInfo(Cell.columnRowToCell(colIndex, rowIndex))}
                <button
                  onClick={onClick}
                  value={cell}
                  cell-label={Cell.columnRowToCell(colIndex, rowIndex)}
                  data-testid={Cell.columnRowToCell(colIndex, rowIndex)}
                  className={(getCellClass(Cell.columnRowToCell(colIndex, rowIndex)))}
                >
                  {cell}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} // SheetComponent




export default SheetComponent;