import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../../components/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs'
import { images } from '../../constants'
import SuggestedPosts from './container/SuggestedPosts'
import CommentsContainer from '../../components/comments/CommentsContainer'
import SocialShareButtons from '../../components/SocialShareButtons'
const breadCrumbsData = [
  {name: "Home", link: '/'},
  {name: "Blog", link: '/blog'},
  {name: "Article Title", link: '/blog/1'},
];
const postsData = [
  {
    _id: "1",
    image: images.Post1Image,
    title: "La Danimarca del 1992",
    createdAt: "2023-01-28T15:35:53.607+0000"
  },
  {
    _id: "2",
    image: images.Post1Image,
    title: "United2026 sarà il mondiale più bello di sempre?",
    createdAt: "2023-01-28T15:35:53.607+0000"
  },
  {
    _id: "3",
    image: images.Post1Image,
    title: "Un viaggio nella cultura calcistica del Messico",
    createdAt: "2023-01-28T15:35:53.607+0000"
  },
  {
    _id: "4",
    image: images.Post1Image,
    title: "I Paesi Bassi del 1988",
    createdAt: "2023-01-28T15:35:53.607+0000"
  }
];
const tagsData = [
  "United2026",
  "CONMEBOL",
  "Argentina",
  "Brasile",
  "Colombia",
  "Uruguay",
  "Paraguay",
  "Cile",
  "Venezuela",
  "Bolivia",
  "Ecuador",
  "Perù"
];
const ArticleDetailPage = () => {
  return (
    <MainLayout>
        <section className='container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start'>
           <article className='flex-1'>
            <BreadCrumbs data={breadCrumbsData}/>
            <img className='rounded-xl w-full' src={images.Post1Image} alt="" />
           <Link to='/blog?category=selectedCategory' className='text-primary text-sm font-roboto inline-block mt-4 md:text-base'>
            UNITED 2026
           </Link>
           <h1 className='text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]'>Annunciato il calendario CONMEBOL per United2026</h1>
           <div className='mt-4 text-dark-soft '>
            <p className='leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, totam. Possimus explicabo repellendus, architecto quidem magni vel ea soluta perspiciatis error dolorum! Corrupti iste illum laborum voluptas quis deleniti hic mollitia voluptatibus. Autem quibusdam, tempora doloremque iusto consequuntur dolorem fugiat veritatis minima labore numquam placeat facilis nemo natus repudiandae ab!</p>
           </div>
           <CommentsContainer className='mt-10' logginedUserId="a"/>
           </article>
           <div>
           <SuggestedPosts header="Ultimi articoli" posts={postsData} tags={tagsData} className='mt-8 lg:mt-0 lg:max-w-xs'/>
           <div className='mt-7'>
              <h2 className='font-roboto font-medium text-colortext mb-4 md:text-xl'>Condividi: </h2>
              <SocialShareButtons url={encodeURI("https://www.transfermarkt.it/")} title={encodeURIComponent("Transfermarkt")}/>
           </div>
           </div>
        </section>
    </MainLayout>
  )
}

export default ArticleDetailPage
