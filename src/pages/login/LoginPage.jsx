import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/index/users';
import  toast  from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useState = useSelector(state => state.user);
 const {mutate, isLoading} =  useMutation({
    mutationFn: ({email, password}) =>{
      return login({email, password});
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
    },
    onError: (error) =>{
      toast.error(error.message);
    }
  });

  useEffect(() => {
    if(useState.userInfo){
        navigate('/');
    }
  }, [navigate, useState.userInfo]);
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const submitHandler = (data) => {
    const {email, password} = data;
     mutate({email, password});
  };
  return (
    <MainLayout>
      <section className='container mx-auto px-5 py-10'>
          <div className='w-full max-w-sm mx-auto'>
              <h1 className='font-roboto text-2xl font-bold text-center text-colortext mb-8'>Accedi</h1>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="email" className='text-[#5a7184] font-semibold block'>E-mail</label>
                    <input type="email" id="email" {...register("email", {
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Inserisci una e-mail in formato valido",
                      },
                      required: {
                        value: true,
                        message: "Devi inserire la tua e-mail",
                      },

                    })} placeholder='Inserisci il tuo e-mail' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`} />
                    {errors.email?.message && (
                      <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>
                    )}
                </div>
                <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="password" className='text-[#5a7184] font-semibold block'>Password</label>
                    <input type="password" id="password" {...register("password", {
                      required:{
                        value: true,
                        message: "Inserisci la tua password"
                      },
                      minLength:{
                        value: 8,
                        message: "La password deve essere di almeno otto caratteri"
                      },
                    })} placeholder='Inserisci la tua password' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.password ? "border-red-500" : "border-[#c3cad9]"}`} />
                    {errors.password?.message && (
                      <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
                    )}
                </div>
                <Link to='/forget-password' className='text-sm font-semibold text-primary'>Password dimenticata?</Link>
                <button type='submit' disabled={!isValid || isLoading} className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>Accedi</button>
                <p className='text-sm font-semibold text-[#5a7184]'>Non hai un account? <Link to='/register' className='text-primary'>Registrati ora</Link>
                </p>
              </form>
          </div>
      </section>
    </MainLayout>
  )
}

export default LoginPage;
