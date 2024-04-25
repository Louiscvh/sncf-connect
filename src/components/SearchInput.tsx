import {useState} from "react";

export const SearchInput = ({ onSearch, address, setAdress, selectedAdress, setSelectedAdress, onClickProps }: {
    onSearch: (search: string) => void,
    address: string[],
    setAdress: (adress: string[]) => void,
    selectedAdress: string,
    setSelectedAdress: (adress: string) => void,
    onClickProps: (adress: string) => void }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOnClick = (adress: string) => {
        onClickProps(adress);
        setSelectedAdress(adress);
        setIsOpen(false);
    }

    return (
        <>
            <input
                type="search"
                className="z-[1000] absolute left-6 bottom-6 p-2 rounded-full pl-4 translate-x-50"
                placeholder="Rechercher un lieu"
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
            />
            {isOpen && address.length > 0 && (
                <ul className="absolute z-[1000] left-6 bottom-14 p-2 rounded-lg pl-4 translate-x-50 bg-white">
                    {address?.map((address, index) => (
                        <li key={index} className="cursor-pointer hover:bg-gray-200" onClick={() => handleOnClick(address)}>
                            {address}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
