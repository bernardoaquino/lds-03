import { useEffect, useRef, useState } from "react";

/** Assets */
import XCircleIcon from 'assets/x-circle.svg';

/** Style */
import * as El from './Modal.style';

type ModalProps = {
    width?: number;
    open?: boolean;
    onClose?: Function;
    title: string;
    content?: any;
}

const Modal = ({
    width = 400,
    open = false,
    onClose,
    title,
    content
}: ModalProps) => {
    const [isOpened, setIsOpened] = useState(open);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsOpened(open);
    }, [open])

    const handleCloseModal = () => {
        setIsOpened(false);
        onClose?.();
    }

    const handleOverlayClick = (e) => {
        if (overlayRef?.current && !e.target.closest(overlayRef?.current?.className)) {
            handleCloseModal();
        }
    }

    if (!isOpened) return null

    return (
        <El.Overlay ref={overlayRef} onClick={handleOverlayClick}>
            <El.Modal onClick={(e) => e.stopPropagation()} width={width}>
                <El.ModalHeader>
                    <El.ModalTitle>{title}</El.ModalTitle>
                    <XCircleIcon onClick={handleCloseModal} height={16} width={16} />
                </El.ModalHeader>
                <El.ModalContent>
                    {content}
                </El.ModalContent>
            </El.Modal>
        </El.Overlay>
    )
}

export default Modal