import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteNt, getAllNt } from "../../../../services/index/nt";
import { toast } from "react-hot-toast";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";
import Pagination from "../../../../components/Pagination";
let isFirstRun = true;
const UpdateNt = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: ntData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllNt(searchKeyword, currentPage),
    queryKey: ["nt"],
  });
  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ fifaCode, token }) => {
        return deleteNt({
          fifaCode,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["nt"]);
        toast.success("Nazionale eliminata correttamente");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);
  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };
  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };
  const deleteNtHandler = ({ fifaCode, token }) => {
    mutateDeletePost({ fifaCode, token });
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Gestisci il database di nazionali
      </h1>
      <div className="mx-auto w-full px-4">
        <div className="py-8">
          <div className="mb-1 flex w-full flex-row justify-between sm:mb-0">
            <div className="text-end">
              <form
                onSubmit={submitSearchKeywordHandler}
                className="flex w-3/4 max-w-sm flex-col justify-center space-y-3 md:w-full md:flex-row md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Titolo del post..."
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 rounded-lg bg-purple-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filtra
                </button>
              </form>
            </div>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Confederazione
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Data
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Codice FIFA
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        Carico...
                      </td>
                    </tr>
                  ) : ntData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        Nessuna nazionale presente nel database
                      </td>
                    </tr>
                  ) : (
                    ntData?.data.map((nt) => (
                      <tr>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="/" className="relative block">
                                <img
                                  alt="flag"
                                  src={
                                    nt?.flag
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        nt?.flag
                                      : images.noImagePost
                                  }
                                  className="mx-auto w-10 h-auto rounded-lg object-contain border-b border-black"
                                />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="whitespace-no-wrap text-gray-900">
                                {nt.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {nt.confederation}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {new Date(nt.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex flex-wrap gap-x-2">
                            {nt.fifaCode}
                          </div>
                        </td>
                        <td className="space-x-5 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button
                            disabled={isLoadingDeletePost}
                            type="button"
                            className="text-red-600 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-70"
                            onClick={() => {
                              deleteNtHandler({
                                fifaCode: nt?.fifaCode,
                                token: userState.userInfo.token,
                              });
                            }}
                          >
                            Cancella
                          </button>
                          <Link
                            to={`/admin/nt/managent/editnt/${nt?.fifaCode}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            Modifica
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(
                    ntData?.headers?.["x-totalpagecount"]
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNt;
