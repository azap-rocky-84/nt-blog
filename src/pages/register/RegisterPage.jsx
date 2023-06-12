import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/index/users';
import  toast  from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useState = useSelector(state => state.user);
 const {mutate, isLoading} =  useMutation({
    mutationFn: ({name, email, password}) =>{
      return signup({name, email, password});
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
  const {register, handleSubmit, formState: {errors, isValid}, watch,} = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const submitHandler = (data) => {
    const {name, email, password} = data;
     mutate({name, email, password});
  };
  const password = watch('password');
  return (
    <MainLayout>
      <section className='container mx-auto px-5 py-10'>
          <div className='w-full max-w-sm mx-auto'>
              <h1 className='font-roboto text-2xl font-bold text-center text-colortext mb-8'>Registrati</h1>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="name" className='text-[#5a7184] font-semibold block'>Nome</label>
                    <input type="text" id="name" {...register("name", {
                      minLength: {
                        value: 3,
                        message: "Il nome deve essere lungo almeno tre caratteri",
                      },
                      required: {
                        value: true,
                        message: "Devi inserire il tuo nome",
                      }
                    })} placeholder='Inserisci il tuo nome' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`} />
                    {errors.name?.message && (
                      <p className='text-red-500 text-xs mt-1'>{errors.name?.message}</p>
                    )}
                </div>
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
                <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="confirmPassword" className='text-[#5a7184] font-semibold block'>Conferma Password</label>
                    <input type="Password" id="confirmPassword" {...register("confirmPassword", {
                      required:{
                        value: true,
                        message: "Devi confermare la tua password"
                      },
                      validate: (value) =>{
                        if(value !== password){
                          return "Le password non coincidono"
                        }
                      } 
                    })} placeholder='Inserisci di nuovo la tua password' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"}`} />
                    {errors.confirmPassword?.message && (
                      <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword?.message}</p>
                    )}
                </div>
                <Link to='/forget-password' className='text-sm font-semibold text-primary'>Password dimenticata?</Link>
                <button type='submit' disabled={!isValid || isLoading} className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>Registrati</button>
                <p className='text-sm font-semibold text-[#5a7184]'>Hai già un account? <Link to='/login' className='text-primary'>Accedi ora</Link>
                </p>
              </form>
          </div>
      </section>
    </MainLayout>
  )
}

export default RegisterPage;
