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
        <div className="z-[1000] absolute bottom-0 p-4 translate-x-50 bg-[#0C131F] w-full flex justify-center">
            <input
                type="search"
                className="p-2 rounded-full pl-4 w-full my-4"
                placeholder="Rechercher un lieu"
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
            />
            {isOpen && address.length > 0 && (
                <ul className="absolute z-[1000] left-6 bottom-20 p-2 rounded-lg translate-x-50 bg-white">
                    {address?.map((address, index) => (
                        <li key={index} className="p-1 rounded-md cursor-pointer hover:bg-gray-200" onClick={() => handleOnClick(address)}>
                            {address}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
