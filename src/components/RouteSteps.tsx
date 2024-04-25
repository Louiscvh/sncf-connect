export const RouteSteps = ({ steps }: { steps: string[] }) => {
    return (
        <div className="z-[1000] absolute bg-[#0C131F] top-0 left-0 w-[calc(100%-2rem)] m-4 rounded-md text-white">
            <ul className="p-2">
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
        </div>
    );
};
