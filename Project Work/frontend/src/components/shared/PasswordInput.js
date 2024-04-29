const PasswordInput = ({label, placeholder}) => {
    return (
        <div className="textInput flex flex-col space-y-2 w-full">
            <label for={label} className="font-semibold">
                {label}
            </label>
            <input 
                type="password"
                placeholder={placeholder}
                className="p-2 border border-gray-400 border-solid rounded text-black"
                id= {label}
            />
        </div>
    );
};

export default PasswordInput;