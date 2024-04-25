export const RouteSteps = ({ steps }: { steps: string[] }) => {
    return (
        <div>
            <h2>Étapes de l'itinéraire :</h2>
            <ol>
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};
