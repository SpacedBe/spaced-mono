import styled from '@emotion/styled';
import Lottie from 'react-lottie-player';

import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: 'FjShzi7cK7pUlwc6BguCGQtt',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

const StyledPage = styled.div`
  min-height: 100vh;
`;

export async function getStaticPaths() {
  const params = {
    version: 'published' // or 'published'
  };

  const { data } = await Storyblok.get(`cdn/stories?starts_with=animations/`, params);

  const paths = data.stories.map((animation) => ({
    params: { slug: `${animation.slug}` }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  // loads the story from the Storyblok API
  const { data } = await Storyblok.get(`cdn/stories/animations/${params.slug}`, {
    version: 'published' // or 'published'
  });

  const content = data.story.content;

  const animation = await fetch(data.story.content.json.filename, { method: 'Get' })
    .then(res => res.json());

  return {
    props: {
      width: content.width + 'px',
      height: content.height + 'px',
      animation,
    }
  };
}

export function Index({ animation, width, height }) {
  return (
    <StyledPage>
        <Lottie
          loop={true}
          animationData={animation}
          play
          style={{ width, height, }}
        />
    </StyledPage>
  );
}

export default Index;
