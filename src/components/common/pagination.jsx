import React, { Component } from 'react';
import _ from 'lodash';
const Pagination = (props) => {
    // console.log(props.currentPage);
    const pagesCount = Math.ceil( props.itemsCount / props.pageSize ); //(9/4)
    if(pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return ( 
        <nav>
            <ul className="pagination">
                {pages.map(page => 
                    <li key={page} className={page === props.currentPage ? 'page-item active' : 'page-item'}><a className="page-link" onClick={() => props.onPageChange(page)} >{page}</a></li>
                )}
            </ul>
        </nav> );
}
 
export default Pagination;
