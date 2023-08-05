"use client";

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center h-screen bg-tertiary">
                    <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
                    <p className="text-primary-50 mb-6">{error.message}</p>
                    <button
                        className="px-4 py-2 text-white bg-secondary rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                        onClick={() => reset()}
                    >
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    );
};

export default GlobalError;