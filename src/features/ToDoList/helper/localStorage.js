const getItemLocal = (itemName) => {
    const data = localStorage.getItem(itemName);
    return JSON.parse(data)
}

const setItemLocal = (itemName, data) => {
    localStorage.setItem(itemName, JSON.stringify(data))
}

export {getItemLocal, setItemLocal}