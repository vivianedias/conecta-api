import React from 'react';
import './BoxExpand.scss';

const BoxExpand = ({ title, content, onClick, isHidden }) => {
    return (
        <section className="box-expand section">
            <div className="box-expand__container container">
                <div className="box-expand__wrapper card is-fullwidth" onClick={onClick}>
                    <header className="box-expand__header card-header">
                        <p className="box-expand__card-title card-header-title">
                            {title}
                        </p>
                        <button className="box-expand__arrow card-header-icon card-toggle">
                            {isHidden && <span><i className="fas fa-chevron-down"></i></span>}
                            {!isHidden && <span><i className="fas fa-chevron-up"></i></span>}
                        </button>
                    </header>
                    <div className={`box-expand__card-content ${isHidden ? 'box-expand__card-content--hide' : 'box-expand__card-content--show'}`}>
                        <div className="box-expand__content content">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BoxExpand;