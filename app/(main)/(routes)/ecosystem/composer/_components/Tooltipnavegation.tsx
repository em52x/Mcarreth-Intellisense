import React from 'react'

const Tooltipnavegation = () => {
  return (
    <div>
         <div className="absolute bottom-10 left-0 w-full flex select-none items-center justify-center ">
        <div className="max-w-sm text-center">
          <ul className="mt-4 flex items-center justify-center space-x-2">
            <li className="flex items-center space-x-2 text-gray-500 rounded-md bg-gray-100 py-2 px-3 text-sm">
              <span>Reactions</span>
              <span className="block rounded border border-gray-300 px-1 text-xs font-medium uppercase text-gray-500">
                E
              </span>
            </li>

            <li className="flex items-center space-x-2 rounded-md text-gray-500 bg-gray-100 py-2 px-3 text-sm">
              <span>Chat</span>
              <span className="block rounded border border-gray-300 px-1 text-xs font-medium uppercase text-gray-500">
                /
              </span>
            </li>

            <li className="flex items-center space-x-2 rounded-md text-gray-500 bg-gray-100 py-2 px-3 text-sm">
              <span>Escape</span>
              <span className="block rounded border border-gray-300 px-1 text-xs font-medium uppercase text-gray-500">
                esc
              </span>
            </li>
          </ul>
        </div>
      </div>





    </div>
  )
}

export default Tooltipnavegation