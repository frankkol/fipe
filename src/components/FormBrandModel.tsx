interface FormModalProps {
  setIsClick: (value: boolean) => void;
}

export function FormBrandModel({ setIsClick }: FormModalProps) {


  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/5 backdrop-blur-xs">
      <div className='w-xl rounded-lg bg-gray-100/95 border-2 border-gray-700/40'>
        <div className="relative">

          <button
            onClick={() => setIsClick(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* className="fixed mx-1 px-1 justify-baseline items-baseline" */}
        <form className="flex flex-col gap-2 px-6 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm ml-1" htmlFor="ano">Marca</label>
              <select
                className="rounded-lg border-2 py-2 px-2 text-sm placeholder:text-sm border-stone-700"
              >
                <option value="" disabled>Selecione o ano modelo...</option>

              </select>
              <label className="text-sm ml-1" htmlFor="ano">Ano</label>
              <select
                className="rounded-lg border-2 py-2 px-2 text-sm placeholder:text-sm border-stone-700"
              >
                <option value="" disabled>Selecione o ano modelo...</option>

              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm ml-1" htmlFor="ano">Modelo</label>
              <select
                className="rounded-lg border-2 py-2 px-2 text-sm placeholder:text-sm border-stone-700"
              >
                <option value="" disabled>Selecione o ano modelo...</option>

              </select>

              <div className="grid grid-cols-2 gap-4 items-center mt-4">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Código Fipe:
                  <strong className="text-gray-700 font-bold"> 014069-4</strong>
                </p>
                <button onClick={() => setIsClick(false)} type="submit" className="bg-slate-700 cursor-pointer text-white rounded-lg hover:bg-slate-900 font-medium py-2">Copiar/Fechar</button>
              </div>

            </div>
          </div>

        </form >
      </div>
    </div>
    // <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/5 backdrop-blur-xs">
    //   <div className="flex flex-col items-center justify-center p-6 bg-mist-50/90 rounded-lg border border-gray-100 min-w-62">
    //     <button className="cursor-pointer" onClick={() => setIsClick(false)}>Fechar</button>
    //     <div className="relative w-32 h-12 overflow-hidden mb-4">
    //       <div className="text-4xl absolute animate-drive-left right-0">🚗</div>
    //       <div className="absolute bottom-0 w-full h-0.5 bg-gray-200"></div>
    //     </div>
    //   </div>
    // </div>
  );
}