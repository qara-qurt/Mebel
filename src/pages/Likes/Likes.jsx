import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { EmptyCard } from '../../components/EmptyCard';
import LikesCard from '../../components/LikesCard';
import Layout from '../../layout/Layout';

const Likes = () => {
  const { likes } = useSelector((state) => state.like);
  return (
    <Layout>
      <div className='likes'>
        <Container>
          {likes.length > 0 ? (
            <>
              <h5>Избранные</h5>
              <div className='likes__cards'>
                {likes.map((like) => (
                  <LikesCard key={like.id} item={like} />
                ))}
              </div>
            </>
          ) : (
            <EmptyCard text={'В избранных ничего нет'} />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default Likes;
