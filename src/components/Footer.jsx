import React from 'react'
import {AiOutlineTwitter, AiFillYoutube, AiFillInstagram} from 'react-icons/ai'
import {FaFacebook} from 'react-icons/fa'
import {BsTelegram} from 'react-icons/bs'
import {IoIosFootball} from 'react-icons/io'
import { images } from '../constants'

const Footer = () => {
  return (
    <section className='bg-dark-hard'>
      <footer className='container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10'>
        <div className='col-span-5 md:col-span-4 lg:col-span-2'>
          <h3 className='text-dark-light font-bold md:text-lg'>Prodotti</h3>
          <ul className='text-[#959EAD] text-sm mt-5 space-y-4 md:text-base'>
            <li>
              <a href="/">Pagina di destinazione</a>
            </li>
            <li>
              <a href="/">Articoli</a>
            </li>
            <li>
              <a href="/">Database</a>
            </li>
            <li>
              <a href="/">Documentazione</a>
            </li>
            <li>
              <a href="/">Store</a>
            </li>
          </ul>
        </div>
        <div className='col-span-5 md:col-span-4 lg:col-span-2'>
          <h3 className='text-dark-light font-bold md:text-lg'>Servizi</h3>
          <ul className='text-[#959EAD] text-sm mt-5 space-y-4'>
            <li>
              <a href="/">Sviluppatori</a>
            </li>
            <li>
              <a href="/">Blogging</a>
            </li>
            <li>
              <a href="/">Writing</a>
            </li>
            <li>
              <a href="/">Graphic Design</a>
            </li>
            <li>
              <a href="/">Aggiornamenti database</a>
            </li>
          </ul>
        </div>
        <div className='col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto'>
          <h3 className='text-dark-light font-bold md:text-lg'>Company</h3>
          <ul className='text-[#959EAD] text-sm mt-5 space-y-4'>
            <li>
              <a href="/">Chi siamo?</a>
            </li>
            <li>
              <a href="/">Termini e condizioni</a>
            </li>
            <li>
              <a href="/">Privacy</a>
            </li>
            <li>
              <a href="/">Informazioni di sviluppo</a>
            </li>
            <li>
              <a href="/">Strumenti</a>
            </li>
          </ul>
        </div>
        <div className='col-span-5 md:col-span-4 lg:col-span-2'>
          <h3 className='text-dark-light font-bold md:text-lg'>Di più</h3>
          <ul className='text-[#959EAD] text-sm mt-5 space-y-4'>
            <li>
              <a href="/">Segnala un problema</a>
            </li>
            <li>
              <a href="/">Licenza</a>
            </li>
            <li>
              <a href="/">Gestione account</a>
            </li>
          </ul>
        </div>
        <div className='col-span-10 md:order-first md:col-span-4 lg:col-span-2'>
          <img src={images.Logo} alt="logo" className='mx-auto md:mx-0' />
          <p className='text-sm text-dark-light text-center mt-4 md:text-left md:text-base lg:text-sm'>Il portale delle nazionali di calcio</p>
          <ul className='flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start'>
            <li>
              <a href="/">
                <AiOutlineTwitter className='w-6 h-auto' />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillYoutube className='w-6 h-auto' />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillInstagram className='w-6 h-auto' />
              </a>
            </li>
            <li>
              <a href="/">
                <FaFacebook className='w-6 h-auto' />
              </a>
            </li>
            <li>
              <a href="/">
                <BsTelegram className='w-6 h-auto' />
              </a>
            </li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10'>
          <div className='bg-primary text-white p-3 rounded-full'>
            <IoIosFootball className='w-7 h-auto' />
          </div>
          <p className='font-bold italic text-dark-light '>Copyright © 2023 - Tutti i diritti riservati</p>
        </div>
      </footer>

    </section>
  )
}

export default Footer
