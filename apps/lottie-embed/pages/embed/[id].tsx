import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useFirestore, useFirestoreCollectionData, useFirestoreDocDataOnce } from 'reactfire';
import Lottie from 'react-lottie-player';


const StyledPage = styled.div`
  min-height: 100vh;
`;

export function Index() {
  const router = useRouter();
  const firestore = useFirestore();
  const { id } = router.query;

  const animationRef = firestore
    .doc(`animations/${id}`);

  const { data: animation } = useFirestoreDocDataOnce<any>(
    animationRef, { initialData: null });

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
