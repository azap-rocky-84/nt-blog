import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleNt, updateNt } from "../../../../services/index/nt";
import { toast } from "react-hot-toast";
import { stables } from "../../../../constants";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { HiOutlineCamera } from "react-icons/hi";
import Editor from "../../../../components/editor/Editor";

const EditNt = () => {
  const { fifaCode } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [initialFlag, setInitialFlag] = useState(null);
  const [flag, setFlag] = useState(null);
  const [body, setBody] = useState(null);
  const [ntFifaCode, setNtFifaCode] = useState(fifaCode);
  const [title, setTitle] = useState("");
  const [confederation, setConfederation] = useState("");
  const [nickname, setNickname] = useState("");
  const [ct, setCt] = useState("");
  const [mostCappedPlayer, setMostCappedPlayer] = useState("");
  const [caps, setCaps] = useState("");
  const [topScorer, setTopScorer] = useState("");
  const [goals, setGoals] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleNt({ fifaCode }),
    queryKey: ["blog", fifaCode],
    onSuccess: (data) => {
      setInitialFlag(data?.flag);
      setTitle(data?.title);
      setConfederation(data?.confederation);
      setNickname(data?.nickname);
      setCt(data?.ct);
      setMostCappedPlayer(data?.mostCappedPlayer);
      setCaps(data?.caps);
      setTopScorer(data?.topScorer);
      setGoals(data?.goals);
    },
    refetchOnWindowFocus: false,
  });
  const { mutate: mutateUpdateNtDetail, isLoading: isLoadingUpdateNtDetail } =
    useMutation({
      mutationFn: ({ updatedData, fifaCode, token }) => {
        return updateNt({
          updatedData,
          fifaCode,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["blog", fifaCode]);
        toast.success("Nazionale modificata correttamente");
        navigate(`/admin/nt/managent/editnt/${data.fifaCode}`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFlag(file);
  };
  const handleUpdateNt = async () => {
    let updatedData = new FormData();
    if (!initialFlag && flag) {
      updatedData.append("flag", flag);
    } else if (initialFlag && !flag) {
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialFlag, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.flag
      );
      updatedData.append("flag", picture);
    }
    updatedData.append(
      "document",
      JSON.stringify({
        body,
        fifaCode: ntFifaCode,
        title,
        confederation,
        nickname,
        ct,
        mostCappedPlayer,
        caps,
        topScorer,
        goals,
      })
    );
    mutateUpdateNtDetail({
      updatedData,
      fifaCode,
      token: userState.userInfo.token,
    });
  };
  const handleDeleteImage = () => {
    if (window.confirm("Vuoi davvero eliminare la bandiera?")) {
      setInitialFlag(null);
      setFlag(null);
    }
  };

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Impossibile caricare i dettagli della nazionale" />
      ) : (
        <section className=" container mx-auto flex max-w-5xl flex-col bg-white px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
          <article className="flex-1">
            <label htmlFor="flag" className="w-full cursor-pointer">
              {flag ? (
                <img
                  src={URL.createObjectURL(flag)}
                  alt={data?.title}
                  className="w-full rounded-xl"
                />
              ) : initialFlag ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.flag}
                  alt={data?.title}
                  className="mx-auto w-2/6 rounded-xl"
                />
              ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center bg-blue-50/50">
                  <HiOutlineCamera className="h-auto w-7 text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="flag"
              onChange={handleFileChange}
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleDeleteImage}
                className="mx-auto mt-5 w-fit rounded-lg bg-red-500 px-2 py-1 text-sm font-semibold text-white"
              >
                Elimina immagine
              </button>
            </div>
            <div className="flex justify-center">
              <div className="d-form-control w-full">
                <label className="d-label" htmlFor="title">
                  <span className="d-label-text">Titolo</span>
                </label>
                <input
                  id="titolo"
                  value={title}
                  className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300 "
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="titolo"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <table className="mt-4 w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-left font-semibold">
                      Codice FIFA
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="fifaCode"
                        value={ntFifaCode}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300 "
                        onChange={(e) =>
                          setNtFifaCode(
                            e.target.value
                              .replace(/[^A-Z]/g, "")
                              .toUpperCase()
                              .slice(0, 3)
                          )
                        }
                        placeholder="codice fifa"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-left font-semibold">
                      Confederazione
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="confederation"
                        value={confederation}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300 "
                        onChange={(e) => setConfederation(e.target.value)}
                        placeholder="confederazione"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-left font-semibold">
                      Soprannome
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="nickname"
                        value={nickname}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300 "
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="soprannome"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-left font-semibold">
                      Commissario Tecnico
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="ct"
                        value={ct}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300 "
                        onChange={(e) => setCt(e.target.value)}
                        placeholder="commissario tecnico"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-left font-semibold">
                      Primatista di Presenze
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="mostCappedPlayer"
                        value={mostCappedPlayer}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300  "
                        onChange={(e) => setMostCappedPlayer(e.target.value)}
                        placeholder="primatista"
                      />
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="caps"
                        value={caps}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300  "
                        onChange={(e) => setCaps(e.target.value)}
                        placeholder="00"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-left font-semibold">
                      Marcatore All-Time
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="topScorer"
                        value={topScorer}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300  "
                        onChange={(e) => setTopScorer(e.target.value)}
                        placeholder="marcatore at"
                      />
                    </td>
                    <td className="px-4 py-2 text-left">
                      <input
                        id="goals"
                        value={goals}
                        className="d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300  "
                        onChange={(e) => setGoals(e.target.value)}
                        placeholder="00"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>
            <button
              disabled={isLoadingUpdateNtDetail}
              type="button"
              onClick={handleUpdateNt}
              className="mt-4 w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              Modifica nazionale
            </button>
          </article>
        </section>
      )}
      ;
    </div>
  );
};

export default EditNt;
