import {useState} from "react";
import {AddressType} from "../pages/landing.tsx";

export const SearchInput = ({
    onSearch,
    address,
    search,
    selectedAddress,
    setSelectedAddress,
    onClickProps
}: {
    onSearch: (search: string) => void,
    address: AddressType[],
    search: string,
    selectedAddress: AddressType | null,
    setSelectedAddress: (adress: AddressType | null) => void,
    onClickProps: (adress: AddressType) => void
}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOnClick = (address: AddressType) => {
        onClickProps(address);
        setSelectedAddress(address);
        setIsOpen(false);
        console.log('Adresse cliquée :', address);
    }

    return (
        <div className="z-[1000] absolute bottom-0 p-4 translate-x-50 bg-[#0C131F] w-full flex justify-center">
            <input
                type="search"
                className="p-2 rounded-full pl-4 w-full my-4"
                placeholder="Rechercher un lieu"
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                value={selectedAddress ? selectedAddress.label : search}
            />
            {isOpen && address.length > 0 && (
                <ul className="absolute z-[1000] left-6 bottom-20 p-2 rounded-lg translate-x-50 bg-white">
                    {address?.map((address, index) => (
                        <li key={index} className="cursor-pointer hover:bg-gray-200" onClick={() => handleOnClick(address)}>
                            {address.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
