import { Alert } from "@mui/material";
import { ErrorEnum } from "../../interfaces/enums/errors.enum";

interface ISuccessSendToastProps {
  message: string;
  type: ErrorEnum;
}

export const SuccessSendToast = ({ message }: ISuccessSendToastProps) => {
  return (
    <div id="toast-success" className="flex fixed right-2 items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ml-3 text-sm font-normal"> {message}</div>
      <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  )
}

export const ToastAlert = ({ message, type }: ISuccessSendToastProps) => {

  const checkType = () => {
    switch (type) {
      case ErrorEnum.error:
        return (
          <Alert variant="standard" severity={ErrorEnum.error} className="fixed" style={{ zIndex: '9999', right: '16px' }} >
            {message}
          </Alert>
        )
      case ErrorEnum.warning:
        return (
          <Alert variant="filled" severity={ErrorEnum.warning} className="fixed" style={{ zIndex: '9999', right: '16px' }}>
            {message}
          </Alert>
        );
      case ErrorEnum.info:
        return (
          <Alert variant="filled" severity={ErrorEnum.info} className="fixed" style={{ zIndex: '9999', right: '16px' }}>
            {message}
          </Alert>
        )
      case ErrorEnum.success:
        return (
          <Alert variant="filled" severity={ErrorEnum.success} className="fixed" style={{ zIndex: '9999', right: '16px' }}>
            {message}
          </Alert>
        )
    }
  }


  return (
    <div>
      { checkType() }
    </div>
  )
}