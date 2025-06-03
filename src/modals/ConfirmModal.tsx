import React from "react";


type ConfirmModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
};


export default function ConfirmModal({ isOpen, onConfirm, onCancel, message = "Are you sure?" }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Confirmation</h2>
                <p>{message}</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}