import React from "react";
import Header from "./components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../services/index/users";
import { toast } from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("Non disponi dell'autorizzazione di amministratore");
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/");
      toast.error("Non disponi dell'autorizzazione di amministratore");
    },
  });
  if (profileIsLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h3 className="text-2xl text-slate-700">Carico...</h3>
      </div>
    );
  }
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Header />
      <main className="flex-1 bg-[#F9F9F9] p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
