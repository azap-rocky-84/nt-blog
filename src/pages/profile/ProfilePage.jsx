import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {getUserProfile, updateProfile} from '../../services/index/users';
import ProfilePictures from '../../components/ProfilePictures';
import { userActions } from '../../store/reducers/userReducers';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector(state => state.user);
  const {data: profileData, isLoading: profileIsLoading, error: profileError} = useQuery({
    queryFn: () => {
        return getUserProfile({token: userState.userInfo.token});
    },
    queryKey: ['profile']
  });

  const {mutate, isLoading} =  useMutation({
    mutationFn: ({name, email, password}) =>{
      return updateProfile({
        token: userState.userInfo.token,
        userData: {name, email, password},
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
      queryClient.invalidateQueries(['profile']);
      toast.success("Profilo modificato correttamente!");
    },
    onError: (error) =>{
      toast.error(error.message);
    }
  });
 
  useEffect(() => {
    if(!userState.userInfo){
        navigate('/');
    }
  }, [navigate, userState.userInfo]);
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
        name: profileIsLoading ? "" : profileData.name, 
        email: profileIsLoading ? "" : profileData.email, 
    },
    mode: "onChange",
  });
  const submitHandler = (data) => {
    const {name, email, password} = data;
    mutate({name, email, password});
  };
  return (
    <MainLayout>
      <section className='container mx-auto px-5 py-10'>
          <div className='w-full max-w-sm mx-auto'>
            <p>{profileData?.name}</p>
            <ProfilePictures avatar={profileData?.avatar}/>
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
                    <label htmlFor="password" className='text-[#5a7184] font-semibold block'>Nuova password (facoltativo)</label>
                    <input type="password" id="password" {...register("password")} placeholder='Inserisci una nuova password' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.password ? "border-red-500" : "border-[#c3cad9]"}`} />
                    {errors.password?.message && (
                      <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
                    )}
                </div>
                <button type='submit' disabled={!isValid || profileIsLoading} className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'>Registrati</button>
              </form>
          </div>
      </section>
    </MainLayout>
  )
}

export default ProfilePage;
