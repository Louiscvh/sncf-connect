import { useState } from "react";
import { AddressType } from "../pages/landing";

export const SearchInput = ({ 
    // Propriétés de la composante
    onSearch,           // Fonction appelée lorsqu'une recherche est effectuée
    address,            // Liste des adresses à afficher dans la liste déroulante
    search,
    selectedAddress,     // Adresse sélectionnée
    setSelectedAddress,  // Fonction pour mettre à jour l'adresse sélectionnée
    onClickProps        // Fonction appelée lorsqu'un élément de la liste est cliqué
}: {
    // Types des propriétés de la composante
    onSearch: (search: string) => void,
    address: AddressType[],
    search: string,
    selectedAddress: AddressType | null,
    setSelectedAddress: (adress: AddressType | null) => void,
    onClickProps: (adress: AddressType) => void 
}) => {

    // État local pour gérer l'affichage de la liste déroulante
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Fonction pour gérer le clic sur un élément de la liste déroulante
    const handleOnClick = (address: AddressType) => {
        onClickProps(address);         
        setSelectedAddress(address);    
        setIsOpen(false);              
        console.log('Adresse cliquée :', address);
    }
    
    return (
        <>
            {/* Input de recherche */}
            <input
                type="search"
                className="z-[1000] absolute left-6 bottom-6 p-2 rounded-full pl-4 translate-x-50"
                placeholder="Rechercher un lieu"
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setIsOpen(true)} 
                value={selectedAddress ? selectedAddress.label : search}

            />
            {/* Affichage de la liste déroulante si isOpen est vrai et s'il y a des adresses disponibles */}
            {isOpen && address.length > 0 && (
                <ul className="absolute z-[1000] left-6 bottom-14 p-2 rounded-lg pl-4 translate-x-50 bg-white">
                    {/* Mapper à travers les adresses pour les afficher dans des <li> */}
                    {address?.map((address, index) => (
                        <li key={index} className="cursor-pointer hover:bg-gray-200" onClick={() => handleOnClick(address)}>
                            {address.label}   {/* Afficher l'adresse */}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
