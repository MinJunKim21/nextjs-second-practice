/** @type {import('next').NextConfig} */

// const API_KEY = "10923b261ba94d897ac6b81148314a3f";
// .env 파일을 만들고 거기에 API_KEY를 옮김, 그리고 .env 파일은 gitignore에 등록을 하여 깃헙에 올라가는 거를 방지
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source:"/contact",
        destination:"/form",
        permanent: false
        // contact 페이지로 가면 주소가 form 주소로 변경되면서 연결됨, 이거 수정되면 npm run dev 해야함
      },
      {
        source:"/test",
        destination:"https://google.com",
        permanent: false
        // 외부 싸이트로도 연결될 수 있음, 이렇게 오브젝트 형식으로 더 추가가능
      },
      {
        source:"/old-blog/:path*",
        destination:"/new-blog/:path*",
        permanent: false
        // 이렇게 패턴매칭도 됨. *는 catch all 해주는 것으로 /:path/121/1212/112 이렇게 path뒤의 것들도 되는거
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/movies", //이게 싸이트 inspect하면 대신 노출되는 소스
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      },
      {
        source: "/api/movies/:id", //이게 싸이트 inspect하면 대신 노출되는 소스
        destination: `https://api.themoviedb.org/3/movie/id?api_key=${API_KEY}`
      }
    ]
  }
}

module.exports = nextConfig
