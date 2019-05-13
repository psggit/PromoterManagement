import React from "react"
import "./table.scss"

export default function Table({ data, columns, isLoaded, history }) {
  const headers = columns.map((item, i) => <th key={`th-${i}`}>{item.name}</th>)
  return (
    <div className="table--container">
      <table border="1">
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={`r-${ri}`}>
              {
                columns.map((col, ci) => (
                  <td key={`c-${ci}`}>
                    {
                      col.mapping !== null
                        ? (col.fn ? col.fn(row[col.mapping]) : row[col.mapping])
                        : col.fn(row, history)
                    }
                  </td>
                ))
              }
            </tr>
          ))}
          {
            isLoaded === true && data.length === 0 &&
            <tr>
              <td colSpan={columns.length} className="table--state__no-data">
                No data available
            </td>
            </tr>
          }
          {
            isLoaded === false &&
            <tr>
              <td className="table--state__loading" colSpan={columns.length}>
                Loading...
            </td>
            </tr>
          }
        </tbody>
      </table>
      <div id="fixed--position-el"></div>
    </div>
  )
}