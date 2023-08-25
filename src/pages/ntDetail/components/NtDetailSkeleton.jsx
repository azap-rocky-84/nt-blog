import React from "react";
import { BiImageAlt } from "react-icons/bi";
const NtDetailSkeleton = () => {
  return (
    <section className="font-roboto text-gray-600">
          <div className="container mx-auto flex flex-wrap items-center px-5 py-24">
            <div className="pr-0 md:w-1/2 md:pr-16 lg:w-3/5 lg:pr-0">
              <h1 className="font-roboto text-3xl font-medium text-gray-900 bg-slate-300">...</h1>
              <div className="w-full bg-slate-300"></div>
              <div className="mt-10 flex w-full flex-col items-center rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-2/6">
                <h2 className="title-font mb-5 text-lg font-medium text-gray-900 bg-slate-300">...</h2>
                <div className="rounded-xl w-full aspect-video bg-slate-300 flex justify-center items-center">
                    <BiImageAlt className="text-4xl text-slate-400" />
                    </div>
                <table className="border-collapse w-full">
                  <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Confederazione</td>
                        <td className="py-2 px-4 text-left bg-slate-300"></td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Codice FIFA</td>
                        <td className="py-2 px-4 text-left bg-slate-300"></td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Soprannome</td>
                        <td className="py-2 px-4 text-left bg-slate-300"></td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Commissario Tecnico</td>
                        <td className="py-2 px-4 text-left bg-slate-300"></td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Primatista di Presenze</td>
                        <td className="py-2 px-4 text-left bg-slate-300"></td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Primo Marcatore AllTime</td>
                        <td className="py-2 px-4 text-left bg-slate-300"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
  );
};

export default NtDetailSkeleton;
