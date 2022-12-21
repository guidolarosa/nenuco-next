import { createClient } from '../prismicio';
import Homepage from '../components/Homepage';

const Home = (props) => {
  return (
    <Homepage {...props} showTrailerBanner={false} />
  )
}

export async function getStaticProps() {
  const client = createClient()

  const page = await client.getSingle('homepage');
  const videoPosts = await client.getAllByType('video-post');
  return {
    props: {
      page: page,
      videoPosts: videoPosts
    }
  }
}

export default Home;