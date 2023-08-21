import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
  const userState = useSelector((state) => state.user);
  const [initialFlag, setInitialFlag] = useState(null);
  const [flag, setFlag] = useState(null);
  const [body, setBody] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleNt({ fifaCode }),
    queryKey: ["blog", fifaCode],
  });
  const {
    mutate: mutateUpdateNtDetail,
    isLoading: isLoadingUpdateNtDetail,
  } = useMutation({
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
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialFlag(data?.flag);
    }
  }, [data, isError, isLoading]);
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
    updatedData.append("document", JSON.stringify({ body }));
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
      <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
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
                className="w-full rounded-xl"
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
          <button
            type="button"
            onClick={handleDeleteImage}
            className="mt-5 w-fit rounded-lg bg-red-500 px-2 py-1 text-sm font-semibold text-white"
          >
            Elimina immagine
          </button>
          {/*
          <div className="mt-4 flex gap-2">
            {data?.categories.map((category) => (
              <Link
                to={`/blog?category=${category.name}`}
                className="inline-block font-roboto text-sm text-primary md:text-base"
              >
                {category.name}
              </Link>
            ))}
          </div>
          */}
          <h1 className="mt-4 font-roboto text-xl font-medium text-dark-hard md:text-[26px]">
            {data?.title}
          </h1>
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
            className="w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
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
