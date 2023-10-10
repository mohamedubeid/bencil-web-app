import { Helmet } from "react-helmet-async";
import HomePageStyle from "./HomePage.module";
const HomePage = () => {
  const classes = HomePageStyle()
  return (
    <>
    <Helmet><title>Home</title></Helmet>
    <div>HomePage</div>
    </>
  )
}

export default HomePage