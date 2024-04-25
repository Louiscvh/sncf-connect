import {Map} from "../components/Map.tsx";
import {SearchInput} from "../components/SearchInput.tsx";
import {useEffect, useState} from "react";

export const Landing = () => {

    const [search, setSearch] = useState<string>('')
    const [adress, setAdress] = useState<string[]>([]);
    const [selectedAdress, setSelectedAdress] = useState<string>('');

    const getAdress = async (search: string) => {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${search}&limit=5`);
        const data = await response.json();
        setAdress(data.features.map((feature: any) => feature.properties.label));
    }

    useEffect(() => {
        if (search) {
            getAdress(search);
        }
    }, [search]);

    console.log("selectedAdress", selectedAdress)

    return (
        <main className="container">
            <section>
                <SearchInput
                    address={adress}
                    setAdress={setAdress}
                    selectedAdress={selectedAdress}
                    setSelectedAdress={setSelectedAdress}
                    onSearch={(search) => setSearch(search)}
                    onClickProps={(adress) => setSelectedAdress(adress) }
                />
                <Map selectedAdress={selectedAdress} />
            </section>
        </main>
    )
}