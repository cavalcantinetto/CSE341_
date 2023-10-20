import React from "react";
import { convertDate } from "../../components/dataconverted";

export default function LinhasTabelaRelatorio(props) {

    if(props.cobrado) {
        return (
            <>
                <tr key={props._id}>
                            <td>{props.count}</td>
                            <td>{convertDate(props.data)}</td>
                            <td>{props.servico}</td>
                            <td>
                            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-all"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                </svg></td>
                        </tr>
            </>
        )

    }

    return (
            <>
            <tr key={props._id}>
                            <td>{props.count}</td>
                            <td>{convertDate(props.data)}</td>
                            <td>{props.servico}</td>
                            <td>
                            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
            <path  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg></td>
            </tr>
            </>
    )
    
}