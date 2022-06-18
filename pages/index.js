import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Seo from '../components/Seo'

// const API_KEY = "10923b261ba94d897ac6b81148314a3f"; next.config.js로 가져가서 외부노출 방지 rewrite

export default function Home({results}) {
  // const [movies, setMovies] = useState()
  // useEffect(() => {
  //   (async () => {
  //     const {results} = await (await fetch(`/api/movies` 
  //       // `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  //       //next.config.js에서 이거로 rewrite 하였음
  //     )).json()
  //     setMovies(results)
  //   })()
  // }, []) 이 부분은 next.config.js랑 .env에 api를 숨겨서 리라이트했고, 그게 ssr로 불려올 데이터들이라 주석 처리하고 밑에 api 불러오는게 있음

  
  //여기는 movies 대신에 results 값이 들어가게됨.
  const router = useRouter()
  const onClick = (id, title) => {
    router.push(
      // {
      //   pathname: `/movies/${id}`,
      //   query: {
      //     title
      //   }, //router.query를 콘솔해보면 query 값에 들어가있음
      // },
      `/movies/${title}/${id}`
    )
  } //router.push("url") : 지정한 경로로 이동하며 히스토리 스택에 URL를 추가합니다.
  return (
    <div className='container'>
      <Seo title="Home" />
      {results?.map((movie) => (
        <div onClick={()=> onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/$movie.id}`}
              // href={{
              //   pathname:`/movies/${movie.id}`,
              //   query: {
              //     title: movie.original_title,
              //   },
              // }}
              // as={`/movies/${movie.id}`}
            >
            <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}

      <style jsx>{`
         .container {
           display: grid;
           grid-template-columns: 1fr 1fr;
           padding: 20px;
           gap: 20px;
          }
          .movie {
            cursor: pointer;
          }
          .movie img {
            max-width: 100%;
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .movie:hover img {
            transform: scale(1.05) translateY(-10px);
          }
          .movie h4 {
            font-size: 18px;
            text-align: center;
          }
          `}</style>
    </div>
  )
}

//server side render 로 API 다 불러지면 페이지 로드될지 결정함
// 여기에 api fetch 해도 api key가 숨겨지기도함

export async function getServerSideProps() { //여기에 쓰이는 코드들은 모두 server에서 렌더될거임)
  const { results } = await (await fetch (`http://localhost:3000//api/movies`)).json()
  return {
    props: {
      results
    }
  }
}


//Dynamic Routes
