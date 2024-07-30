"use client";

const DashboardPage = () => {
  return (
    <div className="text-white w-full h-full flex flex-col gap-y-2 p-2">
      {/* Header */}
      <header className="w-full p-4 h-10 dark:border-white text-center text-gray-600 dark:text-white">
        Dashboard
      </header>
      
      {/* Contenido del Dashboard */}
      <div className="flex flex-col flex-grow gap-y-2">
        {/* Primera fila con 3 columnas */}
        <div className="flex w-full gap-x-2 flex-grow">
          <div className="flex-1 border border-gray-300 dark:border-white p-4 text-center text-gray-600 dark:text-white flex items-center justify-center bg-transparent">
            Block 1
          </div>
          <div className="flex-1 border border-gray-300 dark:border-white p-4 text-center text-gray-600 dark:text-white flex items-center justify-center bg-transparent">
            Block 2
          </div>
          <div className="flex-1 border border-gray-300 dark:border-white p-4 text-center text-gray-600 dark:text-white flex items-center justify-center bg-transparent">
            Block 3
          </div>
        </div>
        
        {/* Segunda fila con 2 columnas */}
        <div className="flex w-full gap-x-2 flex-grow">
          <div className="flex-grow-[7] border border-gray-300 dark:border-white p-4 text-center text-gray-600 dark:text-white flex items-center justify-center bg-transparent">
            Block 4
          </div>
          <div className="flex-grow border border-gray-300 dark:border-white p-4 text-center text-gray-600 dark:text-white flex items-center justify-center bg-transparent">
            Block 5
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
