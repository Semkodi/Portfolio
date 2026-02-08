import { X } from 'lucide-react';

const RechtlichesModal = ({ title, isOpen, onClose, content }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-modal-overlay backdrop-blur-sm">
            <div className="bg-modal-content w-full max-w-2xl max-h-80vh flex flex-col rounded-3xl border glass-border shadow-2xl relative">
                <div className="flex justify-between items-center p-6 border-b sticky top-0 z-10 bg-modal-content rounded-t-2xl">
                    <h2 className="text-2xl font-bold gradient-text">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto whitespace-pre-wrap text-muted">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default RechtlichesModal;
