import React, { useState } from "react";
import { deletePost, getAllPosts } from "../../../../services/index/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { images, stables } from "../../../../constants";
import Pagination from "../../../../components/Pagination";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
let isFirstRun = true;

const ManagePost = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: postsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage),
    queryKey: ["posts"],
  });
  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return deletePost({
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post eliminato correttamente");
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
  const deletePostHandler = ({ slug, token }) => {
    mutateDeletePost({ slug, token });
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold">Gestisci post</h1>
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
                    className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Titolo del post..."
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 rounded-lg bg-primary px-4 py-2 text-base font-semibold text-white shadow-md hover:border-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-purple-200"
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
                      Titolo
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                    >
                      Categoria
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
                  ) : postsData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        Nessun post trovato nel database
                      </td>
                    </tr>
                  ) : (
                    postsData?.data.map((post) => (
                      <tr>
                        <td className="w-6/12 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="/" className="relative block">
                                <img
                                  alt="profil"
                                  src={
                                    post?.photo
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        post?.photo
                                      : images.noImagePost
                                  }
                                  className="mx-auto aspect-square w-10 rounded-lg object-cover"
                                />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="whitespace-no-wrap text-gray-900">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="items-center border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap items-center text-gray-900">
                            {post.categories.length > 0 ? (
                              post.categories[0]
                            ) : (
                              <MdDoNotDisturbAlt />
                            )}
                          </p>
                        </td>
                        <td className="w-3/12 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </td>
                        <td className="space-x-5 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button
                            disabled={isLoadingDeletePost}
                            type="button"
                            className="rounded-lg border-2 bg-red-600 px-2 py-2 hover:border-red-600 transition duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                            onClick={() => {
                              deletePostHandler({
                                slug: post?.slug,
                                token: userState.userInfo.token,
                              });
                            }}
                          >
                            <AiTwotoneDelete className="text-2xl text-white hover:text-red-600" />
                          </button>
                          <Link to={`/admin/posts/manage/edit/${post?.slug}`}>
                            <button
                              type="button"
                              className="rounded-lg border-2 bg-green-600 px-2 py-2 hover:border-green-600 transition duration-300 hover:bg-white"
                            >
                              <BsFillPencilFill className="text-2xl text-white hover:text-green-600" />
                            </button>
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
                    postsData?.headers?.["x-totalpagecount"]
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

export default ManagePost;
