export const Modal = ({ open, children, className }) => {

    if(!open) return null

    return open && (
        <div className={`${'modal-overlay'} ${className}`}>
            <div className="modal">
                {open && (children)}
            </div>
        </div>
    )

}