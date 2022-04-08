import { useState } from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination({ count, currentPage, setCurrentPage, perPage }) {
  let pageCount = Math.ceil(count / perPage);

  console.log(count, perPage);
  const onChange = (idx) => {
    setCurrentPage(idx + 1);
  };

  const onPrevPage = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const onNextPage = () => {
    if (currentPage != pageCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <Pagination className='pagination'>
      <Pagination.Prev onClick={onPrevPage} />
      {Array(pageCount)
        .fill(0)
        .map((val, idx) => (
          <Pagination.Item active={currentPage == idx + 1} onClick={() => onChange(idx)}>
            {idx + 1}
          </Pagination.Item>
        ))}
      <Pagination.Next onClick={onNextPage} />
    </Pagination>
  );
}

export default CustomPagination;
