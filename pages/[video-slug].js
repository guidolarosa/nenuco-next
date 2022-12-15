import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Homepage from '../components/Homepage'
import { createClient } from '../prismicio';


export default function VideoPost(props) {
  const [selectedVideoPostData, setSelectedVideoPostData] = useState(null);
  console.log(selectedVideoPostData)
  useEffect(() => {
    const videoPost = props.videoPosts.find((e) => {
      if (e.uid == props.videoUID) {
        return true;
      }
    });
    setSelectedVideoPostData(videoPost)
  }, [props.videoPosts, props.videoUID]);

  return (
    <Homepage {...props} selectedVideoPostData={selectedVideoPostData}
        showInfo={true}>
    </Homepage>
  )
}

export async function getStaticProps({params}) {
  const client = createClient()
  const page = await client.getSingle('homepage');
  const videoPosts = await client.getAllByType('video-post');
  return {
    props: {
      page: page,
      videoPosts: videoPosts,
      videoUID: params['video-slug']
    }
  }
}

export async function getStaticPaths() {
  const client = createClient()
  const videoPosts = await client.getAllByType('video-post');
  const paths = [];

  videoPosts.forEach((e) => {
    paths.push(
      {
        params: {
          'video-slug': e.uid
        }
      }
    )
  })
  // paths: [{params: {i}}]
  return {
    paths: paths,
    fallback: false
  }
}