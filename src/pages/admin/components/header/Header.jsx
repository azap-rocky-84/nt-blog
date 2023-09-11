import React, { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../../constants";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../../../../services/index/posts";
import { createNt } from "../../../../services/index/nt";

const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();
  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        return createPost({
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Nuovo post creato");
        console.log(data);
        navigate(`/admin/posts/manage/edit/${data.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  const { mutate: mutateCreateNt, isLoading: isLoadingCreateNt } = useMutation({
    mutationFn: ({ token }) => {
      return createNt({
        token,
      });
    },
    onSuccess: (data) =>{
        queryClient.invalidateQueries(["nt"]);
        toast.success("Nuova nazionale creata");
        console.log(data);
        navigate(`/admin/nt/managent/editnt/${data.fifaCode}`);
    },
    onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
  });
  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };
  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);
  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };
  const handleCreateNewNt = ({ token }) => {
    mutateCreateNt({ token });
  };
  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      <Link to="/">
        <img src={images.GreenLogo} alt="" className="w-16 lg:hidden" />
      </Link>
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="h-6 w-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="h-6 w-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          <div className="fixed bottom-0 left-0 top-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              <img src={images.GreenLogo} alt="" className="w-16" />
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7]">MENÙ PRINCIPALE</h4>
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Commenti"
                link="/admin/comments"
                icon={<FaComments className="text-xl" />}
                name="comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItemCollapse
                title="Database"
                icon={<GiWorld className="text-xl" />}
                name="nt"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/nt/managent">Gestisci tutte le nazionali</Link>
                <button
                disabled={isLoadingCreateNt}
                  className="text-start disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() =>
                    handleCreateNewNt({ token: userState.userInfo.token })
                  }
                >
                  Aggiungi nazionale
                </button>
              </NavItemCollapse>
              <NavItemCollapse
                title="Post"
                icon={<MdDashboard className="text-xl" />}
                name="posts"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/posts/manage">Gestisci tutti i post</Link>
                <button
                  disabled={isLoadingCreatePost}
                  className="text-start disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() =>
                    handleCreateNewPost({ token: userState.userInfo.token })
                  }
                >
                  Aggiungi post
                </button>
              </NavItemCollapse>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
