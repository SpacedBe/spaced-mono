import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useFirestore, useFirestoreCollectionData, useFirestoreDocDataOnce } from 'reactfire';
import Lottie from 'react-lottie-player';
import firebase from "firebase/app";

const StyledPage = styled.div`
  min-height: 100vh;
`;

export async function getStaticPaths() {
  const db = firebase.firestore();
  const animations = await db.collection('animations').get();

  const paths = animations.docs.map((animation) => ({
    params: { id: `${animation.id}` }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const db = firebase.firestore();
  const animation = await db.doc('animations/' + params.id).get();

  return {
    props: {
      animation: animation.data(),
    }
  };
}

export function Index({animation}) {
  return (
    <StyledPage>
      {animation && animation.animation ?
        <Lottie
          loop={true}
          animationData={JSON.parse(animation.animation)}
          play
          style={{ width: animation.width + 'px', height: animation.height + 'px' }}
        /> : ''}
    </StyledPage>
  );
}

export default Index;
