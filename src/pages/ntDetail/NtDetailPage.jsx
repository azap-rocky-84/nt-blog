import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllNt, getSingleNt } from "../../services/index/nt";
import parseJsonToHtml from "../../utils/parseJsonToHtml";
import MainLayout from "../../components/MainLayout";
import NtDetailSkeleton from "./components/NtDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import Editor from "../../components/editor/Editor";
import { images, stables } from "../../constants";

const NtDetailPage = () => {
  const { fifaCode } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleNt({ fifaCode }),
    queryKey: ["blog", fifaCode],
    onSuccess: (data) => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Database", link: "/detail" },
        { name: "Dettagli", link: `/detail/${data.fifaCode}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
    },
  });
  return (
    <MainLayout>
      {isLoading ? (
        <NtDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Impossibile caricare i dettagli della nazionale" />
      ) : (
        <section className="font-roboto text-gray-600">
          <div className="container mx-auto flex flex-wrap items-center px-5 py-24">
            <div className="pr-0 md:w-1/2 md:pr-16 lg:w-3/5 lg:pr-0">
              <h1 className="mt-4 font-roboto text-xl font-medium text-dark-hard md:text-[26px]">
                {data?.title}
              </h1>
              <div className="w-full">
                {!isLoading && !isError && (
                  <Editor content={data?.body} editable={false} />
                )}
              </div>
              <div className="mt-10 flex w-full flex-col items-center rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-3/6">
                <h2 className="title-font mb-5 text-lg font-medium text-gray-900">
                  Informazioni generali
                </h2>
                <img
                  className="w-2/4 rounded-xl"
                  src={
                    data?.flag
                      ? stables.UPLOAD_FOLDER_BASE_URL + data?.flag
                      : images.noImagePost
                  }
                  alt={data?.title}
                />
                <table className="mt-4 border-collapse w-full">
                  <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Confederazione</td>
                        <td className="py-2 px-4 text-left">{data?.confederation}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Codice FIFA</td>
                        <td className="py-2 px-4 text-left">{data?.fifaCode}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Soprannome</td>
                        <td className="py-2 px-4 text-left italic">{data?.nickname}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Commissario Tecnico</td>
                        <td className="py-2 px-4 text-left">{data?.ct}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Primatista di Presenze</td>
                        <td className="py-2 px-4 text-left">{data?.mostCappedPlayer} ( {data?.caps} )</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold text-left">Marcatore All-Time</td>
                        <td className="py-2 px-4 text-left">{data?.topScorer} ( {data?.goals} )</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default NtDetailPage;
