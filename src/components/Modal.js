import React from 'react';
import '../styles/Modal.css';
const Modal = (props) => {
    const { visible, close, header } = props;
    return (
        <div className={visible ? 'openModal modal' : 'modal'}>
            {visible ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        <button className="close" onClick={close}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default Modal;
