const SearchBar = ({keyword, onChange}) => {
    return (
        <input
          type = 'text'
          placeholder = 'Type something to search!'
          style={{
            padding: '10px',
            backgroundColor: '#ffffffe0',
            borderRadius: '25px',
            width: '40vw',
            border: 'none',
            height: '60px',
            textAlign: 'left',
        }}/>
    );
}

export default SearchBar;