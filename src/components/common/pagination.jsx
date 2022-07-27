import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    // const { itemsCount, pageSize, currentPage, onPageChange } = props; //OBJECT DESTRUCTING
    // console.log(props.currentPage);
    const pagesCount = Math.ceil( props.itemsCount / props.pageSize ); //(9/4)
    if(pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return ( 
        <nav>
            <ul className="pagination clickable">
                {pages.map(page => 
                    <li key={page} className={page === props.currentPage ? 'page-item active' : 'page-item'}><a className="page-link" onClick={() => props.onPageChange(page)} >{page}</a></li>
                )}
            </ul>
        </nav> );
};

Pagination.propTypes = {
    itemsCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired

};
 
export default Pagination;
