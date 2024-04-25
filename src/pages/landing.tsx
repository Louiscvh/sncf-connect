import { Map } from "../components/Map.tsx";
import { SearchInput } from "../components/SearchInput.tsx";
import { useEffect, useState } from "react";

export type AddressType = {
    coords: {
        x: number;
        y: number;
    },
    label: string;
}

export const Landing = () => {

    const [search, setSearch] = useState<string>('');
    const [address, setAddress] = useState<AddressType[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);

    const getAddresses = async (search: string) => {
        try {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${search}&limit=5`);
            const data = await response.json();

            const addresses: AddressType[] = data.features.map((feature: any) => ({
                coords: {
                    x: feature.geometry.coordinates[0],
                    y: feature.geometry.coordinates[1]
                },
                label: feature.properties.label
            }));

            console.log(addresses);
            setAddress(addresses);
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses :", error);
        }
    }

    useEffect(() => {
        if (search) {
            console.log('valeur', search);
            getAddresses(search);
        }
    }, [search]);

    console.log("selectedAddress", selectedAddress);

    return (
        <main className="container">
            <section>
                <SearchInput
                    address={address}
                    selectedAddress={selectedAddress}
                    search={search}
                    setSelectedAddress={setSelectedAddress}
                    onSearch={(search) => setSearch(search)}
                    onClickProps={(address) => setSelectedAddress(address) }
                />
                <Map selectedAddress={selectedAddress} />
            </section>
        </main>
    );
};
