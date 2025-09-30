import { AlertCircle } from 'lucide-react';

const DevModeNotice = () => {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Development Mode - Mock Backend</span>
            </div>
        </div>
    );
};

export default DevModeNotice;